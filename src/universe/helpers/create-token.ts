import jwt from "jsonwebtoken";
import { universe } from "src/universe/universe";
import { AuthToken } from "src/models/auth-token";

export const createToken = (symbol: string) => {
  return jwt.sign(
    {
      identifier: symbol,
      version: "v2",
      reset_date: universe.createDate,
      sub: "agent-token",
    } satisfies AuthToken,
    process.env.JWT_SECRET ?? "mysecret"
  );
};
