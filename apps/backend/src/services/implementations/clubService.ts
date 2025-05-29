import IClubService from "../interfaces/clubService";
import {
  CategoryDTO,
  CategoryType,
  ClubFullDTO,
  ClubSearchDTO,
  CreateClubDTO,
  UpdateClubDTO,
  UpdateClubResponseDTO,
} from "../../../types";
import ClubModel from "../../models/club.model";
import ScheduleModel from "../../models/schedule.model";
import SocialModel from "../../models/social.model";
import CategoryModel from "../../models/category.model";
import { sequelize } from "../../models/index";
import { Transaction } from "sequelize";

class ClubService implements IClubService {
  async createClub(clubDTO: CreateClubDTO): Promise<ClubFullDTO> {
    let newClub: ClubModel;
    let newSchedule: ScheduleModel;
    let newSocial: SocialModel;
    const categoryArray = clubDTO.categories.map((category) => ({
      name: category,
    }));
    const t: Transaction = await sequelize.transaction();

    try {
      newClub = await ClubModel.create(
        {
          name: clubDTO.name,
          description: clubDTO.description,
          competitionLevel: clubDTO.competitionLevel,
          skillLevel: clubDTO.skillLevel,
          isActive: true,
          bannerPhoto: "",
          categories: categoryArray,
        },
        {
          include: CategoryModel,
          transaction: t,
        },
      );

      newSchedule = await ScheduleModel.create(
        {
          club_id: newClub.id,
          sunday: clubDTO.schedule.sunday,
          monday: clubDTO.schedule.monday,
          tuesday: clubDTO.schedule.tuesday,
          wednesday: clubDTO.schedule.wednesday,
          thursday: clubDTO.schedule.thursday,
          friday: clubDTO.schedule.friday,
          saturday: clubDTO.schedule.saturday,
        },
        { transaction: t },
      );

      newSocial = await SocialModel.create(
        {
          club_id: newClub.id,
          email: clubDTO.social.email,
          instagram: clubDTO.social.instagram,
          tiktok: clubDTO.social.tiktok,
          youtube: clubDTO.social.youtube,
          facebook: clubDTO.social.facebook,
          linkedin: clubDTO.social.linkedin,
        },
        { transaction: t },
      );

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }

    const categoriesObject = (await newClub.$get("categories")).map(
      (category) => ({
        id: category.id,
        name: category.name as CategoryType,
      }),
    );
    const reviewsObject = (await newClub.$get("reviews")).map((review) => ({
      id: review.id,
      userId: review.user_id,
      clubId: review.club_id,
      comment: review.comment,
      likesClub: review.likes_club,
      voteSum: review.vote_sum,
    }));

    return {
      id: newClub.id,
      name: newClub.name,
      description: newClub.description,
      competitionLevel: newClub.competition_level,
      skillLevel: newClub.skill_level,
      isActive: newClub.is_active,
      bannerPhoto: newClub.banner_photo,
      schedule: {
        id: newSchedule.id,
        clubId: newSchedule.club_id,
        sunday: newSchedule.sunday,
        monday: newSchedule.monday,
        tuesday: newSchedule.sunday,
        wednesday: newSchedule.sunday,
        thursday: newSchedule.sunday,
        friday: newSchedule.sunday,
        saturday: newSchedule.sunday,
      },
      social: {
        id: newSocial.id,
        clubId: newSocial.club_id,
        email: newSocial.email,
        instagram: newSocial.instagram,
        tiktok: newSocial.tiktok,
        youtube: newSocial.youtube,
        facebook: newSocial.facebook,
        linkedin: newSocial.linkedin,
      },
      categories: categoriesObject,
      reviews: reviewsObject,
    };
  }

  async getClubs(): Promise<ClubSearchDTO[]> {
    const queriedClubs = await ClubModel.findAll({
      include: ["schedule"],
    });
    const clubDTOs = queriedClubs.map((club) => ({
      id: club.id,
      name: club.name,
      description: club.description,
      competitionLevel: club.competition_level,
      skillLevel: club.skill_level,
      isActive: club.is_active,
      bannerPhoto: club.banner_photo,
      schedule: {
        id: club.schedule.id,
        clubId: club.schedule.club_id,
        sunday: club.schedule.sunday,
        monday: club.schedule.monday,
        tuesday: club.schedule.tuesday,
        wednesday: club.schedule.wednesday,
        thursday: club.schedule.thursday,
        friday: club.schedule.friday,
        saturday: club.schedule.saturday,
      },
    }));

    return clubDTOs;
  }

