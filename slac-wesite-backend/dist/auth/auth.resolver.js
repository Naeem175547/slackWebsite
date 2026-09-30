var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserResponse } from '../user/types/user.type.js';
import { CreateUserInput } from '../user/dto/create-user.input.js';
import { UserService } from '../user/user.service.js';
import { GraphQLError } from 'graphql';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service.js';
import { LoginResponse } from './dto/login.response.type.js';
let AuthResolver = class AuthResolver {
    userService;
    authService;
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    signUp(createUserInput) {
        return this.userService.create(createUserInput);
    }
    async signIn(email, password) {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new GraphQLError('user with this email not found', {
                extensions: {
                    code: 'NOT_FOUND_EXCEPTION',
                    statuscode: 404,
                },
            });
        }
        const isPassMatched = await bcrypt.compare(password, user.password);
        if (!isPassMatched) {
            throw new GraphQLError('password is not valid', {
                extensions: {
                    code: 'INVALID_PASSWORD',
                    statuscode: 401,
                },
            });
        }
        const jwtToken = await this.authService.generateJwtToken(user);
        return {
            user,
            accessToken: jwtToken,
        };
    }
};
__decorate([
    Mutation(() => UserResponse),
    __param(0, Args('createUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserInput]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "signUp", null);
__decorate([
    Mutation(() => LoginResponse),
    __param(0, Args('email')),
    __param(1, Args('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "signIn", null);
AuthResolver = __decorate([
    Resolver(),
    __metadata("design:paramtypes", [UserService,
        AuthService])
], AuthResolver);
export { AuthResolver };
//# sourceMappingURL=auth.resolver.js.map