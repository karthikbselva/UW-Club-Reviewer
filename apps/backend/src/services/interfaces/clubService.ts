import { ClubDTO, CreateClubDTO, UpdateClubDTO } from "../../../types";

interface IClubService {
    createClub(club: CreateClubDTO): Promise<ClubDTO>;
    getClubs(): Promise<ClubDTO[]>;
    getClubById(clubId: number): Promise<ClubDTO>;
    // getClubsByQuery()
    updateClub(clubId: number, club: UpdateClubDTO): Promise<ClubDTO>;
    deleteClub(clubId: number): Promise<void>;
}

export default IClubService;