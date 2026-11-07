import { Args, Context, Int, Query, Resolver } from '@nestjs/graphql';

import { GraphQLError } from 'graphql';
import { MessageService } from './message.service.js';
import {
  MessageResponse,
  PresignedUrlResponse,
} from './types/message.type.js';
import { MessageParams } from './dto/input.js';
import { UseGuards } from '@nestjs/common';
import { AuthGuards } from '../common/guards/auth.guard.js';
import { AwsService } from '../aws/aws.service.js';

@Resolver()
@UseGuards(AuthGuards)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    private readonly awsService: AwsService,
  ) {}

  // Client uploads the image straight to S3 with this URL
  @Query(() => PresignedUrlResponse)
  async getPresignedUrl() {
    try {
      return await this.awsService.getPresignedUploadUrl(60);
    } catch (error) {
      console.log('Error in getPresignedUrl', error);
      if (error instanceof GraphQLError) throw error;
      throw new GraphQLError('Failed to generate presigned URL');
    }
  }

  @Query(() => MessageResponse)
  async getPaginatedMessage(
    @Context() context: any,
    @Args('messageParams', { type: () => MessageParams })
    messageParams: MessageParams,

    @Args('page', { type: () => Int, nullable: true })
    page: number | null,

    @Args('limit', { type: () => Int, nullable: true })
    limit: number | null,
  ) {
    return await this.messageService.getPaginatedMessageSerive(
      messageParams,
      page || 1,
      limit || 20,
      context.req.user.id,
    );
  }
}
