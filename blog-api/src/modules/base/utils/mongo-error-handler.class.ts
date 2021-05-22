export class ZError {
  keyword: string;
  debug?: any;
  validation?: any;

  constructor(keyword: string, debug?: any) {
    this.keyword = keyword;
    this.debug = debug;
  }

  public static throw(keyword: string, debug?: any) {
    throw new ZError(keyword, debug);
  }

  public static dataValidation(validation: any) {
    const error = new ZError('data_validation', null);
    error.validation = validation;
    return error;
  }
}

export class MongoErrorHandler {
  public static transform(ex: any): ZError {
    if (!ex || ex.name !== 'ValidationError') {
      return new ZError('unknown_mongo_error_object');
    }

    for (var key in ex.errors) {
      if (Object.prototype.hasOwnProperty.call(ex.errors, key)) {
        return new ZError('mongo_validation_error', ex.errors[key].message);
      }
    }

    return new ZError('couldnt_extract_mongo_error', ex);
  }
}
