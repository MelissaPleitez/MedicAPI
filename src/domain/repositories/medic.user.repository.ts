import { UserEntity } from '../entities/medic.user.entity.js';

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  create(user: Omit<UserEntity, 'id'>): Promise<UserEntity>;
}