var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
let AwsService = class AwsService {
    configService;
    s3;
    bucketName;
    constructor(configService) {
        this.configService = configService;
        this.s3 = new S3Client({
            region: this.configService.getOrThrow('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
            },
        });
        this.bucketName = this.configService.getOrThrow('AWS_BUCKET_NAME');
    }
    async getPresignedUploadUrl(expiresIn = 60) {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: `${Date.now()}-${randomUUID()}`,
        });
        return getSignedUrl(this.s3, command, { expiresIn });
    }
};
AwsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], AwsService);
export { AwsService };
//# sourceMappingURL=aws.service.js.map