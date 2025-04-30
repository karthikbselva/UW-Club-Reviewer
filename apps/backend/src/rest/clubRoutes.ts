import { Router } from "express";
import IClubService from "../services/interfaces/clubService";
import ClubService from "../services/implementations/clubService";
import { createClubDTOValidator } from "../middlewares/validators/clubValidators";
import { getErrorMessage } from "../utilities/errorUtils";

const clubRouter : Router = Router();
const clubService : IClubService = new ClubService();

clubRouter.post("/", createClubDTOValidator, async (req, res) => {
    try {
        const newClub = clubService.createClub({
            name: req.body.name,
            description: req.body.description,
            competitionLevel: req.body.competitionLevel,
            skillLevel: req.body.skillLevel,
            clubCategories: req.body.clubCategories,
            activeTerms: req.body.activeTerms,
            daysOfOperation: req.body.daysOfOperation,
        });
        res.status(200).send(newClub);
    } catch (error) {
        res.status(400).json({ error : getErrorMessage(error) });
    }
});

export default clubRouter;
