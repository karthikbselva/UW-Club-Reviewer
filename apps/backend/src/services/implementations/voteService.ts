import IVoteService from "../interfaces/voteService";
import VoteModel from "../../models/vote.model";
import { AddVoteDTO, VoteDTO } from "../../../../types";

class VoteService implements IVoteService {
   async addVote(review: AddVoteDTO): Promise<VoteDTO> {
      let newVote : VoteModel;
      try {
        newVote = await VoteModel.create({
            user_id: review.userId,
            review_id: review.reviewId,
            vote_value: review.voteValue
        })
      } catch (error) {
        throw error;
      }

      return {
        id: newVote.id,
        userId: newVote.user_id,
        reviewId: newVote.review_id,
        voteValue: newVote.vote_value,
      }
   }

  async getVoteSum(reviewId: number) {
    const sum = await VoteModel.sum("vote_value", {
      where: {
        review_id: reviewId,
      },
    });
    return sum;
  }

  async removeVote(userId: number, reviewId: number): Promise<void> {
    let existingVote : VoteModel | null; 
    try {
      existingVote = await VoteModel.findOne({where: {review_id: reviewId, user_id: userId}})
    } catch (error) {
      throw error;
    }
    if(!existingVote) {
      throw new Error("Vote not found");
    }
 
    existingVote.destroy();
  }
}

export default VoteService;
