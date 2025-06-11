import { ErrorCode } from '../ErrorCode';
import { HttpError } from './HttpError';

export class BadRequest extends HttpError {
  public statusCode = 400;
  public code: ErrorCode;

  constructor(message?: any, code?: ErrorCode) {
    super();
    this.name = 'BadRequest';
    this.message = message ?? 'Bad Request';
    this.code = code ?? ErrorCode.BAD_REQUEST;
  }
}
