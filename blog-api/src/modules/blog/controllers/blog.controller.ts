import { BlogService } from './../services/blog.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddRequestBody } from '../dtos/add.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('/add')
  addBlog(@Body() post: AddRequestBody) {
    return this.blogService.saveBlog(post);
  }

  @Get()
  getHello(): string {
    return 'this.appService.getHello();';
  }
}
