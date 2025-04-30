import IClubService from "../interfaces/clubService";
import {
    ClubDTO,
    CreateClubDTO,
    // UpdateClubDTO,
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
    // getClubById(clubId: number): Promise<ClubDTO> {}
    // getClubs(): Promise<Array<ClubDTO>> {}
    // updateClub(clubId: number, club: UpdateClubDTO): Promise<ClubDTO> {}
    // deleteClub(clubId: number): Promise<void> {}
}

export default ClubService;