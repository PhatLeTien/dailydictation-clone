import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Video } from '../../videos/entities/video.entity';

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'int' })
  duration: number; // số ngày học cho challenge

  @Column({
    type: 'enum',
    enum: ['Spelling', 'Dictation'],
    nullable: false, // Trường không được phép null
  })
  type: 'Spelling' | 'Dictation'; // Xác định loại challenge là chính tả hay nghe viết

  @OneToMany(() => Video, (video) => video.challenge)
  videos: Video[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
