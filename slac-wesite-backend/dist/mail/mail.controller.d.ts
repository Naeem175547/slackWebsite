import { MailService } from './mail.service.js';
export declare class MailController {
    private mailService;
    constructor(mailService: MailService);
    sendMail(payload: any): Promise<import("nodemailer").SMTPSentMessageInfo>;
}
