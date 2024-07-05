const { verifyTokens } = require("../helper/jwt");
const { User } = require("../models");

const authentication = async(req,res,next) => {
  try {
    const { access_token } = req.headers
    

    if (!access_token) {
      throw { name: "Unauthorized", message: "Invalid Token"}
    }

    const data = verifyTokens(access_token)
    const user = await User.findByPk(data.id)
    if (!user) {
      throw { name: "Unauthorized", message: "Unauthorized: Access token is required"}
    }
    req.user = {
      id: user.id,
      email: user.email,

    }
    next()
    
  } catch (error) {
    next(error)
  }
}

module.exports = authentication