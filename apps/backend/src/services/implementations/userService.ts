import { CreateUserDTO, UpdateUserDTO, UserDTO } from "../../../types";
import IUserService from "../interfaces/userService";
import UserModel from "../../models/user.model";
import { genSaltSync, hashSync } from "bcrypt-ts";
import Password from "../../models/password.model";
const salt = genSaltSync(10);

class UserService implements IUserService {
    async createUser(user: CreateUserDTO): Promise<UserDTO> {
        let newUser: UserModel;
        try {
            const hashedPassword = hashSync(user.newPassword.password_hash, salt);
            newUser = await UserModel.create({
                email: user.email,
                first_name: user.firstName,
                last_name: user.lastName,
                program_name: user.programName,
                term_of_study: user.termOfStudy,
                password_hash: {
                    user_id: user.newPassword.user_id,
                    password_hash: hashedPassword,
                }
            },
                {
                    include: [{
                        association: UserModel.associations.password_hash,
                    }],
                }

            )
        } catch (error) {
            throw error;
        }

        return {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.first_name,
            lastName: newUser.last_name,
            programName: newUser.program_name,
            termOfStudy: newUser.term_of_study,
            profilePhoto: newUser.profile_photo,
        }
    }
    async getUserById(userId: number): Promise<UserDTO> {
        let existingUser: UserModel | null;

        try {
            existingUser = await UserModel.findByPk(userId);
        } catch (error) {
            throw error;
        }

        if (!existingUser) {
            throw new Error("User not found");
        }

        if (!existingUser.profile_photo) {
            return {
                id: existingUser.id,
                email: existingUser.email,
                firstName: existingUser.first_name,
                lastName: existingUser.last_name,
                programName: existingUser.program_name,
                termOfStudy: existingUser.term_of_study,
                profilePhoto: "Default Profile Pic Here"
            }
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

    async updateUser(userId: number, user: UpdateUserDTO): Promise<UserDTO> {
        let existingUser: UserModel | null;
        let existingPassword: Password | null;
        try {
            existingPassword = await Password.findOne({ where: { userId: userId } })
            existingUser = await UserModel.findByPk(userId);
        } catch (error) {
            throw error;
        }

        if (!existingUser) {
            throw new Error("User not found");
        }

        if (!existingPassword) {
            throw new Error("No Password found")
        }

        try {
            if (existingPassword) {
                const updatedHashedPassword = hashSync(user.updatedPassword.password_hash, salt);
                await existingPassword.update({
                    password_hash: updatedHashedPassword,
                })
            } else {
                existingPassword = null;
            }

            await existingUser.update(
                {
                    first_name: user.firstName ?? existingUser.first_name,
                    last_name: user.lastName ?? existingUser.first_name,
                    term_of_study: user.termOfStudy ?? existingUser.term_of_study,
                    program_name: user.programName ?? existingUser.program_name,
                    profile_picture: user.profilePhoto ?? existingUser.profile_photo,
                    password_hash: existingPassword ?? existingUser.password_hash,
                }
            )
        } catch (error) {
            throw error;
        }

        return {
            id: existingUser.id,
            email: existingUser.email,
            firstName: existingUser.first_name,
            lastName: existingUser.last_name,
            programName: existingUser.program_name,
            profilePhoto: existingUser.profile_photo,
            termOfStudy: existingUser.term_of_study,
        }

    }

    async deleteUser(userId: number): Promise<void> {
        let existingUser: UserModel | null;
        try {
            existingUser = await UserModel.findByPk(userId);
        } catch (error) {
            throw error;
        }

        if (!existingUser) {
            throw new Error("User not found");
        }

        try {
            existingUser.destroy();
        } catch (error) {
            throw error;
        }
    }
}