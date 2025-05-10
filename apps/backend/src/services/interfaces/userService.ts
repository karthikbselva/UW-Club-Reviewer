import { UserDTO, CreateUserDTO, UpdateUserDTO, CreatePasswordDTO } from "../../../types";

interface IUserService {
    createUser(user: CreateUserDTO, password: CreatePasswordDTO): Promise<UserDTO>;
    //registerUser(email: string, password: string): Promise<UserDTO>;
    getUserById(userId: number): Promise<UserDTO>;
    updateUser(userId: number, user: UpdateUserDTO): Promise<UserDTO>;
    deleteUser(userId: number): Promise<void>; 
}

export default IUserService;