import { IUser } from 'interfaces/user.interface';
import { userRepository } from '../repositories/user.repository';

class UserService {
  public async getList (): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create (dto: IUser): Promise<IUser> {
    return await userRepository.createUser(dto);
  }
}

export const userService = new UserService();