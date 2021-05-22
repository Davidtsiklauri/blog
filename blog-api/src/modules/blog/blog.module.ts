import { BlogService } from './services/blog.service';
import { BlogController } from './controllers/blog.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schema/blog.schema';
import { ConfigService } from './services/config.service';

@Module({
  controllers: [BlogController],
  imports: [
    MongooseModule.forRootAsync({
      imports: [BlogModule],
      useFactory: async (configService: ConfigService) => configService.store,
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
  ],
  providers: [ConfigService, BlogService],
  exports: [ConfigService],
})
export class BlogModule {}
