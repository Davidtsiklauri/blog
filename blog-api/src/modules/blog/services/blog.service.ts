import { Model } from 'mongoose';
import { Body, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../schema/blog.schema';
import { AddRequestBody } from '../dtos/add.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async saveBlog({ data }: AddRequestBody): Promise<Blog> {
    const createdPost = await new this.blogModel(data);
    return createdPost.save();
  }
}
