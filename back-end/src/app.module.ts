import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { dataSourceOptions } from 'db/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChallengeModule } from './modules/challenge/challenge.module';
import { VideosModule } from './modules/videos/videos.module';
import { CommentModule } from './modules/comment/comment.module';
import { UserProcessModule } from './modules/user_process/user_process.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    ChallengeModule,
    VideosModule,
    CommentModule,
    UserProcessModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
