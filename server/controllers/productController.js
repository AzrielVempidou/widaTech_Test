const { Op } = require('sequelize');
const { Product } = require('../models'); 
module.exports = class productController {
    static async getAllProduct(req,res,next){
        try {
            const Products = await Product.findAll()
            res.status(200).json(Products)
          } catch (error) {
            console.log(error, "<<");
            next(error)
          }
    }
  static async searchProduct(req,res,nex){
    const { keyword } = req.query;

    try {
        // Lakukan pencarian berdasarkan nama atau deskripsi produk
        const products = await Product.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.iLike]: `%${keyword}%` } }, // Case-insensitive search by name
                ]
            }
        });

        // Kirim hasil pencarian sebagai response
        res.json(products);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  }
}