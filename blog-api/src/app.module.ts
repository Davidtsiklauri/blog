import { BlogModule } from './modules/blog/blog.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  public static rootDir: string = __dirname;
  public static configsDir: string = `${__dirname}/configs`;
  public static resourcesDir: string = `${__dirname}/resources`;
}
