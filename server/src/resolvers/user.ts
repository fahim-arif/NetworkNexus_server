import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { User } from "../entities";

@Resolver()
class UserResolver {
  @Query(() => String)
  hello(): string {
    return "Hello world";
  }

  @Query(() => [User])
  getAllUsers(): Promise<User[]> {
    return User.find({});
  }

  @Mutation(() => User)
  createUser(
    @Arg("email", () => String)
    email: string,
    @Arg("name", () => String)
    name: string,
    @Arg("password", () => String)
    password: string
  ): Promise<User> {
    return User.create({
      email,
      name,
      password,
    }).save();
  }
}

export default UserResolver;
