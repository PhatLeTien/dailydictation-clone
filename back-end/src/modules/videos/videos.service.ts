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

  ) { }

  
  async crawlVideosFromPlaylist(playlistUrl: string): Promise<void> {
    try {
      const playlist = await ytpl(playlistUrl);
      console.log(`Found ${playlist.items.length} videos in playlist`);
  
      const crawlPromises = playlist.items.map(async (item) => {
        try {
          const videoExists = await this.videoRepository.findOne({ 
            where: { url: item.url } 
          });
  
          if (videoExists) {
            console.log(`Video ${item.title} already exists, skipping...`);
            return;
          }
  
          let videoDetails;
          try {
            videoDetails = await ytdl.getBasicInfo(item.url);
          } catch (infoError) {
            // Check for specific error messages
            if (
              infoError.message.includes('Private video') || 
              infoError.message.includes('Sign in if you\'ve been granted access') ||
              infoError.message.includes('Video unavailable')
            ) {
              console.log(`Skipping private video: ${item.title}`);
              return;
            }
            throw infoError;
          }
  
          // Tạo đối tượng video
          const videoData: CreateVideoDto = {
            title: videoDetails.videoDetails.title,
            url: videoDetails.videoDetails.video_url,
            thumbnail: videoDetails.videoDetails.thumbnails[0]?.url || '',
            description: videoDetails.videoDetails.description,
          };
  
          // Lưu video vào cơ sở dữ liệu
          const video = await this.videoRepository.save(videoData);
          console.log(`Successfully processed and saved video: ${videoData.title}`);
  
          // Thử tải transcript
          try {
            await this.getTranscriptFromVideo(video.url, video.title, video.id);
          } catch (transcriptError) {
            // Nếu lỗi liên quan đến transcript, xóa video khỏi cơ sở dữ liệu
            if (
              transcriptError.message.includes('No subtitles') || 
              transcriptError.message.includes('There are no subtitles')
            ) {
              console.log(`No subtitles available for video: ${video.title}. Deleting video.`);
              
              // Xóa video khỏi cơ sở dữ liệu bằng cách sử dụng ID
              await this.videoRepository.delete(video.id);
              console.log(`Successfully deleted video with ID: ${video.id}`);
            } else {
              // For other transcript errors, log but continue
              console.error(`Transcript error for ${video.title}:`, transcriptError);
            }
          }
  
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
      const safeTitle = videoTitle.replace(/[\/:*?"<>|]/g, '').replace(/\s+/g, '_');
      const transcriptFileName = `${safeTitle}_${videoId}.en.vtt`;
  
      const command = `yt-dlp --write-auto-sub --skip-download --sub-lang en --output "../front-end/public/transcripts/${safeTitle}_${videoId}" "${videoUrl}"`;
  
      exec(command, async (error, stdout, stderr) => {
        if (error) {
          // Kiểm tra lỗi liên quan đến subtitle
          if (
            stderr.includes('No subtitles') || 
            stderr.includes('There are no subtitles for the requested languages')
          ) {
            // Thay vì chỉ reject, xóa luôn video khỏi database
            try {
              await this.videoRepository.delete(videoId);
              console.log(`Deleted video ${videoTitle} due to no subtitles`);
              return reject('No subtitles available for this video');
            } catch (deleteError) {
              console.error(`Error deleting video ${videoTitle}:`, deleteError);
              return reject('Could not delete video without subtitles');
            }
          }
  
          console.error('Error executing yt-dlp:', error);
          console.error('Details:', stderr);
          return reject('Không thể tải transcript từ video');
        }
  
        // Kiểm tra xem file transcript có tồn tại không
        const transcriptPath = path.join(outputDir, `${safeTitle}_${videoId}.en.vtt`);
        if (!fs.existsSync(transcriptPath)) {
          // Nếu không có file transcript, xóa video
          try {
            await this.videoRepository.delete(videoId);
            console.log(`Deleted video ${videoTitle} due to missing transcript file`);
            return reject('Transcript file was not created');
          } catch (deleteError) {
            console.error(`Error deleting video ${videoTitle}:`, deleteError);
            return reject('Could not delete video without transcript');
          }
        }
  
        // Cập nhật tên file transcript trong bảng videos
        const video = await this.videoRepository.findOne({ where: { id: videoId } });
        if (video) {
          video.transcript_path = transcriptFileName;
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


// Crawl một video cụ thể và lấy transcript
async crawlSingleVideo(videoUrl: string): Promise<string> {
  try {
    // Kiểm tra xem video đã tồn tại chưa
    const videoExists = await this.videoRepository.findOne({ where: { url: videoUrl } });
    if (videoExists) {
      return `Video "${videoExists.title}" đã tồn tại, không cần crawl lại.`;
    }

    // Lấy thông tin chi tiết từ video
    const videoDetails = await ytdl.getBasicInfo(videoUrl);

    // Tạo đối tượng video
    const videoData: CreateVideoDto = {
      title: videoDetails.videoDetails.title,
      url: videoDetails.videoDetails.video_url,
      thumbnail: videoDetails.videoDetails.thumbnails[0].url,
      description: videoDetails.videoDetails.description,
    };

    // Lưu thông tin video vào cơ sở dữ liệu
    const video = await this.videoRepository.save(videoData);
    console.log(`Đã lưu video: ${videoData.title}`);

    // Tải transcript và cập nhật vào cơ sở dữ liệu
    try {
      await this.getTranscriptFromVideo(video.url, video.title, video.id);
    } catch (transcriptError) {
      console.error(`Lỗi khi tải transcript cho video ${videoData.title}: ${transcriptError}`);
      
      // Xóa video vừa lưu nếu không tải được transcript
      await this.videoRepository.remove(video);
      
      // Trả về thông báo lỗi
      return `Không thể tải transcript cho video "${videoData.title}", video đã bị xóa.`;
    }

    return `Đã crawl và lưu thành công video: ${videoData.title}`;
  } catch (error) {
    console.error('Lỗi khi crawl video:', error);
    throw new Error('Không thể crawl video từ URL cung cấp.');
  }
}











}
