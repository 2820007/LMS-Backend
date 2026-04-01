import express from "express";
import { createCategory, getCategories, deleteCategory } from "../controller/categoryController.js";
import isAuthenticated from "../middleware/isAuthenticate.js";
import permitTo from "../middleware/permitTo.js";
import catchAsync from "../services/cathAsync.js";

const categoryRouter = express.Router();

categoryRouter.route("/category").post(isAuthenticated,permitTo("admin"),catchAsync(createCategory)).get(getCategories);
categoryRouter.route("/category/:id").delete(isAuthenticated,permitTo("admin"),catchAsync(deleteCategory));

export default categoryRouter;