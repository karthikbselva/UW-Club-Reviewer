import { UserDTO, TokenDTO, AuthDTO } from "../../../types";
import IAuthService from "../interfaces/authService";
const jwt = require('jsonwebtoken');
import UserModel from "../../models/user.model";
import Password from "../../models/password.model";
import bcrypt from "bcrypt-ts";

require('dotenv').config()

class AuthService implements IAuthService {
    async generateToken(user: UserDTO): Promise<TokenDTO> {

        const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        const refreshToken = await jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '24h'});

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
        }
    }

    async renewToken(auth: AuthDTO): Promise<TokenDTO> {
        let payload;

        try {
            payload = await jwt.verify(auth.token.refreshToken, process.env.REFRESH_TOKEN_SECRET);
        } catch (error) {
            throw error;
        }

        if(!payload) {
            throw new Error("Token expired");
        }
        
        const newAccessToken = await jwt.sign(auth.user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        const newRefreshToken = await jwt.sign(auth.user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '24h'});

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        }
    }
    
    async login(email: string, password: string): Promise<UserDTO> {
        let existingUser : UserModel | null;


        try {
            existingUser = await UserModel.findOne({where: {email: email}});
        } catch (error) {
            throw error;
        }

        if(!existingUser) {
            throw new Error("User with email not found");
        }

        let userPassword : Password | null;

        try {
            userPassword = await Password.findOne({where: {userId: existingUser.id}})
        } catch (error) {
           throw error;
        }

        if(!userPassword) {
            throw new Error ("User does not have password stored");
        }

        let isMatch;
        try {
            isMatch = await bcrypt.compare(password, userPassword.password_hash);
        } catch (error) {
            throw error;
        }

        if(!isMatch) {
            throw new Error("Password did not match");
        }

        return {
            id: existingUser.id,
            email: existingUser.email,
            firstName: existingUser.first_name,
            lastName: existingUser.last_name,
            programName: existingUser.program_name,
            termOfStudy: existingUser.term_of_study,
            profilePhoto: existingUser.profile_photo,
        }
    }
}