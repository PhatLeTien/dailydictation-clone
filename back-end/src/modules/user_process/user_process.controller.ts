import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { UserProcessService } from '../user_process/user_process.service';

@Controller('user_process')
export class UserProcessController {
  constructor(private readonly userProcessService: UserProcessService) {}

  // Lưu quá trình học của người dùng
  @Post('save')
  async saveUserProcess(
    @Body() body: { userId: number; videoId: number; currentTime: number; completionPercentage: number },
  ) {
    return this.userProcessService.saveUserProcess(
      body.userId,
      body.videoId,
      body.currentTime,
      body.completionPercentage,
    );
  }

    // Lấy quá trình học của người dùng cho một video cụ thể
    @Get('/:userId/:videoId')
    async getUserProcessForVideo(
        @Param('userId') userId: number,
        @Param('videoId') videoId: number
    ) {
        return this.userProcessService.getUserProcessByUserAndVideo(userId, videoId);
    }


  // Lấy tất cả quá trình học của người dùng
    @Get('user/:userId')
    async getUserProcesses(@Param('userId') userId: number) {
        return this.userProcessService.getUserProcessByUser(userId);
    }

}
