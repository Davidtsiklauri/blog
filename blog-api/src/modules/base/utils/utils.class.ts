import { AppModule } from '../../../app.module';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';

export class Utils {
  public static readModuleConfig(module: string, filename?: string): any {
    try {
      const config = Utils.readJSONFile(
        `${AppModule.configsDir}/${module}/${filename || 'config'}.json`,
      );
      let env = process.env.NODE_ENV;
      if (!env) {
        Logger.warn(
          `Module: ${module} -> NODE_ENV is undefined -> gonna use development as default`,
        );
        env = 'development';
      }
      return config[env] ? config[env] : null;
    } catch (e) {
      Logger.error(`## Base Module - ConfigService - error: ${e} ##`);
      return null;
    }
  }

  public static readJSONFile(path: string): any {
    try {
      const file = fs.readFileSync(path);
      return JSON.parse(file.toString('utf-8'));
    } catch (e) {
      Logger.error(`## Base Module - ConfigService - error: ${e} ##`);
      return null;
    }
  }
}
