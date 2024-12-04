import { Module } from '@nestjs/common';
import { ChallengeController } from './challenge.controller';
import { ChallengeService } from './challenge.service';
import { Challenge } from './entities/challenge.entity';
import { Video } from '../videos/entities/video.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forFeature([Challenge, Video]),],
  controllers: [ChallengeController],
  providers: [ChallengeService]
})
export class ChallengeModule {}
