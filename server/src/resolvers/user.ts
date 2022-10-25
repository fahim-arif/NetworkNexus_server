import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { User } from "../entities";

@Resolver()
class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await User.find({});
  }

  @Query(() => Boolean)
  async checkDuplicateEmail(
    @Arg("email", () => String)
    email: string
  ): Promise<boolean> {
    try {
      await User.findOneByOrFail({ email });
      return true;
    } catch (error) {
      return false;
    }
  }

  @Mutation(() => User)
  async createUser(
    @Arg("email", () => String)
    email: string,
    @Arg("name", () => String)
    name: string,
    @Arg("password", () => String)
    password: string
  ): Promise<User> {
    return await User.create({
      email,
      name,
      password,
    }).save();
  }
}

export default UserResolver;
