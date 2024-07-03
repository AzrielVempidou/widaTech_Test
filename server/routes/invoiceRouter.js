const express = require(`express`)
const invoiceRouter = express.Router()
const InvoiceController = require('../controllers/invoiceController')


invoiceRouter.post('/', InvoiceController.postInvoice)
invoiceRouter.get('/', InvoiceController.getAllInvoices)
invoiceRouter.delete('/:id', InvoiceController.deleteInvoice )
module.exports = invoiceRouter
