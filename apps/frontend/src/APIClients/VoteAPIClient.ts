import baseAPIClient from "./BaseAPIClient";
import { ReviewDTO, AddVoteDTO } from "../../types";

const create = async (formData: AddVoteDTO): Promise<ReviewDTO> => {
    try {
       const { data } = await baseAPIClient.post(`/votes`, formData); 
       return data;
    } catch (error) {
        throw new Error(
            `Failed to add vote. ${ error instanceof Error ? error.message : "Unknown error occured."}`
        )
    }
};

const remove = async (id: number): Promise<void> => {
    try {
       const { data } = await baseAPIClient.delete(`/votes/${id}`); 
    } catch (error) {
        throw new Error(
            `Failed to delete vote. ${ error instanceof Error ? error.message : "Unknown error occured."}`
        )
    }
};

export default { create, remove };