import bcrypt from 'bcryptjs';
import type { LoginInput, SessionUser } from '../../shared/dto';
import { AppDataSource } from '../db/data-source';
import { UserEntity } from '../entities/user.entity';
import { mapUserSession } from '../mappers';

let currentSession: SessionUser | null = null;

export class AuthService {
  async login(input: LoginInput) {
    const repository = AppDataSource.getRepository(UserEntity);
    const user = await repository.findOne({ where: { username: input.username.trim() } });

    if (!user) {
      throw new Error('Usuario o contrasena incorrectos.');
    }

    const isValid = await bcrypt.compare(input.password, user.passwordHash);

    if (!isValid) {
      throw new Error('Usuario o contrasena incorrectos.');
    }

    currentSession = mapUserSession(user);
    return currentSession;
  }

  async logout() {
    currentSession = null;
    return true;
  }

  async getSession() {
    return currentSession;
  }
}
