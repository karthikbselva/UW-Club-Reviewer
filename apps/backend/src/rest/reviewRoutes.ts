import { Router } from "express";
import IReviewService from "../services/interfaces/reviewService";
import ReviewService from "../services/implementations/reviewService";

const reviewRouter : Router = Router();
const reviewService : IReviewService = new ReviewService();

