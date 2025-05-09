import { ReviewDTO, CreateReviewDTO, UpdateReviewDTO } from "../../../types";

interface IReviewService {
  createReview(reviewDTO: CreateReviewDTO): Promise<ReviewDTO>;
  getReviewsByClubId(clubId: number): Promise<ReviewDTO[]>;
  //getReviews(sortingField: "helpfulVotes" | "createdAt") : Promise<Array<ReviewDTO>>;
  updateReview(reviewId: number, revieDTO: UpdateReviewDTO): Promise<ReviewDTO>;
  deleteReview(reviewId: number): Promise<void>;
}

export default IReviewService;
