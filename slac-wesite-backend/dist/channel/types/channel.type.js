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
import { Message } from '../../message/types/message.type.js';
import { Workspace } from '../../workspace/dto/workspace.type.js';
let Channel = class Channel {
    id;
    name;
    createdAt;
    updatedAt;
};
__decorate([
    Field(),
    __metadata("design:type", Number)
], Channel.prototype, "id", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Channel.prototype, "name", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], Channel.prototype, "createdAt", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], Channel.prototype, "updatedAt", void 0);
Channel = __decorate([
    ObjectType()
], Channel);
export { Channel };
let FullChannel = class FullChannel {
    id;
    name;
    createdAt;
    messages;
    workspace;
    updatedAt;
};
__decorate([
    Field(),
    __metadata("design:type", Number)
], FullChannel.prototype, "id", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], FullChannel.prototype, "name", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], FullChannel.prototype, "createdAt", void 0);
__decorate([
    Field(() => [Message]),
    __metadata("design:type", Array)
], FullChannel.prototype, "messages", void 0);
__decorate([
    Field(() => Workspace),
    __metadata("design:type", Workspace)
], FullChannel.prototype, "workspace", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], FullChannel.prototype, "updatedAt", void 0);
FullChannel = __decorate([
    ObjectType()
], FullChannel);
export { FullChannel };
let ChannelResponse = class ChannelResponse {
    success;
    message;
    data;
};
__decorate([
    Field(),
    __metadata("design:type", Number)
], ChannelResponse.prototype, "success", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], ChannelResponse.prototype, "message", void 0);
__decorate([
    Field(() => Channel, { nullable: true }),
    __metadata("design:type", Channel)
], ChannelResponse.prototype, "data", void 0);
ChannelResponse = __decorate([
    ObjectType()
], ChannelResponse);
export { ChannelResponse };
let FullChannelResponse = class FullChannelResponse {
    success;
    message;
    data;
};
__decorate([
    Field(),
    __metadata("design:type", Number)
], FullChannelResponse.prototype, "success", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], FullChannelResponse.prototype, "message", void 0);
__decorate([
    Field(() => FullChannel, { nullable: true }),
    __metadata("design:type", FullChannel)
], FullChannelResponse.prototype, "data", void 0);
FullChannelResponse = __decorate([
    ObjectType()
], FullChannelResponse);
export { FullChannelResponse };
//# sourceMappingURL=channel.type.js.map