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
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service.js';
import { GraphQLError } from 'graphql';
let AuthService = class AuthService {
    jwtService;
    userService;
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async generateJwtToken(user) {
        return this.jwtService.sign({ id: user.id, email: user.email, username: user.username });
    }
    verifyJWT(token) {
        return this.jwtService.verify(token);
    }
    async verifyToken(token) {
        try {
            const user = await this.userService.findUserByToken(token);
            if (!user) {
                throw new GraphQLError('user not found');
            }
            if (!token || token !== user.token) {
                throw new GraphQLError('Invalid token');
            }
            if (!user.tokenExpiryDate) {
                throw new GraphQLError('expiry date missing');
            }
            if (new Date(user.tokenExpiryDate).getTime() < Date.now()) {
                throw new GraphQLError('user not found');
            }
            user.token = null;
            user.isVarified = true;
            user.tokenExpiryDate = null;
            await this.userService.update(user.id, user);
        }
        catch (error) {
            throw error;
        }
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [JwtService, UserService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map