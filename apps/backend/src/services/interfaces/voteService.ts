import { VoteDTO, AddVoteDTO } from "../../../types";

interface IVoteService {
  addVote(review: AddVoteDTO): Promise<VoteDTO>;
  getTotalVotes(reviewId: number): Promise<number>;
  removeVote(userId: number, reviewId: number): Promise<void>;
}

export default IVoteService;
