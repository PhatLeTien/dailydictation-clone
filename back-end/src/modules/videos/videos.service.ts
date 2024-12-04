import { Injectable } from '@nestjs/common';
import * as ytdl from 'ytdl-core';
import * as ytpl from 'ytpl';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { Repository } from 'typeorm';
import { CreateVideoDto } from './dto/video.dto';


@Injectable()
@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video) private videoRepository: Repository<Video>,
   
  ) {}

  // Crawl video từ playlist và lấy URL âm thanh MP3, đồng thời tải transcript của từng video
  // Crawl video từ playlist và lấy URL âm thanh MP3, đồng thời tải transcript của từng video
async crawlVideosFromPlaylist(playlistUrl: string): Promise<void> {
  try {
    const playlist = await ytpl(playlistUrl);
    console.log(`Found ${playlist.items.length} videos in playlist`);

    const crawlPromises = playlist.items.map(async (item) => {
      try {
        const videoExists = await this.videoRepository.findOne({ where: { url: item.url } });
        if (videoExists) {
          console.log(`Video ${item.title} already exists, skipping...`);
          return;
        }

        // Lấy thông tin cơ bản từ video
        const videoDetails = await ytdl.getBasicInfo(item.url);

        // Tạo đối tượng video
        const videoData: CreateVideoDto = {
          title: videoDetails.videoDetails.title,
          url: videoDetails.videoDetails.video_url,
          thumbnail: videoDetails.videoDetails.thumbnails[0].url,
          description: videoDetails.videoDetails.description,
        };

        // Lưu video vào cơ sở dữ liệu
        const video = await this.videoRepository.save(videoData);
        console.log(`Successfully processed and saved video: ${videoData.title}`);

        // Đồng thời tải transcript cho video vừa thêm và cập nhật vào cột transcriptFile
        await this.getTranscriptFromVideo(video.url, video.title, video.id); // Gọi phương thức tải transcript

      } catch (error) {
        console.error(`Error processing video ${item.url}:`, error);
      }
    });

    // Đợi tất cả các video được xử lý hoàn tất
    await Promise.all(crawlPromises);
    console.log('Finished processing all videos');
  } catch (error) {
    console.error('Error crawling playlist:', error);
    throw error;
  }
}


async getTranscriptFromVideo(videoUrl: string, videoTitle: string, videoId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const outputDir = path.resolve('../front-end/public/transcripts');
    // Làm sạch tên video để tránh các ký tự không hợp lệ trong tên file
    const safeTitle = videoTitle.replace(/[\/:*?"<>|]/g, '').replace(/\s+/g, '_'); // Thay thế ký tự không hợp lệ và dấu cách bằng '_'
    const transcriptFileName = `${safeTitle}.en.vtt`;  // Tên file transcript

    const command = `yt-dlp --write-auto-sub --skip-download --sub-lang en --output "../front-end/public/transcripts/${safeTitle}" "${videoUrl}"`;

    exec(command, async (error, stdout, stderr) => {
      if (error) {
        console.error('Error executing yt-dlp:', error);
        return reject('Không thể tải transcript từ video');
      }

      // Cập nhật tên file transcript trong bảng videos
      const video = await this.videoRepository.findOne({ where: { id: videoId } });
      if (video) {
        video.transcript_path = transcriptFileName;  // Lưu tên file transcript trực tiếp vào cột transcriptFile
        await this.videoRepository.save(video);

        console.log('Transcript file name saved successfully in videos table');
        resolve();
      } else {
        reject('Video không tồn tại trong cơ sở dữ liệu');
      }
    });
  });
}

  
  
  // Hàm để tải âm thanh từ video URL
  async downloadAudioFromVideo(videoUrl: string, videoTitle: string): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log("Starting audio download...");
      const outputDir = path.resolve('../front-end/public/audio'); // Thư mục chứa file audio
      const sanitizedTitle = videoTitle.replace(/[<>:"/\\|?*]+/g, ''); // Lọc ký tự không hợp lệ
      const audioFileName = `${sanitizedTitle}.mp3`; // Tên file âm thanh
      const audioFilePath = path.join(outputDir, audioFileName); // Đường dẫn đến file âm thanh
  
      const command = `yt-dlp -x --audio-format mp3 --ffmpeg-location ./public/ffmpeg/bin/ffmpeg.exe --output "${audioFilePath}" "${videoUrl}"`;
  
      // Thực thi câu lệnh tải âm thanh
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error('Error executing yt-dlp:', error);
          reject('Không thể tải âm thanh từ video');
          return;
        }
        if (stderr) {
          console.error('stderr:', stderr);
          reject('Không thể tải âm thanh từ video');
          return;
        }
  
        console.log('Tải âm thanh thành công:', audioFilePath);
        resolve(audioFileName); // Trả về tên file âm thanh
      });
    });
  }

  // Hàm để lấy thông tin video theo ID
  async getVideoById(videoId: string): Promise<Video> {
    return this.videoRepository.findOne({
      where: { id: videoId },
     
  });
  }


  
  




 
}
