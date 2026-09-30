var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { AuthService } from '../../auth/auth.service.js';
let AuthGuards = class AuthGuards {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    canActivate(context) {
        try {
            const ctx = GqlExecutionContext.create(context);
            const request = ctx.getContext().req;
            const authorization = request.headers.authorization;
            if (!authorization) {
                throw new GraphQLError('Authorization header is missing', {
                    extensions: {
                        code: 'UNAUTHORIZED',
                        statusCode: 401,
                    },
                });
            }
            const [type, token] = authorization.split(' ');
            if (type !== 'Bearer' || !token) {
                throw new GraphQLError('Invalid authorization format', {
                    extensions: {
                        code: 'UNAUTHORIZED',
                        statusCode: 401,
                    },
                });
            }
            const payload = this.authService.verifyJWT(token);
            request.user = payload;
            return true;
        }
        catch (err) {
            return false;
        }
    }
};
AuthGuards = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthService])
], AuthGuards);
export { AuthGuards };
//# sourceMappingURL=auth.guard.js.map