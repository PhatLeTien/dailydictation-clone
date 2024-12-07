import { Module } from '@nestjs/common';
import { User } from '../auth/entities/user.entity';
import { Video } from '../videos/entities/video.entity';
import { UserProcess } from './entities/user_process.entity';
import { UserProcessController } from './user_process.controller';
import { UserProcessService } from './user_process.service';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([UserProcess, User, Video])],
  controllers: [UserProcessController],
  providers: [UserProcessService],
})
export class UserProcessModule {}




