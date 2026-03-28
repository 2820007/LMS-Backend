import Category from "../models/categoryModel.js";

// Create category
export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  const exist = await Category.findOne({ name });
  if (exist)
    return res.status(400).json({ message: "Category already exists" });

  await Category.create({ name, description });
  res.status(201).json({ message: "Category created" });
};

// Get all categories
export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ data: categories });
};

// Delete category
export const deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Category deleted" });
};
