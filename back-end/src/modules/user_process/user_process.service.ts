import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProcess } from './entities/user_process.entity';
import { User } from '../auth/entities/user.entity';
import { Video } from '../videos/entities/video.entity';

@Injectable()
export class UserProcessService {
    constructor(
        @InjectRepository(UserProcess)
        private userProcessRepository: Repository<UserProcess>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Video)
        private videoRepository: Repository<Video>,
    ) { }

    // Lưu hoặc cập nhật quá trình học của người dùng
    // Lưu hoặc cập nhật quá trình học của người dùng
    async saveUserProcess(
        userId: number,
        videoId: number,
        currentTime: number,
        completionPercentage: number,
    ): Promise<UserProcess> {
        // Tìm người dùng và video
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const video = await this.videoRepository.findOneBy({ id: videoId.toString() });
    
        if (!user || !video) {
            throw new Error('User or Video not found');
        }
    
        // Kiểm tra xem người dùng đã có quá trình học cho video này chưa
        let userProcess = await this.userProcessRepository.findOne({
            where: { 
                user: { id: user.id }, 
                video: { id: video.id } 
            }
        });
    
        if (userProcess) {
            // Cập nhật nếu đã tồn tại
            userProcess.currentTime = currentTime;
            userProcess.completionPercentage = completionPercentage;
            
            // Sử dụng save thay vì update
            return this.userProcessRepository.save(userProcess);
        } else {
            // Thêm mới nếu không có bản ghi
            userProcess = this.userProcessRepository.create({
                user,
                video,
                currentTime,
                completionPercentage,
            });
            return this.userProcessRepository.save(userProcess);
        }
    }


  // Nếu muốn lấy thông tin của một video cụ thể cho user
async getUserProcessByUserAndVideo(
    userId: number, 
    videoId: number
): Promise<UserProcess | null> {
    return this.userProcessRepository.findOne({
        where: { 
            user: { id: userId },
            video: { id: videoId.toString() }
        },
        relations: ['video'] // Load thông tin video
    });
}
    

}
