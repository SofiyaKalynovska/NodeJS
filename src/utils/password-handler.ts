import * as bcrypt from 'bcrypt';

class PasswordHandler {
  public async hashPassword (password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  public async comparePasswords (
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export const passwordHandler = new PasswordHandler();
