import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/challenge.dto';
import { Challenge } from './entities/challenge.entity';

@Controller('challenges')
export class ChallengeController {
    constructor(private readonly challengeService: ChallengeService) { }

    // Tạo mới Challenge
    @Post('create')
    async create(@Body() createChallengeDto: CreateChallengeDto): Promise<Challenge> {
        return this.challengeService.create(createChallengeDto);
    }

    // Lấy tất cả các Challenge
    @Get('getAllChallenge')
    async findAll(): Promise<Challenge[]> {
        return this.challengeService.findAll();
    }

    // Gán danh sách video cho một challenge
    @Post(':challengeId/assignVideos')
    async assignVideos(
        @Param('challengeId') challengeId: string,
        @Body('videoIds') videoIds: string[],
    ): Promise<Challenge> {
        return this.challengeService.assignVideosToChallenge(challengeId, videoIds);
    }


    // ChallengeController
    @Get('/video/:id')
    async findOneWithVideos(@Param('id') id: string): Promise<Challenge> {
      return this.challengeService.findChallengeWithVideos(id);
    }


}
