import { HttpException, HttpStatus, Injectable } from '@nestjs/common'; // Import Injectable từ NestJS, cho phép đánh dấu class này là một service
import { Repository } from 'typeorm'; // Import Repository từ TypeORM để làm việc với database
import { User } from '../auth/entities/user.entity';
import { Role } from '../auth/entities/role.entity'; // Import User entity để thao tác với bảng 'users' trong database
import { InjectRepository } from '@nestjs/typeorm'; // Import InjectRepository từ TypeORM để inject User repository
import * as bcrypt from 'bcrypt'; // Import bcrypt để mã hóa mật khẩu người dùng
import { RegisterUserDTO } from './dto/register-user.dto'; // Import RegisterUserDTO để định dạng và xác thực dữ liệu đầu vào
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { GoogleUserDTO } from './dto/google.dto';


// Đánh dấu class là một service có thể được chèn vào các phần khác của ứng dụng
@Injectable()
export class AuthService {

    // Inject User repository vào service, cho phép thao tác với bảng 'users' trong database
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        private jwtService: JwtService

    ) { }

    // Phương thức này nhận dữ liệu từ RegisterUserDTO, mã hóa mật khẩu, và lưu người dùng mới vào cơ sở dữ liệu
    async register(registerUserDTO: RegisterUserDTO): Promise<User> {
        // Gọi phương thức hashPassword để mã hóa mật khẩu
        const hashPassword = await this.hashPassword(registerUserDTO.password);
        // Gán roleId mặc định là 2 nếu không được chỉ định
        const roleId = registerUserDTO.roleId || 2;

        // Tìm vai trò theo ID
   
        // Lưu thông tin người dùng vào database, bao gồm mật khẩu đã mã hóa và refresh_token
        return await this.userRepository.save({
            ...registerUserDTO,
            username: registerUserDTO.username,// Sao chép tất cả các thuộc tính từ RegisterUserDTO
            refresh_token: "reresasdasd", // Thêm refresh_token (có thể là một giá trị ngẫu nhiên hoặc cố định)
            password: hashPassword, // Thay thế mật khẩu bằng mật khẩu đã mã hóa
            roleId,
        });
    }
    // Phương thức private để mã hóa mật khẩu bằng bcrypt
    private async hashPassword(password: string): Promise<string> {
        const saltRound = 10; // Định nghĩa số vòng salt cho bcrypt
        const salt = await bcrypt.genSalt(saltRound); // Tạo salt mới với số vòng salt đã định nghĩa
        const hash = await bcrypt.hash(password, salt); // Mã hóa mật khẩu với salt vừa tạo
        return hash; // Trả về mật khẩu đã mã hóa
    }



    //Chức năng login
    async login(loginUserDTO: LoginUserDTO): Promise<any> {
        //Tìm kiếm người dùng trong cơ sở dữ liệu dựa trên email được cung cấp
        const user = await this.userRepository.findOne({
            where: { email: loginUserDTO.email }, relations: ['role']
        });
        if (!user) {
            throw new HttpException("Email is not exist", HttpStatus.UNAUTHORIZED);
        }
        //So sánh mật khẩu mà người dùng cung cấp với mật khẩu đã mã hóa (hashed) lưu trong cơ sở dữ liệu
        const checkPass = bcrypt.compareSync(loginUserDTO.password, user.password)
        if (!checkPass) {
            throw new HttpException("Password is not correct", HttpStatus.UNAUTHORIZED);
        }
        //tạo access token và refress token
        //Nếu email và mật khẩu hợp lệ, tạo một payload chứa thông tin cơ bản của người dùng, 
        //bao gồm id và email. Payload này sẽ được sử dụng để tạo JWT.
        // Thêm roleId vào payload
        const roleIds = user.role ? [user.role.id] : [];
        const payload = { id: user.id, username: user.username, email: user.email, roleIds };
        return this.generateToken(payload);
    }


    private async generateToken(payload: { id: number; email: string; roleIds: number[] }) {
        const access_token = await this.jwtService.signAsync(payload);
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: '123456',
            expiresIn: '1d',
        });

        // Cập nhật refresh token cho người dùng
        await this.userRepository.update(
            { email: payload.email },
            { refresh_token: refresh_token },
        );

        return { access_token, refresh_token };
    }

       async refreshToken(refresh_token: string): Promise<any> {
        try {
            const verifiedPayload = await this.jwtService.verifyAsync(refresh_token, { secret: '123456' });
            const user = await this.userRepository.findOne({
                where: { email: verifiedPayload.email, refresh_token },
                relations: ['role'],
            });

            if (!user) {
                throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST);
            }

            const roleIds = user.role ? [user.role.id] : [];
            return this.generateToken({ id: user.id, email: user.email, roleIds });
        } catch (error) {
            throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST);
        }
    }

     // Hàm đăng nhập với Google
  async googleLogin(googleUserData: GoogleUserDTO): Promise<any> {
    try {
      // Kiểm tra người dùng đã tồn tại trong cơ sở dữ liệu chưa
      let user = await this.userRepository.findOne({
        where: [
          { googleId: googleUserData.googleId },
          { email: googleUserData.email }
        ],
        relations: ['role'],
      });

      if (!user) {
        // Tạo người dùng mới nếu chưa có
        user = await this.userRepository.save({
          username: googleUserData.username,
          email: googleUserData.email,
          googleId: googleUserData.googleId,
          password: await this.hashPassword(Math.random().toString(36)), // Mật khẩu ngẫu nhiên cho người dùng Google
          refresh_token: "",
          role: { id: 2 }, // Vai trò mặc định cho người dùng Google
        });
       
      }

      // Tạo token cho người dùng
      const roleIds = user.role ? [user.role.id] : [];
      const payload = { id: user.id, username: user.username, email: user.email, roleIds};
      return this.generateToken(payload);
    } catch (error) {
      throw new Error('Google authentication failed');
    }
  }
    

}
