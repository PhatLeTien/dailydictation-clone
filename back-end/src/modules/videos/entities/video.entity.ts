import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Challenge } from '../../challenge/entities/challenge.entity';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { UserProcess } from '../../user_process/entities/user_process.entity';



@Entity('videos')
export class Video {
@PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ type: 'text', nullable: true })
  transcript_path: string; 

  @ManyToOne(() => Challenge, (challenge) => challenge.videos, { onDelete: 'CASCADE' })
  challenge: Challenge;

  // Liên kết với tiến trình người dùng
  @OneToMany(() => UserProcess, (userProcess) => userProcess.video)
  userProcesses: UserProcess[];


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

    // Liên kết với Comment (các bình luận thuộc video này)
    @OneToMany(() => Comment, (comment) => comment.video)
    comments: Comment[];
  

 
}
