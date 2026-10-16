import { LoginAuthResponseDto, LoginUserDto } from "../dtos/login-user.dto.js";
import { RegisterUserDto, RegisterAuthResponseDto} from "../dtos/register.user.dto.js";

export interface IAuthService {
    loginUser(dto: LoginUserDto): Promise<LoginAuthResponseDto>;
    registerUser(dto: RegisterUserDto): Promise<RegisterAuthResponseDto>;
  }