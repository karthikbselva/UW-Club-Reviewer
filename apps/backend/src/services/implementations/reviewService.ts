import { CreateReviewDTO, ReviewDTO, UpdateReviewDTO } from "../../../types";
import IReviewService from "../interfaces/reviewService";
import ReviewModel from "../../models/review.model";
import Review from "../../models/review.model";

class reviewService implements IReviewService {
    async createReview(review: CreateReviewDTO): Promise<ReviewDTO> {
        let newReview : ReviewModel;
        try {
            newReview = await ReviewModel.create({
                user_id: review.userId,
                club_id: review.clubId,
                comment: review.comment,
                is_liked: review.isLiked,
            })

        } catch (error) {
            throw error;
        }

        return {
            id: newReview.id,
            userId: newReview.user_id,
            clubId: newReview.club_id,
            comment: newReview.comment,
            isLiked: newReview.is_liked,
            helpfulVotes: newReview.helpful_votes,
        }
    }
   async getReviewByClubId(clubId: number): Promise<ReviewDTO[]> {
        let reviews : ReviewModel[];
        try {
            reviews = await ReviewModel.findAll({where: {club_id: clubId}})
        } catch (error) {
            throw error;
        }

        if(!reviews) {
            throw new Error(`Reviews with ClubId ${clubId} not found`)
        }

        return reviews.map((review) => ({
            id: review.id,
            userId: review.user_id,
            clubId: review.club_id,
            comment: review.comment,
            isLiked: review.is_liked,
            helpfulVotes: review.helpful_votes,
        }));
    }
    //getReviews(sortingField: "helpfulVotes" | "createdAt") : Promise<ReviewDTO[]> {

    //}
    async updateReview(reviewId: number, review: UpdateReviewDTO): Promise<ReviewDTO> {
        let existingReview : ReviewModel | null;

        try {
            existingReview = await ReviewModel.findByPk(reviewId);
        } catch (error) {
            throw error;
        }

        if(!existingReview) {
            throw new Error(`Review not found`)
        }

        try {
            await existingReview.update({
                comment: review.comment ?? existingReview.comment,
                is_liked: review.isLiked ?? existingReview.is_liked,
            });
        } catch (error) {
            throw error;
        }

        return {
            id: existingReview.id,
            userId: existingReview.user_id,
            clubId: existingReview.club_id,
            comment: existingReview.comment,
            isLiked: existingReview.is_liked,
            helpfulVotes: existingReview.helpful_votes,
        }
    }
    async deleteReview(reviewId: number): Promise<void> {
        let existingReview : ReviewModel | null;

        try {
            existingReview = await ReviewModel.findByPk(reviewId);
        } catch (error) {
            throw error;
        }

        if(!existingReview) {
            throw new Error(`Review not found`);
        }

        try {
            existingReview.destroy()
        } catch (error) {
            throw error;
        }
    }
}

export default reviewService