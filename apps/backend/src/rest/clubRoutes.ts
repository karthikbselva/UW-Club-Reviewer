import { Router } from "express";
import IClubService from "../services/interfaces/clubService";
import ClubService from "../services/implementations/clubService";
import {
  createClubDTOValidator,
  updateClubDTOValidator,
} from "../middlewares/validators/clubValidators";
import { getErrorMessage } from "../utilities/errorUtils";

const clubRouter: Router = Router();
const clubService: IClubService = new ClubService();

clubRouter.post("/", createClubDTOValidator, async (req, res) => {
  try {
    const newClub = await clubService.createClub({
      name: req.body.name,
      description: req.body.description,
      competitionLevel: req.body.competitionLevel,
      skillLevel: req.body.skillLevel,
      schedule: req.body.schedule,
      social: req.body.socials,
      categories: req.body.categories,
    });
    res.status(200).send(newClub);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
});

clubRouter.get("/", async (req, res) => {
  try {
    const clubs = await clubService.getClubs();
    res.status(200).send(clubs);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
});

clubRouter.get("/:id", async (req, res) => {
  try {
    const clubId = parseInt(req.params.id);
    const club = clubService.getClubById(clubId);
    res.status(200).send(club);
  } catch (error) {
    res.status(400).json({ eror: getErrorMessage(error) });
  }
});

clubRouter.put("/:id", updateClubDTOValidator, async (req, res) => {
  const clubId = parseInt(req.params.id);

  try {
    const club = clubService.updateClub(clubId, {
      name: req.body.name ?? null,
      description: req.body.description ?? null,
      competitionLevel: req.body.competitionLevel ?? null,
      skillLevel: req.body.skillLevel ?? null,
      isActive: req.body.isActive ?? null,
      bannerPhoto: req.body.bannerPhoto ?? null,
      schedule: req.body.schedule ?? null,
      social: req.body.socials ?? null,
      categories: req.body.categories ?? null,
    });
    res.status(200).send(club);
  } catch (error) {
    res.status(400).json({ eror: getErrorMessage(error) });
  }
});

clubRouter.delete("/:id", async (req, res) => {
  const clubId = parseInt(req.params.id);

  try {
    clubService.deleteClub(clubId);
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ eror: getErrorMessage(error) });
  }
});

export default clubRouter;
