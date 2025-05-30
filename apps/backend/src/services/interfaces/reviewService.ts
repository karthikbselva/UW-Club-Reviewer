import { ReviewDTO, CreateReviewDTO, UpdateReviewDTO } from "../../../types";

interface IReviewService {
  createReview(reviewDTO: CreateReviewDTO): Promise<ReviewDTO>;
  getReviewsByClubId(clubId: number): Promise<ReviewDTO[]>;
  getReviewSum(clubId: number): Promise<number>;
  getLikedPercentage(clubId: number): Promise<number>;
  //getReviews(sortingField: "voteSum" | "createdAt") : Promise<Array<ReviewDTO>>;
  updateReview(reviewId: number, revieDTO: UpdateReviewDTO): Promise<ReviewDTO>;
  deleteReview(reviewId: number): Promise<void>;
}

export default IReviewService;
