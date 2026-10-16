export interface RegisterUserDto {
    email: string;
    name: string;
    password: string;
    
}

export interface RegisterAuthResponseDto {
    email: string;
    password: string;
    name: string | null;
    role: string
}