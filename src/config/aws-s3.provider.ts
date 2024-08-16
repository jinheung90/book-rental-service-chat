import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { EnvironmentName } from './environment-name';
import { fromContainerMetadata } from '@aws-sdk/credential-providers';

export enum BucketNameType {
  CHAT = 'chat',
}

export class AwsS3Provider {
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    if (this.configService.get<string>('APP_ENV') === EnvironmentName.LOCAL) {
      const credentials = {
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_SECRET_ACCESS_KEY'),
      };
      this.s3Client = new S3Client({
        region: this.configService.get('AWS_REGION'),
        credentials: credentials,
      });
    } else {
      this.s3Client = new S3Client(
        fromContainerMetadata({
          timeout: 1000,
          maxRetries: 0,
        }),
      );
    }
  }

  private getRealBucketName(bucketNameType: BucketNameType): string {
    return this.configService.get<string>('APP_ENV') + '-' + bucketNameType;
  }

  async getS3ImageByKey(bucketNameType: BucketNameType, key: string) {
    const command = new GetObjectCommand({
      Bucket: this.getRealBucketName(bucketNameType), // S3 버킷 이름
      Key: key, // 업로드될 파일의 이름
    });
    await this.s3Client.send(command);
  }

  async imageUploadToS3(
    fileName: string,
    file: Express.Multer.File,
    ext: string,
    bucketNameType: BucketNameType,
  ) {
    const command = new PutObjectCommand({
      Bucket: this.getRealBucketName(bucketNameType),
      Key: fileName,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: `image/${ext}`,
    });

    await this.s3Client.send(command);
  }
}
