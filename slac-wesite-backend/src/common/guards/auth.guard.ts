import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service.js';

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;

      const authorization = request.headers.authorization;
      if (!authorization) {
        throw new GraphQLError('Authorization header is missing', {
          extensions: {
            code: 'UNAUTHORIZED',
            statusCode: 401,
          },
        });
      }

      const [type, token] = authorization.split(' ');

      if (type !== 'Bearer' || !token) {
        throw new GraphQLError('Invalid authorization format', {
          extensions: {
            code: 'UNAUTHORIZED',
            statusCode: 401,
          },
        });
      }

      const payload = this.authService.verifyJWT(token);
      request.user = payload;

      return true;
    } catch (err) {
      return false; //because this will throw jwt token error auto
    }
  }
}
