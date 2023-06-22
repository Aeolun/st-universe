import {Req} from "@tsed/common";
import {Context} from "@tsed/platform-params";
import {Middleware, MiddlewareMethods} from "@tsed/platform-middlewares";
import {Forbidden, Unauthorized} from "@tsed/exceptions";
import {CustomAuthOptions} from "src/guards/custom-authenticator";
import jwtDecode from "jwt-decode";

@Middleware()
export class CustomAuthMiddleware implements MiddlewareMethods {
  public use(@Req() request: Req, @Context() ctx: Context) {
    // retrieve options given to the @UseAuth decorator
    const options: CustomAuthOptions = ctx.endpoint.get(CustomAuthMiddleware) || {};

    if (!options.optional && !request.headers.authorization) {
      throw new Unauthorized("Unauthorized");
    }

    if (request.headers.authorization && !ctx.has("auth")){
      ctx.set('auth', jwtDecode(request.headers.authorization))
    }
  }
}
