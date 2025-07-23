import {Router} from "express"
import IUserService from "../services/interfaces/userService";
import UserService from "../services/implementations/userService";
import { getErrorMessage } from "../utilities/errorUtils";

const userRouter: Router = Router();
const userService: IUserService = new UserService();

userRouter.get("/:userId", async (req, res) => {
    try {
        const user = await userService.getUserById(parseInt(req.params.userId));
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: "User Not Found"});
    }
})


