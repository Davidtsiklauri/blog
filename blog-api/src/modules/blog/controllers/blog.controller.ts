import { BlogService } from './../services/blog.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  deletePost(@Param('id') postId: string) {
    return this.blogService.deletePost(postId);
  }

  @Put(':id')
  editPost(@Body() post: AddRequestBody, @Param('id') postId: string) {
    return this.blogService.updatePost(postId, post);
  }

  @Get(':id')
  getPost(@Param('id') postId: string) {
    return this.blogService.getPostById(postId);
  }
}
