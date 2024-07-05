import { TENANT_IDENTIFIER, USER_ADVERTISER, USER_OWNER } from '@app/common/constants';
import { JWTService } from '@app/common/jwt-service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Request, Response, NextFunction } from 'express';
import { legacyCreateProxyMiddleware as createProxyMiddleware } from 'http-proxy-middleware';
import { pathToRegexp } from 'path-to-regexp';

const authApis = [
    "/auth/*"
]
  
const unProtectedApis = [
    "/customer/*",
];

const advertiserApis = [
    '/advertiser/*'
]

const ownerApis = [
    '/owner/*'
]

@Module({
    imports: [ConfigModule.forRoot()]
})
export class GatewayModule {}

async function bootstrap() {
    const app = await NestFactory.create(GatewayModule);
    app.enableCors();

    app.use(async (req: Request, res: Response, next: NextFunction) => {
        console.log('env test: auth_url: ', process.env.AUTH_SERVICE_URL);
        const pathCheckCallback = (path: string, reqPath: string) => {
            const endpointRegex = pathToRegexp(path.replace(/\*/g, '(.*)'));
            return endpointRegex.test(reqPath);
        }
        const isAuthApi = authApis.some(e => pathCheckCallback(e, req.path))
        if(isAuthApi) { return next(); }
        const isReqHasToken = req.headers.hasOwnProperty('authorization') && req.headers.authorization != '';
        const isUnProtectedApi = unProtectedApis.some(e => pathCheckCallback(e, req.path));
        const isProtectedApi = isUnProtectedApi == false;

        if(isProtectedApi && isReqHasToken != true) return res.status(401).send({ success: false, message: "Unauthorised request" });

        if(isReqHasToken) {
            try {
                const user =  new JWTService().verifyToken(req.headers.authorization);
                const isAdvertiserApi = advertiserApis.some(e => pathCheckCallback(e, req.path));
                const isOwnerApi = ownerApis.some(e => pathCheckCallback(e, req.path));
                if(isAdvertiserApi && user.role && user.role != USER_ADVERTISER) {
                    return res.status(401).send({ success: false, message: "Unauthorised request" });
                }
                if(isOwnerApi && user.role && user.role != USER_OWNER) {
                    return res.status(401).send({ success: false, message: "Unauthorised request" });
                }
                req.headers.user = JSON.stringify(user);
            } catch(e) {
                return res.status(401).send({ success: false, message: "Unauthorised request" });
            }
        }

        next();
    })

    app.use(async (req: Request, res: Response, next: NextFunction) => {
        const isPostman = Object.keys(req.headers).map(e => e.toLowerCase()).some(e => e.includes('postman'));
        const origin = req.headers.origin ?? '';

        if(origin == '' && isPostman == false) {
            return res.status(401).send({ success: false, message: "Unauthorised request" });
        }

        const isLocalhost = origin.includes('localhost');
        const organisation = isLocalhost ? origin.split(':')[2] : origin.replaceAll('.', '_').split('://')[1].substring(0, 10);
        console.log('origin: ', req.headers.origin);
        const db = `directory_db_${isPostman ? '3000' : organisation}`
        req.headers[TENANT_IDENTIFIER.toLowerCase()] = db;
        next();
    })

    const authProxy = createProxyMiddleware({
        target: process.env.AUTH_SERVICE_URL,
        changeOrigin: true,
    });

    const ownerProxy = createProxyMiddleware({
        target: process.env.OWNER_SERVICE_URL,
        changeOrigin: true,
    });

    const advertiserProxy = createProxyMiddleware({
        target: process.env.ADVERTISER_SERVICE_URL,
        changeOrigin: true,
    });

    const customerProxy = createProxyMiddleware({
        target: process.env.CUSTOMER_SERVICE_URL,
        changeOrigin: true,
    });

    app.use('/auth*', authProxy);
    app.use('/owner*', ownerProxy);
    app.use('/advertiser*', advertiserProxy);
    app.use('/customer*', customerProxy);

    await app.listen(process.env.GATEWAY_SERVICE_PORT || process.env.PORT || 8080);
}
bootstrap();
