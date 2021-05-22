import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpAdapterHost,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoErrorHandler, ZError } from '../utils/mongo-error-handler.class';
import * as mongoose from 'mongoose';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private httpAdapter: HttpAdapterHost;

  constructor(httpAdapter: HttpAdapterHost) {
    this.httpAdapter = httpAdapter;
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    let status = 200;
    let responseBody = { errors: [] };

    try {
      if (exception instanceof Error) {
        responseBody.errors.push(new ZError(exception.name, exception));
      } else if (exception instanceof ZError) {
        responseBody.errors.push(exception);
      } else if (exception instanceof NotFoundException) {
        responseBody.errors.push(
          new ZError('wrong_api_uri', exception.message),
        );
      } else if (exception instanceof HttpException) {
        status = exception.getStatus();
      } else if (exception instanceof mongoose.Error.ValidationError) {
        responseBody.errors.push(MongoErrorHandler.transform(exception));
      } else if (exception instanceof mongoose.Error.CastError) {
        responseBody.errors.push(
          new ZError('mongo_cast_error', exception.message),
        );
      }
    } catch (unknown: any) {
      status = 500;
      responseBody.errors.push(new ZError('unknown', unknown));
    }

    response.status(status).json(responseBody);
  }
}
