import { IUserRepository } from '../../domain/repositories/medic.user.repository.js';
import { UserEntity } from '../../domain/entities/medic.user.entity.js';
import prisma from '../database/prisma.client.js';

export class UserRepositoryImpl implements IUserRepository {
  
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) return null;

    return new UserEntity(
      user.id,
      user.email,
      user.name,
      user.password,
      user.role
    );
  }

  async create(userData: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    const newUser = await prisma.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: userData.role
      }
    });

    return new UserEntity(
      newUser.id,
      newUser.email,
      newUser.name,
      newUser.password,
      newUser.role
    );
  }
}