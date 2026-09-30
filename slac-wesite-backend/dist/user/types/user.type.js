var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, Int, ObjectType } from '@nestjs/graphql';
let User = class User {
    username;
    email;
    id;
    name;
    avatar;
    createdAt;
    updatedAt;
};
__decorate([
    Field(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    ObjectType()
], User);
export { User };
let UsersResponse = class UsersResponse {
    success;
    message;
    data;
};
__decorate([
    Field(),
    __metadata("design:type", Boolean)
], UsersResponse.prototype, "success", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], UsersResponse.prototype, "message", void 0);
__decorate([
    Field(() => [User], { nullable: true }),
    __metadata("design:type", Array)
], UsersResponse.prototype, "data", void 0);
UsersResponse = __decorate([
    ObjectType()
], UsersResponse);
export { UsersResponse };
let UserResponse = class UserResponse {
    success;
    message;
    data;
};
__decorate([
    Field(),
    __metadata("design:type", Boolean)
], UserResponse.prototype, "success", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], UserResponse.prototype, "message", void 0);
__decorate([
    Field(() => User, { nullable: true }),
    __metadata("design:type", User)
], UserResponse.prototype, "data", void 0);
UserResponse = __decorate([
    ObjectType()
], UserResponse);
export { UserResponse };
//# sourceMappingURL=user.type.js.map