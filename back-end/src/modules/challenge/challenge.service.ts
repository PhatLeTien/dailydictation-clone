import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from './entities/challenge.entity';
import { CreateChallengeDto } from './dto/challenge.dto';
import { Video } from '../videos/entities/video.entity';

@Injectable()
export class ChallengeService {
    constructor(
        @InjectRepository(Challenge)
        private readonly challengeRepository: Repository<Challenge>,

        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>,
    ) { }

    // Tạo mới Challenge
    async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
        const challenge = this.challengeRepository.create(createChallengeDto);
        return this.challengeRepository.save(challenge);
    }

    // Lấy tất cả các Challenge
    async findAll(): Promise<Challenge[]> {
        return this.challengeRepository.find();  // Trả về tất cả các bản ghi từ bảng Challenge
    }

    // Gán danh sách video bất kỳ cho một challenge
    async assignVideosToChallenge(challengeId: string, videoIds: string[]): Promise<Challenge> {
        // Tìm challenge theo ID
        const challenge = await this.challengeRepository.findOne({
            where: { id: challengeId },
            relations: ['videos'],
        });

        if (!challenge) {
            throw new Error('Challenge không tồn tại');
        }

        // Tìm các video dựa trên IDs
        const videos = await this.videoRepository.findByIds(videoIds);

        // Gán danh sách video vào challenge
        challenge.videos = videos;

        // Lưu lại challenge với các video đã gán
        return this.challengeRepository.save(challenge);
    }

    // Lấy challenge cùng với danh sách video
    async findChallengeWithVideos(challengeId: string): Promise<Challenge> {
        return this.challengeRepository.findOne({
            where: { id: challengeId },
            relations: ['videos'], // Nạp liên kết video vào
        });
    }

}