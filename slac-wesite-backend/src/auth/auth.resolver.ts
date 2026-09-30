import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserResponse } from '../user/types/user.type.js';
import { CreateUserInput } from '../user/dto/create-user.input.js';
import { UserService } from '../user/user.service.js';
import { GraphQLError } from 'graphql';

import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service.js';
import { LoginResponse } from './dto/login.response.type.js';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Mutation(() => UserResponse)
  signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => LoginResponse)
  async signIn(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    // Implementation for sign-in logic
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new GraphQLError('user with this email not found', {
        extensions: {
          code: 'NOT_FOUND_EXCEPTION',
          statuscode: 404,
        },
      });
    }

    const isPassMatched = await bcrypt.compare(password, user.password);
    if (!isPassMatched) {
      throw new GraphQLError('password is not valid', {
        extensions: {
          code: 'INVALID_PASSWORD',
          statuscode: 401,
        },
      });
    }

    const jwtToken = await this.authService.generateJwtToken(user);
    return {
      user,
      accessToken: jwtToken,
    };
  }
}
