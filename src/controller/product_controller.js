const Product = require('../model/Products');
const cloudinary = require("../utils/cloudinary");

exports.postreq = async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  
      // Create new product
      let product = new Product({
        name: req.body.name,
        description:req.body.description,
        price: req.body.price,
        image: result.secure_url,
        cloudinary_id: result.public_id,
      });
      // Save product
      const data = await product.save();
      res.status(200).send(data);
    } catch (err) {
        console.log(err);
        res.status(401).send(err.message);
      
    }
};

exports.getreq = async (req, res) => {
    try {
        const { page = 1, limit = 2} = req.query;

      let data = await Product.find().limit(limit *1).skip((page-1)*limit);
      res.json(data);
    } catch (err) {
      console.log(err);
    }
};

exports.deletePr = async (req, res) => {
    try {
      // Find product by id
      let data = await Product.findById(req.params.id);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(data.cloudinary_id);
      // Delete product from db
      await data.remove();
      res.json(data);
    } catch (err) {
      console.log(err);
    }
};

exports.putreq =  async (req, res) => {
    try {
      let info = await Product.findById(req.params.id);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(info.cloudinary_id);
      // Upload image to cloudinary
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      const data = {
        name: req.body.name || info.name,
        description:req.body.description || info.description,
        price: req.body.price || info.price,
        image: result?.secure_url || info.image,
        cloudinary_id: result?.public_id || info.cloudinary_id,
      };
      info = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
      res.json(info);
    } catch (err) {
      console.log(err);
    }
};

exports.show_one = async (req, res) => {
    try {
      // Find product by id
      let data = await Product.findById(req.params.id);
      res.json(data);
    } catch (err) {
      console.log(err);
    }
};