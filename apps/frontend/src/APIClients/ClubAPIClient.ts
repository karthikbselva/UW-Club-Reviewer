import baseAPIClient from "./BaseAPIClient";
import { ClubDTO, CreateClubDTO, UpdateClubDTO } from "../../../types";

const get = async (id: number): Promise<ClubDTO> => {
    try {
        const { data } = await baseAPIClient.get(`/clubs/${id}`);
        return data;
    } catch (error) {
        throw new Error(
            `Failed to get club with id ${id}. ${ error instanceof Error ? error.message : "Unknown error occured."}`
        )
    }
};

const getAll = async (): Promise<ClubDTO[]> => {
    try {
        const { data } = await baseAPIClient.get(`/clubs`);
        return data;
    } catch (error) {
        throw new Error(
            `Failed to get clubs. ${ error instanceof Error ? error.message : "Unknown error occured."}`
        )
    }
};

const create = async (formData: CreateClubDTO): Promise<ClubDTO> => {
    try {
       const { data } = await baseAPIClient.post(`/clubs`, formData); 
       return data;
    } catch (error) {
        throw new Error(
            `Failed to create club. ${ error instanceof Error ? error.message : "Unknown error occured."}`
        )
    }
};

const update = async (id: number, formData: UpdateClubDTO): Promise<ClubDTO> => {
    try {
       const { data } = await baseAPIClient.post(`/clubs/${id}`, formData); 
       return data;
    } catch (error) {
        throw new Error(
            `Failed to update club. ${ error instanceof Error ? error.message : "Unknown error occured."}`
        )
    }
};

const remove = async (id: number): Promise<void> => {
    try {
       const { data } = await baseAPIClient.delete(`/clubs/${id}`); 
    } catch (error) {
        throw new Error(
            `Failed to delete club. ${ error instanceof Error ? error.message : "Unknown error occured."}`
        )
    }
};

export default { get, getAll, create, update, remove };