  async getClubById(clubId: number): Promise<ClubFullDTO> {
    const club = await ClubModel.findByPk(clubId, {
      include: ["schedule", "social", "categories", "reviews"],
    });

    if (!club) {
      throw new Error(`Club with ID ${clubId} not found`);
    }

    const categoriesObject = club.categories.map((category) => ({
      id: category.id,
      name: category.name as CategoryType,
    }));
    const reviewsObject = club.reviews.map((review) => ({
      id: review.id,
      userId: review.user_id,
      clubId: review.club_id,
      comment: review.comment,
      likesClub: review.likes_club,
      voteSum: review.vote_sum,
    }));

    return {
      id: club.id,
      name: club.name,
      description: club.description,
      competitionLevel: club.competition_level,
      skillLevel: club.skill_level,
      isActive: club.is_active,
      bannerPhoto: club.banner_photo,
      schedule: {
        id: club.schedule.id,
        clubId: club.schedule.club_id,
        sunday: club.schedule.sunday,
        monday: club.schedule.monday,
        tuesday: club.schedule.tuesday,
        wednesday: club.schedule.wednesday,
        thursday: club.schedule.thursday,
        friday: club.schedule.friday,
        saturday: club.schedule.saturday,
      },
      social: {
        id: club.social.id,
        clubId: club.social.club_id,
        email: club.social.email,
        instagram: club.social.instagram,
        tiktok: club.social.tiktok,
        youtube: club.social.youtube,
        facebook: club.social.facebook,
        linkedin: club.social.linkedin,
      },
      categories: categoriesObject,
      reviews: reviewsObject,
    };
  }

  async updateClub(
    clubId: number,
    clubDTO: UpdateClubDTO,
  ): Promise<UpdateClubResponseDTO> {
    const t: Transaction = await sequelize.transaction();

    const club = await ClubModel.findByPk(clubId);
    if (!club) throw new Error(`Club with ID ${clubId} not found`);

    const schedule = await club.$get("schedule");
    if (!schedule)
      throw new Error(
        `Associated schedule for club with ID ${clubId} not found`,
      );

    const social = await club.$get("social");
    if (!social)
      throw new Error(
        `Associated socials for club with ID ${clubId} not found`,
      );

    await club.update(
      {
        name: clubDTO.name ?? club.name,
        description: clubDTO.description ?? club.description,
        competitionLevel: clubDTO.competitionLevel ?? club.competition_level,
        skillLevel: clubDTO.skillLevel ?? club.skill_level,
        categories: clubDTO.categories ?? club.categories,
        isActive: clubDTO.isActive ?? club.is_active,
        bannerPhoto: clubDTO.bannerPhoto ?? club.banner_photo,
      },
      { transaction: t },
    );

    if (clubDTO.schedule) {
      await schedule.update(
        {
          sunday: clubDTO.schedule.sunday,
          monday: clubDTO.schedule.monday,
          tuesday: clubDTO.schedule.tuesday,
          wednesday: clubDTO.schedule.wednesday,
          thursday: clubDTO.schedule.thursday,
          friday: clubDTO.schedule.friday,
          saturday: clubDTO.schedule.saturday,
        },
        { transaction: t },
      );
    }

    if (clubDTO.social) {
      await social.update(
        {
          email: clubDTO.social.email,
          instagram: clubDTO.social.instagram,
          tiktok: clubDTO.social.tiktok,
          youtube: clubDTO.social.youtube,
          facebook: clubDTO.social.facebook,
          linkedin: clubDTO.social.linkedin,
        },
        { transaction: t },
      );
    }

    let categoriesObject: CategoryDTO[] = []; // declare for safe return
    if (clubDTO.categories) {
      const categoryModelsArray = await Promise.all(
        clubDTO.categories.map((category) =>
          CategoryModel.findOrCreate({
            where: { name: category },
            transaction: t,
          }).then(([categoryModel]) => {
            return categoryModel;
          }),
        ),
      );
      await club.$add("categories", categoryModelsArray);
      categoriesObject = (await club.$get("categories")).map((category) => ({
        id: category.id,
        name: category.name as CategoryType,
      }));
    }

    return {
      id: club.id,
      name: club.name,
      description: club.description,
      competitionLevel: club.competition_level,
      skillLevel: club.skill_level,
      isActive: club.is_active,
      bannerPhoto: club.banner_photo,
      schedule: {
        id: schedule.id,
        clubId: schedule.club_id,
        sunday: schedule.sunday,
        monday: schedule.monday,
        tuesday: schedule.tuesday,
        wednesday: schedule.wednesday,
        thursday: schedule.thursday,
        friday: schedule.friday,
        saturday: schedule.saturday,
      },
      social: {
        id: social.id,
        clubId: social.club_id,
        email: social.email,
        instagram: social.instagram,
        tiktok: social.tiktok,
        youtube: social.youtube,
        facebook: social.facebook,
        linkedin: social.linkedin,
      },
      categories: categoriesObject,
    };
  }

  async deleteClub(clubId: number): Promise<void> {
    let club: ClubModel | null;

    try {
      club = await ClubModel.findByPk(clubId);
    } catch {
      throw new Error(`Error finding club with ID ${clubId}:`);
    }

    if (!club) {
      throw new Error(`Club with ID ${clubId} not found`);
    }

    try {
      await club.destroy();
    } catch {
      throw new Error(`Error deleting club with ID ${clubId}`);
    }
  }
}

export default ClubService;
