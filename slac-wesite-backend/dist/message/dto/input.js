var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, InputType, Int } from '@nestjs/graphql';
let MessageParams = class MessageParams {
    channelId;
    workspaceId;
    userId;
};
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], MessageParams.prototype, "channelId", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], MessageParams.prototype, "workspaceId", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], MessageParams.prototype, "userId", void 0);
MessageParams = __decorate([
    InputType()
], MessageParams);
export { MessageParams };
let MessageInput = class MessageInput {
    body;
    image;
    channelId;
};
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], MessageInput.prototype, "body", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], MessageInput.prototype, "image", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], MessageInput.prototype, "channelId", void 0);
MessageInput = __decorate([
    InputType()
], MessageInput);
export { MessageInput };
//# sourceMappingURL=input.js.map