import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Video } from '../../videos/entities/video.entity';

@Entity('user_process')
export class UserProcess {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userProcesses)
  user: User;

  @ManyToOne(() => Video, (video) => video.userProcesses)
  video: Video;

  @Column({ type: 'float', default: 0 })
  currentTime: number; // Thời gian đã xem

  @Column({ type: 'float', default: 0 })
  completionPercentage: number; // Phần trăm hoàn thành

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
