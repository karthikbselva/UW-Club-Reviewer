import { ReviewDTO, CreateReviewDTO, UpdateReviewDTO } from "../../../types";

interface IReviewService {
    createReview(review: CreateReviewDTO): Promise<ReviewDTO>;
    getReviewByClubId(clubId: number): Promise<ReviewDTO[]>;
    //getReviews(sortingField: "helpfulVotes" | "createdAt") : Promise<Array<ReviewDTO>>;
    updateReview(reviewId: number, review: UpdateReviewDTO): Promise<ReviewDTO>;
    deleteReview(reviewId: number): Promise<void>;
}

export default IReviewService;