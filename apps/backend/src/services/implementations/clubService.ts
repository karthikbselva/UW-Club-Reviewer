import IClubService from "../interfaces/clubService";
import {
    ClubDTO,
    CreateClubDTO,
    UpdateClubDTO,
    // ClubCategory,
    // SemesterEnum,
    // DayEnum
} from "../../../types";
import ClubModel from "../../models/club.model";


class ClubService implements IClubService {
    async createClub(club: CreateClubDTO): Promise<ClubDTO> {
        let newClub : ClubModel;
        try {
            newClub = await ClubModel.create({
                name: club.name,
                description: club.description,
                competitionLevel: club.competitionLevel,
                skillLevel: club.skillLevel,
                clubCategories: club.clubCategories,
                isActive: true,
                activeTerms: club.activeTerms,
                daysOfOperation: club.daysOfOperation,
                bannerPhoto: "",
            });
        } catch (error) {
            throw error;
        } 

        return {
            id: newClub.id,
            name: newClub.name,
            description: newClub.description,
            competitionLevel: newClub.competition_level,
            skillLevel: newClub.skill_level,
            clubCategories: newClub.club_categories,
            isActive: newClub.is_active,
            activeTerms: newClub.active_terms,
            daysOfOperation: newClub.days_of_operation,
            bannerPhoto: newClub.banner_photo
        }
    }
    async getClubs(): Promise<ClubDTO[]> {
        let queriedClubs : ClubModel[];
        
        try {
            queriedClubs = await ClubModel.findAll();
        } catch (error) {
            throw error;
        }

        return queriedClubs.map((club) => ({
            id: club.id,
            name: club.name,
            description: club.description,
            competitionLevel: club.competition_level,
            skillLevel: club.skill_level,
            clubCategories: club.club_categories,
            isActive: club.is_active,
            activeTerms: club.active_terms,
            daysOfOperation: club.days_of_operation,
            bannerPhoto: club.banner_photo,
        }));

    }
    async getClubById(clubId: number): Promise<ClubDTO> {
        let club : ClubModel | null;

        try {
            club = await ClubModel.findByPk(clubId);
        } catch (error) {
            throw error;
        }

        if (!club) {
            throw new Error(`Club with ID ${clubId} not found`);
        }

        return {
            id: club.id,
            name: club.name,
            description: club.description,
            competitionLevel: club.competition_level,
            skillLevel: club.skill_level,
            clubCategories: club.club_categories,
            isActive: club.is_active,
            activeTerms: club.active_terms,
            daysOfOperation: club.days_of_operation,
            bannerPhoto: club.banner_photo,
        }
        
    }
    async updateClub(clubId: number, club: UpdateClubDTO): Promise<ClubDTO> {
        let existingClub: ClubModel | null

        try {
            existingClub = await ClubModel.findByPk(clubId);
        } catch (error) {
            throw error;
        }
    
        if (!existingClub) {
            throw new Error(`Club with ID ${clubId} not found`);
        }
        try {
            await existingClub.update({
                name: club.name ?? existingClub.name,
                description: club.description ?? existingClub.description,
                competitionLevel: club.competitionLevel ?? existingClub.competition_level,
                skillLevel: club.skillLevel ?? existingClub.skill_level,
                clubCategories: club.clubCategories ?? existingClub.club_categories,
                isActive: club.isActive ?? existingClub.is_active,
                activeTerms: club.activeTerms ?? existingClub.active_terms,
                daysOfOperation: club.daysOfOperation ?? existingClub.days_of_operation,
                bannerPhoto: club.bannerPhoto ?? existingClub.banner_photo,
            });
        } catch (error) {
            throw error;
        }
    
        return {
            id: existingClub.id,
            name: existingClub.name,
            description: existingClub.description,
            competitionLevel: existingClub.competition_level,
            skillLevel: existingClub.skill_level,
            clubCategories: existingClub.club_categories,
            isActive: existingClub.is_active,
            activeTerms: existingClub.active_terms,
            daysOfOperation: existingClub.days_of_operation,
            bannerPhoto: existingClub.banner_photo,
        };
    }
    async deleteClub(clubId: number): Promise<void> {
        let club: ClubModel | null;
    
        try {
            club = await ClubModel.findByPk(clubId);
        } catch (error) {
            throw new Error(`Error finding club with ID ${clubId}:`);
        }
    
        if (!club) {
            throw new Error(`Club with ID ${clubId} not found`);
        }
    
        try {
            await club.destroy();
        } catch (error) {
            throw new Error(`Error deleting club with ID ${clubId}`);
        }
    }
}

export default ClubService;