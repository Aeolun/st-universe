import { Exception } from "@tsed/exceptions";

export class STError extends Exception {
  constructor(
    public httpCode: number,
    public spaceTradersCode: number,
    message: string,
    public data?: any
  ) {
    super(httpCode, message);
  }
}
