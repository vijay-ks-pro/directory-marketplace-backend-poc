import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TENANT_IDENTIFIER } from '../constants';

export const TenantId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const tenant = request.headers[TENANT_IDENTIFIER];
    if(tenant) return tenant;
    return request.headers[TENANT_IDENTIFIER.toLowerCase()];
  },
);
