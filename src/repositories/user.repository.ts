import { IUser } from 'interfaces/user.interface';
import { read, write } from '../services/fs.service';

class UserRepository {
  public async getAllUsers (): Promise<IUser[]> {
    return await read();
  }

  public async createUser (dto: Partial<IUser>): Promise<IUser> {
    const users = await read();
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: dto.name ?? '',
      email: dto.email ?? '',
      password: dto.password ?? ''
    };
    users.push(newUser);
    await write(users);
    return newUser;
  }

  public async getUserById (id: number): Promise<IUser | undefined> {
    const users = await read();
    return users.find((user) => user.id === id);
  }

  public async patchUser (userId: number, dto: Partial<IUser>): Promise<IUser> {
    const users = await read();
    const updatedUser = users.find((user) => user.id === userId);
    if (!updatedUser) {
      throw new Error('User not found');
    }

    if (dto.name) {
      updatedUser.name = dto.name;
    }

    if (dto.email) {
      if (!dto.email.includes('@')) {
        throw new Error('Invalid email format');
      }
      if (users.some((u) => u.email === dto.email && u.id !== updatedUser.id)) {
        throw new Error('Email already exists');
      }

      updatedUser.email = dto.email;
    }

    if (dto.password) {
      if (dto.password.length < 4) {
        throw new Error('Password must be at least 4 characters long');
      }
      updatedUser.password = dto.password;
    }

    await write(users);
    return updatedUser;
  }

  public async deleteUser (userId: number): Promise<void> {
    const users = await read();
    const index = users.findIndex((user) => user.id === userId);
    users.splice(index, 1)[0];
    await write(users);
  }
}

export const userRepository = new UserRepository();
