import express from 'express'
import { createProducts, deleteProduct, getProducts, updateProduct } from '../controller/product.controller.js';

const router = express.Router()

router.post('/', createProducts)

router.get('/', getProducts)

// router.get('/:id', getProduct)

router.delete('/:id', deleteProduct)

router.put('/:id', updateProduct)

export default router

