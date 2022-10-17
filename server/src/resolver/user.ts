import { Query, Resolver } from "type-graphql";

@Resolver()
class UserResolver {
   @Query(()=>String)
   hello(): string {
    return "Hello world"
   }
}

export default UserResolver