import { UseGuards } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: string) {
    return this.userService.findOne(id);
  }

  @Query(() => [User])
  async usersByClinic(@Args('clinicId', { type: () => ID }) clinicId: string) {
    return this.userService.findByClinic(clinicId);
  }
} 