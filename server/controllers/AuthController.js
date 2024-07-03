const { comparePassword } = require('../helper/hash')
const { generateToken } = require('../helper/jwt')
const { User } = require('../models')


module.exports = class AuthController{
  static async register(req, res, next) {
    try {
      const { username, email, password, role } = req.body;
  
      // Mencari pengguna dengan email yang sama secara spesifik
      const existingUser = await User.findOne({ email: email });
  
      if (existingUser) {
        if (existingUser.email === email) {
          return res.status(400).json({
            success: false,
            message: 'Email already exists'
          });
        }
      }
  
      // Membuat pengguna baru jika tidak ada yang sama
      const user = await User.create({
        username,
        email,
        password,
        role
      });
  
      // Mengembalikan respon sukses
      res.status(201).json({
        success: true,
        message: `User with email ${user.email} created successfully`
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async login(req,res, next){
    try {
      const { email, password } = req.body
      if (!email || !password) {
        throw { name: "EmailPasswordRequired"}
      }
  
      const user = await User.findOne({where: { email }})
      console.log(user, "<<User", !comparePassword(password, user.password))
      if (!user || !comparePassword(password, user.password)) {
        throw { name : "InvalidEmailPassword"}
        // return res.status(401).json({ message: "Invalid email/password" })
      }
      // console.log(user.username, "<<");
      // access_token, email/username, role
      const access_token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role
      })
      // console.log(access_token, "<<");
      res.status(200).json({
        "success": true,
        "message": "Login successful",
        "access_token": access_token
      })
    } catch (error) {
      console.log(error);
      next(error)
      // res.status(500).json({ message: "Internal Server Error"})
    }
  }
}