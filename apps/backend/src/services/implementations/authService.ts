import { UserDTO, TokenDTO } from "../../../types";
import IAuthService from "../interfaces/authService";
const jwt = require('jsonwebtoken');
require('dotenv').config()

class AuthService implements IAuthService {
    async generateToken(user: UserDTO): Promise<TokenDTO> {
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'});
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresIn: 24,
        }
    }
}