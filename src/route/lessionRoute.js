import express from "express";
import {
  createLesson,
  getLessonsByCourse,
  updateLesson,
  deleteLesson,
} from "../controller/lessionController.js";
import isAuthenticated from "../middleware/isAuthenticate.js";
import permitTo from "../middleware/permitTo.js";
import catchAsync from "../services/cathAsync.js";

const lessionRouter = express.Router();

lessionRouter.route("/lession").post(isAuthenticated,permitTo("admin"),catchAsync(createLesson))
lessionRouter.route("/course/:courseId").get(catchAsync(getLessonsByCourse))
lessionRouter.route("/lession/:id").patch(isAuthenticated,permitTo("admin"),catchAsync(updateLesson)).delete(isAuthenticated,permitTo("admin"),catchAsync(deleteLesson))



export default lessionRouter;