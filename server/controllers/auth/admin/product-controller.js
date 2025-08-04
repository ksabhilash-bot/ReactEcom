import { imageUploadUtil } from "../../../cloudinary/cloudinary.js";
import { ProductModel } from "../../../models/product.js";
export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);
    res.json({ success: true, result });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error occured" });
  }
};
//add a product
export const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const newlyCreatedProduct = new ProductModel({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });
    console.log("New",newlyCreatedProduct)
    await newlyCreatedProduct.save();
    res.status(201).json({ success: true, data: newlyCreatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error Occured" });
  }
};
//fetch product
export const fetchAllProduct = async (req, res) => {
  try {
    const listOfProducts = await ProductModel.find({});
    res.status(200).json({ success: true, data: listOfProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error Occured" });
  }
};

//edit product
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;
    const findProduct = await ProductModel.findById(id);
    if (!findProduct) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.image = image || findProduct.image;
    findProduct.price = price || findProduct.price;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.salePrice = salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    await findProduct.save();
    res.status(200).json({ success: true, data:findProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error Occured" });
  }
};

//delete a product
export const deleteProduct = async (req, res) => {
  try {
    const {id}=req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    if(!product) {return res.status(404).json({success:false,message:"Product not found to delete"})}
    return res.json({success:true,message:"product deleted"})

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error Occured" });
  }
};
