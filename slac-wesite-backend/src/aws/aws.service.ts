import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

@Injectable()
export class AwsService {
  private readonly s3: S3Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.getOrThrow<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
    this.bucketName = this.configService.getOrThrow<string>('AWS_BUCKET_NAME');
  }

  // URL the client can PUT a file to directly, valid for `expiresIn` seconds
  async getPresignedUploadUrl(expiresIn = 60) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      // Date.now() alone can collide when two uploads start in the same ms
      Key: `${Date.now()}-${randomUUID()}`,
    });
    return getSignedUrl(this.s3, command, { expiresIn });
  }
}
