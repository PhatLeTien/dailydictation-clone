export class CreateCommentDto {
    content: string;
    userId: number;
    videoId: number;
    parentId?: number; // Có thể là null nếu không phải comment con
  }
  
  export class UpdateCommentDto {
    content?: string; // Cho phép cập nhật nội dung
  }
  