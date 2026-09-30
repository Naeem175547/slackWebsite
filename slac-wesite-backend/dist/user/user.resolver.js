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
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service.js';
import { UserResponse, UsersResponse } from './types/user.type.js';
import { UpdateUserInput } from './dto/update-user.input.js';
let UserResolver = class UserResolver {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    findAll() {
        return this.userService.findAll();
    }
    findOne(id) {
        return this.userService.findOne(id);
    }
    findOneByEmail(email) {
        return this.userService.findOneByEmail(email);
    }
    findOneByUsername(username) {
        return this.userService.findOneByUsername(username);
    }
    updateUser(id, updateUserInput) {
        return this.userService.update(id, updateUserInput);
    }
    removeUser(id) {
        return this.userService.remove(id);
    }
};
__decorate([
    Query(() => UsersResponse, { name: 'users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "findAll", null);
__decorate([
    Query(() => UserResponse, { name: 'user' }),
    __param(0, Args('id', { type: () => Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "findOne", null);
__decorate([
    Query(() => UserResponse, { name: 'userByEmail' }),
    __param(0, Args('email', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "findOneByEmail", null);
__decorate([
    Query(() => UserResponse, { name: 'userByUsername' }),
    __param(0, Args('username', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "findOneByUsername", null);
__decorate([
    Mutation(() => UserResponse),
    __param(0, Args('id', { type: () => Int })),
    __param(1, Args('updateUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateUserInput]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "updateUser", null);
__decorate([
    Mutation(() => UserResponse),
    __param(0, Args('id', { type: () => Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "removeUser", null);
UserResolver = __decorate([
    Resolver(() => UserResponse),
    __metadata("design:paramtypes", [UserService])
], UserResolver);
export { UserResolver };
//# sourceMappingURL=user.resolver.js.map