import { BlogService } from './../services/blog.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddRequestBody, Data } from '../dtos/add.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('/add')
  addPost(@Body() post: AddRequestBody) {
    return this.blogService.saveBlog(post);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.blogService.deletePost(id);
  }

  @Post('/add')
  editPost(@Body() post: AddRequestBody) {
    return this.blogService.saveBlog(post);
  }

  @Get(':id')
  getPost(@Body() post: AddRequestBody) {
    return this.blogService.saveBlog(post);
  }

  @Get()
  getHello(): string {
    return 'this.appService.getHello();';
  }
}
