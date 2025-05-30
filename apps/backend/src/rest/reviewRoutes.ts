import { Router } from "express";
import IReviewService from "../services/interfaces/reviewService";
import ReviewService from "../services/implementations/reviewService";
import { getErrorMessage } from "../utilities/errorUtils";

const reviewRouter: Router = Router();
const reviewService: IReviewService = new ReviewService();

reviewRouter.post("/", async (req, res) => {
  try {
    const newReview = await reviewService.createReview({
      //userId: req.body.user_id,
      clubId: req.body.club_id,
      comment: req.body.comment,
      likesClub: req.body.likes_club,
    });
    res.status(200).json(newReview);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
});

reviewRouter.get("/:clubId", async (req, res) => {
  try {
    const reviews = await reviewService.getReviewsByClubId(parseInt(req.params.clubId));
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
});

reviewRouter.put("/:id", async (req, res) => {
  const reviewId = parseInt(req.params.id);
  try {
    const updatedReview = await reviewService.updateReview(reviewId, {
      comment: req.body.comment ?? null,
      likesClub: req.body.likes_club ?? null,
      voteSum: req.body.vote_sum ?? null,
    });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
});

reviewRouter.delete("/:id", async (req, res) => {
  const reviewId = parseInt(req.params.id);
  try {
    await reviewService.deleteReview(reviewId);
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
});

reviewRouter.get("/sum/:clubId", async (req, res) => {
  try {
    const sum = await reviewService.getReviewSum(parseInt(req.params.clubId));
    console.log(sum);
    res.status(200).json(sum);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
});

reviewRouter.get("/percentage/:clubId", async (req, res) => {
  try {
    const percentage = await reviewService.getLikedPercentage(parseInt(req.params.clubId));
    console.log(percentage);
    res.status(200).json(percentage);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
});

export default reviewRouter;
