import { Router } from "express";
import IReviewService from "../services/interfaces/reviewService";
import ReviewService from "../services/implementations/reviewService";
import { getErrorMessage } from "../utilities/errorUtils";

const reviewRouter : Router = Router();
const reviewService : IReviewService = new ReviewService();

reviewRouter.post("/", async (req, res) => {
    try {
        const newReview = reviewService.createReview({
            userId: req.body.user_id,
            clubId: req.body.club_id,
            comment: req.body.comment,
            isLiked: req.body.is_liked,
        });
        res.status(200).send(newReview);
    } catch (error) {
        res.status(400).json({ error : getErrorMessage(error) });
    }
});

reviewRouter.get("/:club_id", async (req, res) => {
    try {
        const reviews = reviewService.getReviewsByClubId(req.body.club_id);
        res.status(200).send(reviews);

    } catch (error) {
        res.status(400).json({ error : getErrorMessage(error) });
    }
});

reviewRouter.put("/:id", async (req, res) => {
    const reviewId = parseInt(req.params.id);
    try {
        const updatedReview = reviewService.updateReview(reviewId, {
            comment: req.body.comment ?? null,
            isLiked: req.body.is_liked ?? null,
            helpfulVotes: req.body.helpful_votes ?? null,
        });
        res.status(200).send(updatedReview);
    } catch (error) {
        res.status(400).json({ error : getErrorMessage(error) });
    }
})

reviewRouter.delete("/:id", async (req, res) => {
    const reviewId = parseInt(req.params.id);
    try {
        const updatedReview = reviewService.deleteReview(reviewId);
        res.status(200).send();
    } catch (error) {
        res.status(400).json({ error : getErrorMessage(error) });
    }
})