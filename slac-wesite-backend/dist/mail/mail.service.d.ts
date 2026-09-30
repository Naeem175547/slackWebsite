import * as nodemailer from 'nodemailer';
export declare class MailService {
    private transporter;
    constructor();
    sendMail(to: string, subject: string, body: string): Promise<nodemailer.SMTPSentMessageInfo>;
}
