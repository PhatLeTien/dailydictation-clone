import { Body, Post, Controller } from '@nestjs/common';
import { RegisterUserDTO } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from '../auth/entities/user.entity';
import { LoginUserDTO } from './dto/login-user.dto';

//Xác định controller cho các yêu cầu đến route /auth.
@Controller('auth')
export class AuthController {


//Điều này cho phép bạn gọi các phương thức của AuthService từ AuthController
constructor(private authService: AuthService){}

//Đánh dấu phương thức register để xử lý các yêu cầu POST đến route /auth/register.
    @Post('register')
    //Lấy dữ liệu từ yêu cầu HTTP và ánh xạ nó vào đối tượng RegisterUserDTO.
    register(@Body() registerUserDTO:RegisterUserDTO):Promise<User>{
        console.log('register api')
        console.log(registerUserDTO)
        //Gọi phương thức register của AuthService để thực hiện logic đăng ký và trả về đối tượng User.
        return this.authService.register(registerUserDTO);
    }

    @Post('login')
    login(@Body() loginUserDTO: LoginUserDTO):Promise<any>{
        console.log("login api");
        console.log(loginUserDTO);

        return this.authService.login(loginUserDTO)
        
    }


    @Post('refresh-token')
    refreshToken(@Body(){refresh_token}):Promise<any>{
        console.log('refresh token api');
      return this.authService.refreshToken(refresh_token)
    }
    
    
}
