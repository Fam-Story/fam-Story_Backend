import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

export class S3Handler {
  s3: AWS.S3 = new AWS.S3();
  constructor(private configService: ConfigService) {
    AWS.config.update({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  deleteObject(key: string) {
    const deleteParams = {
      Bucket: this.configService.get('BUCKET_NAME'),
      Key: `${key}`,
    };
    return this.s3.deleteObject(deleteParams).promise();
  }
}
