import { Req } from "@tsed/common";
import { Context } from "@tsed/platform-params";
import { Middleware, MiddlewareMethods } from "@tsed/platform-middlewares";
import { Forbidden, Unauthorized } from "@tsed/exceptions";
import { CustomAuthOptions } from "src/guards/custom-authenticator";
import jwtDecode from "jwt-decode";
import { verify } from "jsonwebtoken";
import { STError } from "src/error/STError";
import { missingTokenRequestError } from "src/universe/static-data/error-codes";

const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new STError(500, 500, "No JWT_SECRET specified in environment");
}

@Middleware()
export class CustomAuthMiddleware implements MiddlewareMethods {
  public use(@Req() request: Req, @Context() ctx: Context) {
    // retrieve options given to the @UseAuth decorator
    const options: CustomAuthOptions =
      ctx.endpoint.get(CustomAuthMiddleware) || {};

    if (!options.optional && !request.headers.authorization) {
      throw new STError(
        403,
        missingTokenRequestError,
        "No token specified in Authorization header"
      );
    }

    if (request.headers.authorization && !ctx.has("auth")) {
      if (!secret) {
        throw new STError(500, 500, "No JWT_SECRET specified in environment");
      }

      try {
        const jwt = verify(request.headers.authorization.split(" ")[1], secret);
      } catch (err) {
        console.log(err.toString());
        throw err;
      }

      ctx.set("auth", jwtDecode(request.headers.authorization));
    }
  }
}
