import {In, Returns, Security} from "@tsed/schema";
import {UseAuth} from "@tsed/platform-middlewares";
import {useDecorators} from "@tsed/core";
import {CustomAuthMiddleware} from "./custom-auth-middleware";

export interface CustomAuthOptions extends Record<string, unknown> {
  optional?: boolean;
}

export function CustomAuth(options: CustomAuthOptions = {}): Function {
  return useDecorators(
    UseAuth(CustomAuthMiddleware, options),
    In("header").Name("Authorization").Type(String).Required(!options.optional),
    Returns(401),
    Returns(403)
  );
}