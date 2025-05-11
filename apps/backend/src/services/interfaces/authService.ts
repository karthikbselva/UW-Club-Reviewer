import { TokenDTO, UserDTO } from "../../../types";


interface IAuthService {
    generateToken(user: UserDTO): Promise <TokenDTO>;
    //renewToken() : Promise<void>;
    //revokeToken() : Promise <void>;
    //resetPassword() : Promise<void>;
    //login() : Promise<UserDTO>;
    //logout() : Promise <void>;
}

export default IAuthService;