import { ConfigService } from '@nestjs/config';
export declare class AwsService {
    private readonly configService;
    private s3;
    private bucketName;
    constructor(configService: ConfigService);
    private getClient;
    getPresignedUploadUrl(expiresIn?: number): Promise<string>;
}
