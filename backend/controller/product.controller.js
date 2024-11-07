import Product from "../models/product.model.js";
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(200).send({data: products})
}

export const createProducts = async(req, res) => {
    const product = req.body;
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).send({"success": true, "message": "product deleted"})
    }catch(error){
        res.status(404).send({"success": false, "message": error.message})
    }
}

export const updateProduct = async (req, res) => {
	const { id } = req.params;

	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};


// export const getProduct = async (req, res) => {
//     const {id} = req.params
//     try{
//         const product = await Product.findById(id)
//         res.status(200).json(product)
//     }catch(error){
//         res.status(404).send({"success": false, "message": error.message})
//     }
// }