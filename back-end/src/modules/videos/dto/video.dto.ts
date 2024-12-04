
export class CreateVideoDto {
    title: string;
    url?: string;
    thumbnail: string;
    description?: string;
    mp3_file_path?: string;
}
export class CreateTranscriptDto {
    videoId: string;
    text: string;
    startTime: number;
    endTime: number;
}
export class UpdateVideoDto {
    title?: string;
    url?: string;
    thumbnail?: string;
    description?: string;
  }
  
  