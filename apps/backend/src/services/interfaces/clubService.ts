import {
  ClubFullDTO,
  ClubSearchDTO,
  CreateClubDTO,
  UpdateClubDTO,
  UpdateClubResponseDTO,
} from "../../../types";

interface IClubService {
  createClub(clubDTO: CreateClubDTO): Promise<ClubFullDTO>;
  getClubById(clubId: number): Promise<ClubFullDTO>;
  getClubs(): Promise<ClubSearchDTO[]>;
  // getClubsByQuery()
  updateClub(
    clubId: number,
    clubDTO: UpdateClubDTO,
  ): Promise<UpdateClubResponseDTO>;
  deleteClub(clubId: number): Promise<void>;
}

export default IClubService;
