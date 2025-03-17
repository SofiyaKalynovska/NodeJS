import { IUser } from 'interfaces/user.interface';
import { read, write } from '../services/fs.service';

class UserRepository {
  public async getList (): Promise<IUser[]> {
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
}

export const userRepository = new UserRepository();
