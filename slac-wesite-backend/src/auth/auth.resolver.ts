import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserResponse } from '../user/types/user.type.js';
import { CreateUserInput } from '../user/dto/create-user.input.js';
import { UserService } from '../user/user.service.js';
import { GraphQLError } from 'graphql';

import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service.js';
import { LoginResponse } from './dto/login.response.type.js';
import { ENABLE_EMAIL_VERIFICATION } from '../config/serverConfig.js';
import { RabbitMqProducer } from '../rabbitmq/rabbitmq.producer.js';
import { verifyEmailMail } from '../common/utils/mailObject.js';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly rabbitmqProducer:RabbitMqProducer
  ) {}
  @Mutation(() => UserResponse)
  async signUp(@Args('createUserInput') createUserInput: CreateUserInput) {
    try{
      const user= await this.userService.create(createUserInput);
      if(ENABLE_EMAIL_VERIFICATION){
        if(!user.token){
          throw new GraphQLError('token missing...')
        }
        const mail=verifyEmailMail(user.token)
        this.rabbitmqProducer.sendMail(user.email,mail.subject,mail.text)
      }
      return user;
    }
    catch(error){
      console.error('signUp failed:', error);
      if (error instanceof GraphQLError) throw error;
      throw new GraphQLError('user creation failed...')
    }
  }

  @Mutation(()=>Boolean)
  async verifyToken(@Args('token',{type:()=>String}) token:string){  
    return this.authService.verifyToken(token)  


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
