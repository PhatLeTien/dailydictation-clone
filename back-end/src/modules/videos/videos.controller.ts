import { Controller, Post, Body, Param, Get} from '@nestjs/common';
import { VideosService } from './videos.service';
import { Video } from './entities/video.entity';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  // Route để crawl tất cả các video từ playlist và lưu vào database
  @Post('crawl-from-playlist')
  async crawlVideosFromPlaylist(@Body('playlistUrl') playlistUrl: string): Promise<string> {
    try {
      // Gọi service để crawl video từ playlist
      await this.videosService.crawlVideosFromPlaylist(playlistUrl);
      return `Đã hoàn thành việc crawl video từ playlist: ${playlistUrl}`;
    } catch (error) {
      console.error('Lỗi khi crawl playlist:', error);
      throw new Error('Không thể crawl video từ playlist');
    }
  }



    // ChallengeController
    @Get('/getVideo/:id')
    async getVideoById(@Param('id') id: string): Promise<Video> {
    
      return this.videosService.getVideoById(id);
    }

 
    // Route để crawl 1 video cụ thể và lấy transcript
  @Post('crawl-single-video')
  async crawlSingleVideo(@Body('videoUrl') videoUrl: string): Promise<string> {
    try {
      const message = await this.videosService.crawlSingleVideo(videoUrl);
      return message;
    } catch (error) {
      console.error('Lỗi khi crawl video:', error);
      throw new Error('Không thể crawl video từ URL cung cấp.');
    }
  }
 
}
