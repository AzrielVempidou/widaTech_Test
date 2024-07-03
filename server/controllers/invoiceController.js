const { Invoice, Product,InvoiceCard } = require('../models');
const { Op } = require('sequelize');

module.exports = class InvoiceController {
  static async postInvoice(req, res, next) {
    try {
     // Ambil data dari request body
     const { date, customerName, notes, products } = req.body;
      
     // Ambil ID karyawan dari user yang sedang login
     const employeeId = req.user.id;

     // Inisialisasi totalAmountPaid
     let totalAmountPaid = 0;

     // Buat invoice baru
     const newInvoice = await Invoice.create({
       date,
       customerName,
       employeeId,
       notes,
       totalAmountPaid: 0 // Placeholder, akan diupdate nanti
     });

     // Tambahkan produk ke invoice
     if (products && products.length > 0) {
       for (const product of products) {
         // Cek apakah produk sudah ada di database
         let existingProduct = await Product.findOne({
           where: { id: product.productId }
         });

         // Jika produk belum ada, buat produk baru
         if (!existingProduct) {
           existingProduct = await Product.create({
             id: product.productId,
             name: product.name,
             picture: product.picture,
             stock: product.stock,
             price: product.price
           });
         }

         // Tambahkan produk ke invoice card
         await InvoiceCard.create({
           invoiceId: newInvoice.id,
           productId: existingProduct.id,
           quantity: product.quantity,
           price: product.price
         });

         // Tambahkan harga produk ke totalAmountPaid
         totalAmountPaid += product.quantity * product.price;
       }
     }

     // Update invoice dengan totalAmountPaid yang telah dihitung
     await newInvoice.update({ totalAmountPaid });

     res.status(201).json(newInvoice);
    } catch (error) {
      // Tangani error dengan melewatkan ke middleware error handler
      next(error);
    }
  }
  static async getAllInvoices(req,res,next){
    const { page = 1, limit = 10, interval } = req.query;

  try {
    let invoices;
    let count;
    let whereClause = {};

    // Menentukan rentang waktu berdasarkan interval yang diberikan
    if (interval === 'daily') {
      whereClause.createdAt = {
        [Op.between]: [
          new Date(new Date().setHours(0, 0, 0, 0)),
          new Date(new Date().setHours(23, 59, 59, 999))
        ]
      };
    } else if (interval === 'weekly') {
      let startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Mulai dari awal minggu ini
      startOfWeek.setHours(0, 0, 0, 0);

      let endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Sampai akhir minggu ini
      endOfWeek.setHours(23, 59, 59, 999);

      whereClause.createdAt = {
        [Op.between]: [startOfWeek, endOfWeek]
      };
    } else if (interval === 'monthly') {
      let startOfMonth = new Date();
      startOfMonth.setDate(1); // Mulai dari awal bulan ini
      startOfMonth.setHours(0, 0, 0, 0);

      let endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(startOfMonth.getMonth() + 1); // Sampai akhir bulan ini
      endOfMonth.setDate(0); // Terakhir hari bulan sebelumnya
      endOfMonth.setHours(23, 59, 59, 999);

      whereClause.createdAt = {
        [Op.between]: [startOfMonth, endOfMonth]
      };
    }

    // Query untuk mengambil data invoices berdasarkan rentang waktu yang ditentukan
    invoices = await Invoice.findAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: (page - 1) * limit
    });

    count = await Invoice.count({
      where: whereClause
    });

    res.json({
      invoices,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    next(error);
  }
  }
  static async deleteInvoice(req,res,next){
    try {
      const { id } = req.params;
      const invoice = await Invoice.findByPk(id);
  
      if (!invoice) {
        return res.status(404).json({ message: 'Invoice not found' });
      }
  
      // Hapus invoice
      await invoice.destroy();
  
      res.json({ message: 'Invoice deleted successfully' });
    } catch (err) {
      next(err)
    }
  }
};
