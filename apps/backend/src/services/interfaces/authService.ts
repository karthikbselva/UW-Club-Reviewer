import { AuthDTO, TokenDTO, UserDTO } from "../../../types";


interface IAuthService {
    generateToken(user: UserDTO): Promise <TokenDTO>;
    renewToken(auth: AuthDTO) : Promise<TokenDTO>;
    //revokeToken() : Promise <void>;
    //resetPassword() : Promise<void>;
    login(email: string, password: string) : Promise<UserDTO>;
    //logout() : Promise <void>;
}

export default IAuthService;