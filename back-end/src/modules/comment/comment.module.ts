import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { User } from '../auth/entities/user.entity';
import { Video } from '../videos/entities/video.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Video])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
