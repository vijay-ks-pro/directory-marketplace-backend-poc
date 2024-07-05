import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as jwt from "jsonwebtoken";
import { MongoId } from '../types';

export interface JWTUserData {
    email: string;
    userId: MongoId | string;
    userName: string;
}

export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let user = request.headers['user'];

    if(user) {
      return <JWTUserData>JSON.parse(user);
    }
    
    if(request.headers.authorization) {
      try {
        user = jwt.verify(request.headers.authorization, process.env.JWT_SECRET)
        if(user) {
          return <JWTUserData>user;
        }
      } catch (error) {}
    }
    
    return ;
  },
);
