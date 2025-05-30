import baseAPIClient from "./BaseAPIClient";
import { ReviewDTO, CreateReviewDTO, UpdateReviewDTO } from "../../types";

const get = async (id: number): Promise<ReviewDTO[]> => {
    try {
        const { data } = await baseAPIClient.get(`/reviews/${id}`);
        return data;
    } catch (error) {
        throw new Error(
            `Failed to get review with id ${id}. ${ error instanceof Error ? error.message : "Unknown error occured."}`
        )
    }
};

const getAll = async (): Promise<ReviewDTO[]> => {
    try {
        const { data } = await baseAPIClient.get(`/reviews`);
        return data;
    } catch (error) {
        throw new Error(
            `Failed to get reviews. ${ error instanceof Error ? error.message : "Unknown error occured."}`
        )
    }
};

const create = async (formData: CreateReviewDTO): Promise<ReviewDTO> => {
    try {
       const { data } = await baseAPIClient.post(`/reviews`, formData); 
       return data;
    } catch (error) {
        throw new Error(
            `Failed to create review. ${ error instanceof Error ? error.message : "Unknown error occured."}`
        )
    }
};

const update = async (id: number, formData: UpdateReviewDTO): Promise<ReviewDTO> => {
    try {
       const { data } = await baseAPIClient.post(`/reviews/${id}`, formData); 
       return data;
    } catch (error) {
        throw new Error(
            `Failed to update review. ${ error instanceof Error ? error.message : "Unknown error occured."}`
        )
    }
};

const remove = async (id: number): Promise<void> => {
    try {
       const { data } = await baseAPIClient.delete(`/reviews/${id}`); 
    } catch (error) {
        throw new Error(
            `Failed to delete review. ${ error instanceof Error ? error.message : "Unknown error occured."}`
        )
    }
};

const getReviewSum = async (clubId: number): Promise<void> => {
    try {
        const { data } = await baseAPIClient.get(`/reviews/sum/${clubId}`);
        return data;
    } catch (error) {
        throw new Error(`Failed to get review sum. ${ error instanceof Error ? error.message : "Unknown error occured."}`);
    }
}

const getLikedPercentage = async (clubId: number): Promise<void> => {
    try {
        const { data } = await baseAPIClient.get(`/reviews/percentage/${clubId}`);
        return data;
    } catch (error) {
        throw new Error(`Failed to get liked percentage. ${ error instanceof Error ? error.message : "Unknown error occured."}`);
    }
}

export default { get, getAll, create, update, remove, getReviewSum, getLikedPercentage };