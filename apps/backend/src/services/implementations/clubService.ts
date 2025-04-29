import IClubService from "../interfaces/clubService";
import {
    ClubDTO,
    CreateClubDTO,
    UpdateClubDTO,
    ClubCategory,
    SemesterEnum,
    DayEnum
} from "../../../types";
import MsClub from "../../models/club.model";

/*
class ClubService implements IClubService {
    createClub(club: CreateClubDTO): Promise<ClubDTO> {}
    getClubById(clubId: number): Promise<ClubDTO> {}
    getClubs(): Promise<Array<ClubDTO>> {}
    updateClub(clubId: number, club: UpdateClubDTO): Promise<ClubDTO> {}
    deleteClub(clubId: number): Promise<void> {}
}

export default ClubService;
*/