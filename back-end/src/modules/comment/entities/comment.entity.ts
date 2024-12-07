import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Video } from 'src/modules/videos/entities/video.entity';

@Entity('comments') // Đặt tên bảng là "comments"
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    content: string;

    // Liên kết với User (người viết bình luận)
    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Comment, comment => comment.parent)
    replies: Comment[];
    
    @ManyToOne(() => Comment, comment => comment.replies)
    parent: Comment;

    // Liên kết với Video (video mà bình luận thuộc về)
    @ManyToOne(() => Video, (video) => video.comments, { onDelete: 'CASCADE' })
    video: Video;

    @Column({ type: 'int', default: 0 })
    likeCount: number; // Số lượng like

    @Column({ type: 'int', default: 0 })
    dislikeCount: number; // Số lượng dislike

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
