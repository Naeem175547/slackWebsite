var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/types/user.type.js';
let LoginData = class LoginData {
    user;
    accessToken;
};
__decorate([
    Field(() => User),
    __metadata("design:type", User)
], LoginData.prototype, "user", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], LoginData.prototype, "accessToken", void 0);
LoginData = __decorate([
    ObjectType()
], LoginData);
export { LoginData };
let LoginResponse = class LoginResponse {
    success;
    message;
    data;
};
__decorate([
    Field(),
    __metadata("design:type", Boolean)
], LoginResponse.prototype, "success", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], LoginResponse.prototype, "message", void 0);
__decorate([
    Field(() => LoginData, { nullable: true }),
    __metadata("design:type", LoginData)
], LoginResponse.prototype, "data", void 0);
LoginResponse = __decorate([
    ObjectType()
], LoginResponse);
export { LoginResponse };
//# sourceMappingURL=login.response.type.js.map