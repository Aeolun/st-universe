import { In, Returns } from "@tsed/schema";
import { UseAuth } from "@tsed/platform-middlewares";
import { useDecorators } from "@tsed/core";
import {
  CustomAuthMiddleware,
  CustomAuthOptions,
} from "./custom-auth-middleware";

export function CustomAuth(options: CustomAuthOptions = {}): Function {
  return useDecorators(
    UseAuth(CustomAuthMiddleware, options),
    In("header").Name("Authorization").Type(String).Required(!options.optional),
    Returns(401),
    Returns(403)
  );
}
