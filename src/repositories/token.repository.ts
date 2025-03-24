import { IToken, ITokenDto } from '../interfaces/token.interface';
import { Token } from '../models/token.model';

class TokenRepository {
  public async createToken (dto: ITokenDto): Promise<IToken> {
    return await Token.create(dto);
  }

  public async findByParams (params: Partial<IToken>): Promise<IToken> {
    return await Token.findOne(params) as IToken;
  }
}
export const tokenRepository = new TokenRepository();
