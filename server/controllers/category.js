import Category from "../models/category.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    //check if category exist or not
    const existingCategory = await Category.findOne({ name: name });
    if (existingCategory) {
      return res.status(400).json({
        error: "category with this name exist",
      });
    }

    const newcategory = await new Category({
      name,
      slug: slugify(name),
    });
    await newcategory.save();
    return res.status(201).json({
      message: "category is created",
      newcategory,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const {name} = req.body;
    const {categoryId} = req.params;
    const existingCategory = await Category.findById({ _id:categoryId });
    if (!existingCategory) {
      return res.status(400).json({
        error: "category does not found with this id",
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate({_id:categoryId},{name,slug:slugify(name)}, {new:true})

    return res.status(200).json({
      message: "category updated",
      updatedCategory,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
export const delateCategory = async (req, res) => {
  try {
    const {categoryId} = req.params;
    const existingCategory = await Category.findById({ _id:categoryId });
    if (!existingCategory) {
      return res.status(400).json({
        error: "category does not found with this id",
      });
    }

    const deletedCategory = await Category.findByIdAndDelete({_id:categoryId})
    // const newCategoty = await Category.find()

    return res.status(200).json({
      message: "category deleted",
      deletedCategory,
    });

  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
export const getCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    // console.log(slug)
    const singleCategory = await Category.findOne({ slug: slug });
    if (!singleCategory) {
      return res.status(400).json({
        error: "category does not found with this name",
      });
    }
    return res.status(200).json({
      message: "single category returned",
      singleCategory,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
//get all the categoties
export const getCategories = async (req, res) => {
  try {
    const categorirs = await Category.find();
    if (!categorirs) {
      return res.status(400).json({
        error: "categories does not found with this name",
      });
    }
    return res.status(200).json({
      message: "categorirs returned",
      categorirs,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
