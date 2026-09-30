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
import { Controller } from '@nestjs/common';
import { MailService } from './mail.service.js';
import { EventPattern, Payload } from '@nestjs/microservices';
let MailController = class MailController {
    mailService;
    constructor(mailService) {
        this.mailService = mailService;
    }
    sendMail(payload) {
        return this.mailService.sendMail(payload.to, payload.subject, payload.body);
    }
};
__decorate([
    EventPattern('sendMail'),
    __param(0, Payload()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MailController.prototype, "sendMail", null);
MailController = __decorate([
    Controller('mail'),
    __metadata("design:paramtypes", [MailService])
], MailController);
export { MailController };
//# sourceMappingURL=mail.controller.js.map