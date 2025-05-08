import IVoteService from "../interfaces/voteService";
import VoteModel from "../../models/vote.model";

class VoteService implements IVoteService {
  // async addVote(review: AddVoteDTO) {}

  async getVoteSum(reviewId: number) {
    const sum = await VoteModel.sum("vote_value", {
      where: {
        review_id: reviewId,
      },
    });
    return sum;
  }

  // async removeVote(userId: number, reviewId: number): {}
}

export default VoteService;
