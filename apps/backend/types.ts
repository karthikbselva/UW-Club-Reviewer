import Password from "./src/models/password.model";

const CategoryValues = [
  "Academic",
  "Business and Entrepreneurial",
  "Charitable, Community Service, and International Development",
  "Creative Arts, Dance, and Music",
  "Cultural",
  "Environmental and Sustainability",
  "Games, Recreational, and Social",
  "Health Promotion",
  "Media, Publications, and Web Development",
  "Political and Social Awareness",
  "Religious and Spiritual",
] as const;
export const CategoryEnum: CategoryType[] = [...CategoryValues];
export type CategoryType = (typeof CategoryValues)[number];

export enum TermEnum {
  ONE_A = "1A",
  ONE_B = "1B",
  TWO_A = "2A",
  TWO_B = "2B",
  THREE_A = "3A",
  THREE_B = "3B",
  FOUR_A = "4A",
  FOUR_B = "4B",
  FIVE_A = "5A",
  FIVE_B = "5B",
}

export interface SocialDTO {
  id: number;
  clubId: number;
  email: string | null;
  instagram: string | null;
  tiktok: string | null;
  linkedin: string | null;
  youtube: string | null;
  facebook: string | null;
}
export type UpdateSocialDTO = Omit<SocialDTO, "id" | "clubId">;
export interface CategoryFullDTO {
  id: number;
  name: CategoryType;
  clubs: ClubDTO[];
}
export type CategoryDTO = Omit<CategoryFullDTO, "clubs">;
export interface ScheduleDTO {
  id: number;
  clubId: number;
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
}
export type UpdateScheduleDTO = Omit<ScheduleDTO, "id" | "clubId">;

export interface ClubFullDTO {
  id: number;
  name: string;
  description: string;
  competitionLevel: number;
  skillLevel: number;
  isActive: boolean;
  bannerPhoto: string;
  schedule: ScheduleDTO;
  social: SocialDTO;
  categories: CategoryDTO[];
  reviews: ReviewDTO[];
}
export type ClubSearchDTO = Omit<
  ClubFullDTO,
  "social" | "categories" | "reviews"
>;
export type ClubDTO = Omit<
  ClubFullDTO,
  "schedule" | "social" | "categories" | "reviews"
>;
export interface UpdateClubDTO {
  name: string | null;
  description: string | null;
  competitionLevel: number | null;
  skillLevel: number | null;
  isActive: boolean | null;
  bannerPhoto: string | null;
  schedule: UpdateScheduleDTO | null;
  social: UpdateSocialDTO | null;
  categories: CategoryType[] | null;
}
export type UpdateClubResponseDTO = Omit<ClubFullDTO, "reviews">;
export interface CreateClubDTO {
  name: string;
  description: string;
  competitionLevel: number;
  skillLevel: number;
  schedule: UpdateScheduleDTO;
  social: UpdateSocialDTO;
  categories: CategoryType[];
}

export interface UserDTO {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  programName: string | null;
  termOfStudy: TermEnum | null;
  profilePhoto: string | null;
}

export type CreateUserDTO = Omit<UserDTO, "id" | "profilePhoto"> & {
  newPassword: Password;
};

export type UpdateUserDTO = Omit<UserDTO, "id" | "email"> & {
    updatedPassword: Password;
};

export interface ReviewDTO {
  id: number;
  userId: number;
  clubId: number;
  comment: string;
  likesClub: boolean;
  voteSum: number;
}

export type CreateReviewDTO = Omit<ReviewDTO, "id" | "voteSum">;
export interface UpdateReviewDTO {
  comment: string | null;
  likesClub: boolean | null;
  voteSum: number | null;
}

export interface VoteDTO {
  id: number,
  userId: number,
  reviewId: number,
  voteValue: number,
}
export type AddVoteDTO = Omit<VoteDTO, "id">

export interface TokenDTO {
  accessToken: string,
  refreshToken: string,
  expiresIn: number,
}

export interface AuthDTO {
  user: UserDTO,
  token: TokenDTO,
}