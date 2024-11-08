// src/modules/users/entities/user.entity.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Role } from '../entities/role.entity'; // Chỉnh sửa đường dẫn nếu cần

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    username: string;

    @Column({ length: 255 })
    email: string;

    @Column()
    password: string;

    @Column()
    refresh_token: string;

    @Column({ nullable: true })
    googleId?: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    // Many-to-One relation with Role
    @ManyToOne(() => Role, (role) => role.users)
    role: Role; // Thay đổi từ 'roles' sang 'role'
}
