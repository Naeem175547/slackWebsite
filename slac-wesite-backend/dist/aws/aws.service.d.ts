import { ConfigService } from '@nestjs/config';
export declare class AwsService {
    private readonly configService;
    private readonly s3;
    private readonly bucketName;
    constructor(configService: ConfigService);
    getPresignedUploadUrl(expiresIn?: number): Promise<string>;
}
