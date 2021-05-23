import { SearchRequestDTO } from './../dtos/search.dto';
import { ZError } from './../../base/utils/mongo-error-handler.class';
import { Model } from 'mongoose';
import { Body, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../schema/blog.schema';
import { AddRequestBody, Data } from '../dtos/add.dto';
import { throwError } from 'rxjs';
import { Posts } from 'src/modules/base/interfaces/blog.interface';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async saveBlog({ data }: AddRequestBody): Promise<Blog> {
    const createdPost = await new this.blogModel(data);
    return createdPost.save();
  }

  async deletePost(postId: string): Promise<Blog> {
    try {
      return await this.blogModel.findOneAndDelete({ _id: postId });
    } catch (e) {
      throw new ZError('not found');
    }
  }

  async updatePost(postId: string, { data }: any): Promise<Blog> {
    try {
      await this.blogModel.findOneAndUpdate({ _id: postId }, data);
      return data;
    } catch (e) {
      throw new ZError('not found');
    }
  }

  async getPostById(postId: string) {
    try {
      return await this.blogModel.findOne({ _id: postId });
    } catch (e) {
      throw new ZError('not found');
    }
  }

  async searchPosts(query: SearchRequestDTO): Promise<any> {
    const paging = query.pagination.extract();
    const documentPromise = this.blogModel.find(query.data, {}, paging);
    const countPromise = this.blogModel.countDocuments(query.data);
    const [blogs, amount] = await Promise.all([documentPromise, countPromise]);
    return { blogs, amount };
  }
}
