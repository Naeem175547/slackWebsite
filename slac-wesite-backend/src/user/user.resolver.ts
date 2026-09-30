import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service.js';
import { User, UserResponse, UsersResponse } from './types/user.type.js';
import { CreateUserInput } from './dto/create-user.input.js';
import { UpdateUserInput } from './dto/update-user.input.js';

@Resolver(() => UserResponse)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  

  @Query(() => UsersResponse, { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserResponse, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }
  @Query(() => UserResponse, { name: 'userByEmail' })
  findOneByEmail(@Args('email', { type: () => String }) email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Query(() => UserResponse, { name: 'userByUsername' })
  findOneByUsername(@Args('username', { type: () => String }) username: string) {
    return this.userService.findOneByUsername(username);
  }

  @Mutation(() => UserResponse)
  updateUser(@Args('id', { type: () => Int }) id: number, @Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => UserResponse)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

}
