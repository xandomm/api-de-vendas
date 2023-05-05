import jwt from 'jsonwebtoken';
const REFRESH_TOKEN_SECRET = 'secret';
const JWT_SECRET = 'secret';
const ACCESS_TOKEN_EXPIRATION_TIME = '1m';
interface IRefresh_token {
  refresh_token: string;
}

interface IToken {
  token: string;
}
class RefreshTokenService {
  public refresh(refresh_token) {
    try {
      const decoded = jwt.verify(refresh_token, REFRESH_TOKEN_SECRET);
      const token = jwt.sign(
        { user_id: decoded.user_id, email: decoded.email },
        JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRATION_TIME },
      );
      return { token };
    } catch (error) {
      console.log(error);
    }
  }
}

export default RefreshTokenService;
