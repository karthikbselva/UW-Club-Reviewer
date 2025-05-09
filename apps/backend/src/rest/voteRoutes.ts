import { Router } from "express";
import IVoteService from "../services/interfaces/voteService";
import VoteService from "../services/implementations/voteService";
import { getErrorMessage } from "../utilities/errorUtils";
import IReviewService from "../services/interfaces/reviewService";
import ReviewService from "../services/implementations/reviewService";

const voteRouter : Router = Router();
const voteService : IVoteService = new VoteService();

const reviewRouter : Router = Router();
const reviewService : IReviewService = new ReviewService();


voteRouter.post("/votes", async (req, res) => {
    try {
        const newVote = voteService.addVote({
            userId: req.body.user_id,
            reviewId: req.body.review_id,
            voteValue: req.body.vote_value,
        })
        res.status(200).send(newVote);
        const existingReview = reviewService.updateReview(req.body.review_id, {
            comment: null,
            likesClub: null,
            voteSum: await voteService.getVoteSum(req.body.review_id),
        })
        res.status(200).send(existingReview);
    } catch (error) {
        res.status(400).json({ error : getErrorMessage(error) });
    }
    
})

voteRouter.delete("/votes/:userId/:reviewId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    const reviewId = parseInt(req.params.reviewId);

    try {
        voteService.removeVote(userId, reviewId);
        res.status(200).send();
    } catch (error) {
        res.status(400).json({ error : getErrorMessage(error) });
    }
})