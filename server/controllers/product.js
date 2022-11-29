import Product from "../models/product.js";
//to use file of computer
import fs from "fs";
import slugify from "slugify";

//create product

export const createProduct = async (req, res) => {
  try {
    //fields are getting using package express-formidable
    const { name, price, description, quantity, shipping, category } =
      req.fields;
    const { photo } = req.files;

    if (!name || !price || !quantity || !description) {
      return res.status(400).json({
        message: "you must enter name, price, description and quantity",
      });
    }
    //validation for photo size
    if (photo && photo.size > 2000000) {
      return res.status(400).json({
        message: "photo size cannot be more than 2 mb",
      });
    }
    //create product without photo
    const newProduct = new Product({
      name,
      slug: slugify(name),
      price,
      description,
      quantity,
      category,
      shipping,
    });
    //only save if there is photo
    if (photo) {
      newProduct.photo.data = fs.readFileSync(photo.path);
      newProduct.photo.contentType = photo.type;
    }

    await newProduct.save();

    return res.status(201).json({
      message: "product created",
      newProduct,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

//get product
export const getProducts = async (req, res) => {
  try {
    //geting all product and populating category add not to see photo .select("-photo")
    const allProduct = await Product.find().populate("category");

    return res.status(201).json({
      message: "all product returned ",
      allProduct,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

//get product
export const getProduct = async (req, res) => {
  try {
    //geting all product and populating category
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      "category"
    );

    return res.status(201).json({
      message: "single product returned ",
      product,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

//get photo
export const getPhoto = async (req, res) => {
  try {
    //geting all product and populating category
    const product = await Product.findById(req.params.productId).select(
      "photo"
    );
    if (product.photo.data) {
      res.set("content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }

    return res.status(201).json({
      message: "photo returned ",
      photo,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
//get product
export const deleteProduct = async (req, res) => {
  try {
    //geting all product and populating category
    const deleteProduct = await Product.findByIdAndDelete(req.params.productId);

    return res.status(201).json({
      message: "product deleted ",
      deleteProduct,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    //fields are getting using package express-formidable
    const { name, price, description, quantity, shipping, category } =
      req.fields;
    const { photo } = req.files;

    if (!name || !price || !quantity || !description) {
      return res.status(400).json({
        message: "you must enter name, price, description and quantity",
      });
    }
    //validation for photo size
    if (photo && photo.size > 2000000) {
      return res.status(400).json({
        message: "photo size cannot be more than 2 mb",
      });
    }

    //update product
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        name,
        slug: slugify(name),
        price,
        description,
        quantity,
        category,
        shipping,
      },
      { new: true }
    );

    if(photo){
      updateProduct.photo.data = fs.readFileSync(photo.path);
      updateProduct.photo.contentType = photo.type;

    }
    await updateProduct.save()
    return res.status(200).json({
      message: "product updated",
      updateProduct,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
