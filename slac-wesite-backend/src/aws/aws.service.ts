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
] as const;

@Injectable()
export class AwsService {
  private s3: S3Client | null = null;
  private bucketName: string | null = null;

  constructor(private readonly configService: ConfigService) {}

  // Read AWS config on first use, so missing keys only break uploads,
  // not the whole server's startup
  private getClient() {
    if (this.s3 && this.bucketName) {
      return { s3: this.s3, bucketName: this.bucketName };
    }

    const missing = REQUIRED_KEYS.filter(
      (key) => !this.configService.get<string>(key),
    );
    if (missing.length > 0) {
      console.log(`AWS is not configured. Missing in .env: ${missing.join(', ')}`);
      throw new GraphQLError('Image upload is not configured on the server');
    }

    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        )!,
      },
    });
    this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME')!;
    return { s3: this.s3, bucketName: this.bucketName };
  }

  // URL the client can PUT a file to directly, valid for `expiresIn` seconds
  async getPresignedUploadUrl(expiresIn = 60) {
    const { s3, bucketName } = this.getClient();
    const command = new PutObjectCommand({
      Bucket: bucketName,
      // Date.now() alone can collide when two uploads start in the same ms
      Key: `${Date.now()}-${randomUUID()}`,
    });
    return getSignedUrl(s3, command, { expiresIn });
  }
}
