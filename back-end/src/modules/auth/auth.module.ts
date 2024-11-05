import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Role } from './entities/role.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]), // Cung cấp repository cho entity User
    JwtModule.register({
      global: true,
      secret: '123456',
      signOptions:{expiresIn:'1h'}
    })
  ],
  controllers: [AuthController], // Đăng ký controller
  providers: [AuthService] // Đăng ký service
})
export class AuthModule {}
