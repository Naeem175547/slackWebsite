var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Matches, MinLength, } from 'class-validator';
let CreateUserInput = class CreateUserInput {
    email;
    name;
    username;
    password;
};
__decorate([
    Field(),
    IsEmail({}, { message: 'Please provide a valid email address' }),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    Field(),
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "name", void 0);
__decorate([
    Field(),
    IsString(),
    IsNotEmpty(),
    Matches(/^[a-zA-Z0-9]+$/, {
        message: 'Username must contain only letters and numbers',
    }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "username", void 0);
__decorate([
    Field(),
    IsString(),
    IsNotEmpty(),
    MinLength(6, {
        message: 'Password must be at least 6 characters',
    }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
CreateUserInput = __decorate([
    InputType()
], CreateUserInput);
export { CreateUserInput };
//# sourceMappingURL=create-user.input.js.map