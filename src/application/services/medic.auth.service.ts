import prisma from '../../infrastructure/database/prisma.client.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterAuthResponseDto, RegisterUserDto } from '../dtos/register.user.dto.js';
import { LoginAuthResponseDto, LoginUserDto } from '../dtos/login-user.dto.js';
import { IUserRepository } from '../../domain/repositories/medic.user.repository.js';

export class MedicAuthService {
    constructor(private readonly userRepository: IUserRepository) {}

    registerUser = async (dto: RegisterUserDto): Promise<RegisterAuthResponseDto> => {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const newUser = await this.userRepository.create({
            email: dto.email,
            password: hashedPassword,
            name: dto.name,
            role: 'USER'
        })

        return newUser;
    }

    loginUser = async (dto: LoginUserDto): Promise<LoginAuthResponseDto> => {
        const user = await this.userRepository.findByEmail(dto.email);

        if(!user) throw new Error("Invalid email or password");

        const passwordValid = await bcrypt.compare(dto.password, user.password );

        if(!passwordValid) throw new Error("Invalid email or password");

        const secretKey = process.env.JWT_SECRET;

        if(!secretKey) throw new Error("JWT_SECRET environment variable is not defined");

        const token = jwt.sign(
            { id: user.id, role: user.role},
            secretKey,
            { expiresIn: '4h'}
        )

        return {token};
    }

}
