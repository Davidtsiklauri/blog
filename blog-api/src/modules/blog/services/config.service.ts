import { Injectable } from '@nestjs/common';
import { IMongoStore } from 'src/modules/base/interfaces/mongo.store.interface';
import { Utils } from 'src/modules/base/utils/utils.class';

@Injectable()
export class ConfigService {
  public readonly store: IMongoStore;

  constructor() {
    const config = Utils.readModuleConfig('blog');
    if (config) {
      this.store = config.store;
    }
  }
}
