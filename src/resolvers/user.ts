import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities";

import keyv, { DEFAULT_EXPIRATION } from "../redis/keyv";

@Resolver()
class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await keyv.get("users");
      if (users) {
        return users;
      } else {
        throw new Error();
      }
    } catch (error) {
      const users = await User.find({});

      await keyv.set("users", users, DEFAULT_EXPIRATION);

      return users;
    }
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

  @Mutation(() => [User])
  async deleteAllUsers(){
   
  }
}

export default UserResolver;
