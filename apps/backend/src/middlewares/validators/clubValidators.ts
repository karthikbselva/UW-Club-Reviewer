import { Request, Response, NextFunction } from "express";
import { validatePrimitive, getApiValidationError, validateEnumArray } from "./util"; 
import { ClubCategoryEnum, DayEnum, SemesterEnum } from "../../../types";

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
        return res.status(400).send(getApiValidationError("competitionLevel", "integer"));
    }
    if (!validatePrimitive(req.body.skillLevel, "integer")) {
        return res.status(400).send(getApiValidationError("skillLevel", "integer"));
    }
    if (!validateEnumArray(req.body.clubCategories, ClubCategoryEnum)) {
        return res.status(400).send(getApiValidationError("clubCategories", "ClubCategory"));
    }
    if (!validateEnumArray(req.body.activeTerms, SemesterEnum)) {
        return res.status(400).send(getApiValidationError("activeTerms", "SemesterEnum"));
    }
    if (!validateEnumArray(req.body.daysOfOperation, DayEnum)) {
        return res.status(400).send(getApiValidationError("daysOfOperation", "DayEnum"));
    }

    return next();
}