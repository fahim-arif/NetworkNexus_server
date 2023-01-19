import { MiddlewareFn } from "type-graphql";

const auth: MiddlewareFn = ({ context }, next) => {
  console.log(context);

  return next();
};

export default auth;
