const clubCategoryValues = [
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
export const clubCategoryEnum: clubCategory[] = [...clubCategoryValues];
export type clubCategory = typeof clubCategoryValues[number];

export enum semesterEnum {
    FALL = "Fall",
    WINTER = "Winter",
    SPRING = "Spring",
}

export enum dayEnum {
    MON = "Monday",
    TUE = "Tuesday",
    WED = "Wednesday",
    THU = "Thursday",
    FRI = "Friday",
    SAT = "Saturday",
    SUN = "Sunday",
}

export type clubDTO = {
    id: number,
    name: string,
    description: string,
    competitionLevel: number,
    skillLevel: number,
    socialMedia: {
        email: string,
        instagram: string,
        tiktok: string,
        youtube: string,
        facebook: string,
        linkedin: string
    },
    clubCategories: [clubCategory],
    isActive: boolean,
    activeTerms: [semesterEnum],
    daysOfOperation: [dayEnum],
    bannerPhoto: string,
}
export type createClubDTO = Omit<clubDTO, "id" | "isActive" | "bannerPhoto">;
export type updateClubDTO = Omit<clubDTO, "id">;

