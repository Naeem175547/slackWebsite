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
let Message = class Message {
    id;
    body;
    image;
    user;
    createdAt;
    updatedAt;
};
__decorate([
    Field(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Message.prototype, "body", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], Message.prototype, "image", void 0);
__decorate([
    Field(() => User, { nullable: true }),
    __metadata("design:type", User)
], Message.prototype, "user", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], Message.prototype, "updatedAt", void 0);
Message = __decorate([
    ObjectType()
], Message);
export { Message };
let MessageResponse = class MessageResponse {
    success;
    message;
    data;
};
__decorate([
    Field(),
    __metadata("design:type", Boolean)
], MessageResponse.prototype, "success", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], MessageResponse.prototype, "message", void 0);
__decorate([
    Field(() => [Message]),
    __metadata("design:type", Array)
], MessageResponse.prototype, "data", void 0);
MessageResponse = __decorate([
    ObjectType()
], MessageResponse);
export { MessageResponse };
//# sourceMappingURL=message.type.js.map