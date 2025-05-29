import { Request, Response, NextFunction } from "express";
import {
  validatePrimitive,
  getApiValidationError,
  validateEnumArray,
  validateArray,
} from "./util";
import { CategoryEnum } from "../../../types";

export const createClubDTOValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!validatePrimitive(req.body.name, "string")) {
    return res.status(400).send(getApiValidationError("name", "string"));
  }
  if (!validatePrimitive(req.body.description, "string")) {
    return res.status(400).send(getApiValidationError("description", "string"));
  }
  if (!validatePrimitive(req.body.competitionLevel, "integer")) {
    return res
      .status(400)
      .send(getApiValidationError("competitionLevel", "integer"));
  }
  if (!validatePrimitive(req.body.skillLevel, "integer")) {
    return res.status(400).send(getApiValidationError("skillLevel", "integer"));
  }
  if (!validateArray(req.body.schedule, "boolean")) {
    return res
      .status(400)
      .send(getApiValidationError("schedule", "boolean", true));
  }
  if (!validatePrimitive(req.body.socials.email, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("socials.email", "string"));
  }
  if (!validatePrimitive(req.body.socials.instagram, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("socials.instagram", "string"));
  }
  if (!validatePrimitive(req.body.socials.tiktok, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("socials.tiktok", "string"));
  }
  if (!validatePrimitive(req.body.socials.linkedin, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("socials.linkedin", "string"));
  }
  if (!validatePrimitive(req.body.socials.youtube, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("socials.youtube", "string"));
  }
  if (!validatePrimitive(req.body.socials.facebook, "string")) {
    return res
      .status(400)
      .send(getApiValidationError("socials.facebook", "string"));
  }
  if (!validateEnumArray(req.body.categories, CategoryEnum)) {
    return res
      .status(400)
      .send(getApiValidationError("categories", "CategoryEnum", true));
  }

  return next();
};

export const updateClubDTOValidator = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    req.body.name != undefined &&
    req.body.name != null &&
    !validatePrimitive(req.body.name, "string")
  ) {
    return res.status(400).send(getApiValidationError("name", "string"));
  }
  if (
    req.body.name != undefined &&
    req.body.name != null &&
    !validatePrimitive(req.body.description, "string")
  ) {
    return res.status(400).send(getApiValidationError("description", "string"));
  }
  if (
    req.body.name != undefined &&
    req.body.name != null &&
    !validatePrimitive(req.body.competitionLevel, "integer")
  ) {
    return res
      .status(400)
      .send(getApiValidationError("competitionLevel", "integer"));
  }
  if (
    req.body.name != undefined &&
    req.body.name != null &&
    !validatePrimitive(req.body.skillLevel, "integer")
  ) {
    return res.status(400).send(getApiValidationError("skillLevel", "integer"));
  }
  if (
    req.body.name != undefined &&
    req.body.name != null &&
    !validateEnumArray(req.body.clubCategories, CategoryEnum)
  ) {
    return res
      .status(400)
      .send(getApiValidationError("clubCategories", "CategoryEnum"));
  }
  if (
    req.body.name != undefined &&
    req.body.name != null &&
    !validateEnumArray(req.body.isActive, "boolean")
  ) {
    return res.status(400).send(getApiValidationError("isActive", "boolean"));
  }
  if (
    req.body.name != undefined &&
    req.body.name != null &&
    !validateEnumArray(req.body.bannerPhoto, "string")
  ) {
    return res.status(400).send(getApiValidationError("bannerPhoto", "string"));
  }
  if (
    req.body.name != undefined &&
    req.body.name != null &&
    !validateArray(req.body.schedule, "boolean")
  ) {
    return res
      .status(400)
      .send(getApiValidationError("schedule", "boolean", true));
  }
  if (
    req.body.name != undefined &&
    req.body.name != null &&
    !validatePrimitive(req.body.social.email, "string")
  ) {
    return res
      .status(400)
      .send(getApiValidationError("social.email", "string"));
  }
  if (
    req.body.name != undefined &&
    req.body.name != null &&
    !validatePrimitive(req.body.social.instagram, "string")
  ) {
    return res
      .status(400)
      .send(getApiValidationError("social.instagram", "string"));
  }
  if (
    req.body.name != undefined &&
    req.body.name != null &&
    !validatePrimitive(req.body.social.tiktok, "string")
  ) {
    return res
      .status(400)
      .send(getApiValidationError("social.tiktok", "string"));
  }
  if (
    req.body.name != undefined &&
    req.body.name != null &&
    !validatePrimitive(req.body.social.linkedin, "string")
  ) {
    return res
      .status(400)
      .send(getApiValidationError("social.linkedin", "string"));
  }
  if (
    req.body.name != undefined &&
    req.body.name != null &&
    !validatePrimitive(req.body.social.youtube, "string")
  ) {
    return res
      .status(400)
      .send(getApiValidationError("social.youtube", "string"));
  }
  if (
    req.body.name != undefined &&
    req.body.name != null &&
    !validatePrimitive(req.body.social.facebook, "string")
  ) {
    return res
      .status(400)
      .send(getApiValidationError("social.facebook", "string"));
  }
  if (
    req.body.name != undefined &&
    req.body.name != null &&
    !validateEnumArray(req.body.categories, CategoryEnum)
  ) {
    return res
      .status(400)
      .send(getApiValidationError("categories", "CategoryEnum", true));
  }

  return next();
};
