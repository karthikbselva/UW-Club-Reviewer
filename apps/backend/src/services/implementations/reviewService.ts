import { CreateReviewDTO, ReviewDTO, UpdateReviewDTO } from "../../../types";
import IReviewService from "../interfaces/reviewService";
import ReviewModel from "../../models/review.model";

class reviewService implements IReviewService {
  async createReview(reviewDTO: CreateReviewDTO): Promise<ReviewDTO> {
    const newReview = await ReviewModel.create({
      user_id: reviewDTO.userId,
      club_id: reviewDTO.clubId,
      comment: reviewDTO.comment,
      likes_club: reviewDTO.likesClub,
    });

    return {
      id: newReview.id,
      userId: newReview.user_id,
      clubId: newReview.club_id,
      comment: newReview.comment,
      likesClub: newReview.likes_club,
      voteSum: newReview.vote_sum,
    };
  }
  async getReviewsByClubId(clubId: number): Promise<ReviewDTO[]> {
    const reviews = await ReviewModel.findAll({ where: { club_id: clubId } });

    if (!reviews) {
      throw new Error(`Reviews with ClubId ${clubId} not found`);
    }

    return reviews.map((review) => ({
      id: review.id,
      userId: review.user_id,
      clubId: review.club_id,
      comment: review.comment,
      likesClub: review.likes_club,
      voteSum: review.vote_sum,
    }));
  }
  //getReviews(sortingField: "voteSum" | "createdAt") : Promise<ReviewDTO[]> {

  //}
  async updateReview(
    reviewId: number,
    reviewDTO: UpdateReviewDTO,
  ): Promise<ReviewDTO> {
    const existingReview = await ReviewModel.findByPk(reviewId);

    if (!existingReview) {
      throw new Error(`Review not found`);
    }

    await existingReview.update({
      comment: reviewDTO.comment ?? existingReview.comment,
      likes_club: reviewDTO.likesClub ?? existingReview.likes_club,
      vote_sum: reviewDTO.voteSum ?? existingReview.vote_sum,
    });

    return {
      id: existingReview.id,
      userId: existingReview.user_id,
      clubId: existingReview.club_id,
      comment: existingReview.comment,
      likesClub: existingReview.likes_club,
      voteSum: existingReview.vote_sum,
    };
  }

  async deleteReview(reviewId: number): Promise<void> {
    const existingReview = await ReviewModel.findByPk(reviewId);

    if (!existingReview) {
      throw new Error(`Review not found`);
    }

    existingReview.destroy();
  }
}

export default reviewService;
