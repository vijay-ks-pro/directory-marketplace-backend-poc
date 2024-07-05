import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";

export interface IAuthTokenService {
    secret: string;
    expiration: string;
    generateToken(payload: object): string | null;
    decodeToken(token: string): any | null;
    verifyToken(token: string): Object | null;
  }
  
  @Injectable()
  export class JWTService implements IAuthTokenService {
    secret: string;
    expiration: string;
  
    constructor(
    ) {
      this.secret = process.env.JWT_SECRET;
      this.expiration = process.env.JWT_EXPIRATION;
    }
    decodeToken(token: string) {
      return jwt.decode(token);
    }
    verifyToken(token: string) {
      return jwt.verify(token, this.secret);
    }
    generateToken(payload: object): string | null {
      if (!payload || Object.keys(payload).length === 0) {
        throw Error("Invalid payload to sign");
        return null;
      }
  
      return jwt.sign(payload, this.secret, { expiresIn: this.expiration });
    }
  }