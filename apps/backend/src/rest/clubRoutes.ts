import { Router } from "express";
import IClubService from "../services/interfaces/clubService";
import ClubService from "../services/implementations/clubService";
import IReviewService from "../services/interfaces/reviewService";
import { createClubDTOValidator, updateClubDTOValidator } from "../middlewares/validators/clubValidators";
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

clubRouter.get("/", async (req, res) => {
    try {
        const clubs = clubService.getClubs();
        res.status(200).send(clubs);

    } catch (error) {
        res.status(400).json({ error : getErrorMessage(error) });
    }
});

clubRouter.get("/:id", async (req, res) => {
    try {
        const clubId = parseInt(req.params.id);
        const club = clubService.getClubById(clubId);
        res.status(200).send(club);
    } catch (error) {
        res.status(400).json({eror: getErrorMessage(error) })
    }
})

clubRouter.put("/:id", updateClubDTOValidator, async (req, res) => {
    const clubId = parseInt(req.params.id);

    try {
        const club = clubService.updateClub(clubId, req.body);
        res.status(200).send(club);
    } catch (error) {
        res.status(400).json({eror: getErrorMessage(error) })
    }
})

clubRouter.delete("/:id", async (req, res) => {
    const clubId = parseInt(req.params.id);

    try {
        clubService.deleteClub(clubId);
        res.status(200).send();
    } catch (error) {
        res.status(400).json({eror: getErrorMessage(error) })
    }


})

export default clubRouter;
