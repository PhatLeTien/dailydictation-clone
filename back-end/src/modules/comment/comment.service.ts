import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity'; // Import entity của bạn
import { CreateCommentDto } from './dto/comment.dto'; // Tạo DTO này để nhận dữ liệu đầu vào
import { UpdateCommentDto } from './dto/comment.dto'; // Tạo DTO để cập nhật comment
import { User } from '../auth/entities/user.entity'; // Import User entity
import { Video } from '../videos/entities/video.entity'; // Import Video entity

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,

        // Injecting User and Video repositories
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>,
    ) { }

    // Tạo comment mới
    async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
        const { content, userId, videoId, parentId } = createCommentDto;

        // Kiểm tra xem video có tồn tại không
        // Kiểm tra xem video có tồn tại không
        const video = await this.videoRepository.findOneBy({ id: videoId.toString() }); // Chuyển đổi videoId sang kiểu string
        if (!video) {
            throw new NotFoundException('Video not found');
        }


        // Kiểm tra xem user có tồn tại không
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Kiểm tra xem bình luận cha có tồn tại không nếu có parentId
        let parentComment: Comment | undefined = undefined;
        if (parentId) {
            parentComment = await this.commentRepository.findOneBy({ id: parentId });
            if (!parentComment) {
                throw new NotFoundException('Parent comment not found');
            }
        }

        // Tạo bình luận mới
        const newComment = this.commentRepository.create({
            content,
            user,
            video,
            parent: parentComment, // Liên kết với bình luận cha nếu có
        });

        return await this.commentRepository.save(newComment); // Lưu bình luận mới
    }

    // Lấy tất cả comment hoặc comment theo video
    async getComments(videoId?: number): Promise<Comment[]> {
        const query = this.commentRepository.createQueryBuilder('comment')
            .leftJoinAndSelect('comment.user', 'user')
            .leftJoinAndSelect('comment.video', 'video')
            .leftJoinAndSelect('comment.replies', 'replies') // Liên kết với bình luận con
            .addSelect('user.username') // Lấy tên người dùng
            .addSelect('comment.content'); // Lấy nội dung bình luận

        if (videoId) {
            query.where('comment.videoId = :videoId', { videoId });
        }

        return await query.getMany();
    }

    // Cập nhật comment
    async updateComment(id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.commentRepository.findOneBy({ id });
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        // Cập nhật nội dung bình luận
        if (updateCommentDto.content) {
            comment.content = updateCommentDto.content;
        }

        return await this.commentRepository.save(comment); // Lưu bình luận đã được cập nhật
    }

    // Xóa comment
    async deleteComment(id: number): Promise<void> {
        const comment = await this.commentRepository.findOneBy({ id });
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        await this.commentRepository.remove(comment); // Xóa bình luận
    }
}
