const ClubCategoryValues = [
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
export const ClubCategoryEnum: ClubCategory[] = [...ClubCategoryValues];
export type ClubCategory = typeof ClubCategoryValues[number];

export enum SemesterEnum {
    FALL = "Fall",
    WINTER = "Winter",
    SPRING = "Spring",
}

export enum DayEnum {
    MON = "Monday",
    TUE = "Tuesday",
    WED = "Wednesday",
    THU = "Thursday",
    FRI = "Friday",
    SAT = "Saturday",
    SUN = "Sunday",
}

export enum TermEnum {
   ONE_A  = "1A",
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

export type ClubDTO = {
    id: number,
    name: string,
    description: string,
    competitionLevel: number,
    skillLevel: number,
    /*
    socialMedia: {
        email: string,
        instagram: string,
        tiktok: string,
        youtube: string,
        facebook: string,
        linkedin: string
    },
    */
    clubCategories: [ClubCategory],
    isActive: boolean,
    activeTerms: [SemesterEnum],
    daysOfOperation: [DayEnum],
    bannerPhoto: string,
}
export type CreateClubDTO = Omit<ClubDTO, "id" | "isActive" | "bannerPhoto">;
export type UpdateClubDTO = Omit<ClubDTO, "id">;

export type UserDTO = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    programName: string,
    termOfStudy: TermEnum,
    profilePhoto: string,
}

export type CreateUserDTO = Omit<UserDTO, "id" | "profilePhoto">;
export type UpdateUserDTO = Omit<UserDTO, "id" | "email">;

export type ReviewDTO = {
    id: number,
    userId: number,
    clubId: number,
    comment: string,
    isLiked: boolean,
    helpfulVotes: number,
}

export type CreateReviewDTO = Omit<ReviewDTO, "id" | "helpfulVotes">;
export type UpdateReviewDTO = Omit<ReviewDTO, "id" | "userId" | "clubId" | "helpfulVotes">;
