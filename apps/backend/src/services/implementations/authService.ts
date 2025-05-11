import { UserDTO, TokenDTO, AuthDTO } from "../../../types";
import IAuthService from "../interfaces/authService";
const jwt = require('jsonwebtoken');
require('dotenv').config()

class AuthService implements IAuthService {
    async generateToken(user: UserDTO): Promise<TokenDTO> {
        const accessToken = jwt.sign({userId: user.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'});
        const refreshToken = jwt.sign({userId: user.id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '24h'});
        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresIn: 24,
        }
    }

    async renewToken(auth: AuthDTO): Promise<TokenDTO> {
        let payload;
        
        try {
            payload = jwt.verify(auth.token.refreshToken, process.env.REFRESH_TOKEN_SECRET);
        } catch (error) {
            throw error;
        }

        const userId = payload.userId;

        const newAccessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'});
        const newRefreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '24h'});

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            expiresIn: 24,
        }
    }
}