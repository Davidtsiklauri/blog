import { MongoErrorHandler, ZError } from './mongo-error-handler.class';

export class ServiceExceptionHandler {
  public static handle(ex: any) {
    if (ex && ex.name && ex.name == 'ValidationError') {
      throw MongoErrorHandler.transform(ex);
    } else if (ex instanceof ZError) {
      throw ex;
    } else {
      throw new ZError('empty_exception', ex);
    }
  }
}
