const { Product } = require('../models/product')

const authorization = async(req,res,next) => {
  try {
    const userName = +req.user.username
    const product = await Product.findByPk(req.params.id)
    if(!product) throw {name: "NotFound"}

    console.log(req.user);
    if (product.customer_name !== userName && req.user.role !== "admin") {
      throw{ name: "Forbidden", message:"Forbidden Access"}
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authorization