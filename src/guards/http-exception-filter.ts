import { STError } from "src/error/STError";
import { PlatformContext, ResponseErrorObject } from "@tsed/common";
import { Catch, ExceptionFilterMethods } from "@tsed/platform-exceptions";

@Catch(STError)
export class HttpExceptionFilter implements ExceptionFilterMethods {
  catch(exception: STError, ctx: PlatformContext) {
    const { response, logger } = ctx;
    const error = this.mapError(exception);

    logger.error({
      error,
    });

    response.status(exception.httpCode).body(error);
  }

  mapError(error: STError) {
    return {
      error: {
        code: error.spaceTradersCode,
        message: error.message,
        data: error.data,
      },
    };
  }
}
