const express = require('express')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const AuthController = require('../controllers/AuthController')
const revenueController = require('../controllers/revenueController')
const productController = require('../controllers/productController')
const invoiceRouter = require('./invoiceRouter')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello World!')
})
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.use(authentication)
router.use('/invoice', invoiceRouter)
router.get('/products', productController.getAllProduct)
router.get('/products/search', productController.searchProduct)
router.get('/revenue', revenueController.calculateRevenue )

module.exports = router
