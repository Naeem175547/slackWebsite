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
import { GraphQLError } from 'graphql';
const REQUIRED_KEYS = [
    'AWS_REGION',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_BUCKET_NAME',
];
let AwsService = class AwsService {
    configService;
    s3 = null;
    bucketName = null;
    constructor(configService) {
        this.configService = configService;
    }
    getClient() {
        if (this.s3 && this.bucketName) {
            return { s3: this.s3, bucketName: this.bucketName };
        }
        const missing = REQUIRED_KEYS.filter((key) => !this.configService.get(key));
        if (missing.length > 0) {
            console.log(`AWS is not configured. Missing in .env: ${missing.join(', ')}`);
            throw new GraphQLError('Image upload is not configured on the server');
        }
        this.s3 = new S3Client({
            region: this.configService.get('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
            },
        });
        this.bucketName = this.configService.get('AWS_BUCKET_NAME');
        return { s3: this.s3, bucketName: this.bucketName };
    }
    async getPresignedUploadUrl(expiresIn = 60) {
        const { s3, bucketName } = this.getClient();
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: `${Date.now()}-${randomUUID()}`,
        });
        return getSignedUrl(s3, command, { expiresIn });
    }
};
AwsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], AwsService);
export { AwsService };
//# sourceMappingURL=aws.service.js.map