const { Op } = require("sequelize");
const { Invoice } = require("../models"); // Assuming you have an Invoice model defined in models directory

const calculateRevenue = async (req, res) => {
  const { page = 1, limit = 10, interval } = req.query;

  try {
    let invoices;
    let count;
    let whereClause = {};

    // Menentukan rentang waktu berdasarkan interval yang diberikan
    if (interval === "daily") {
      whereClause.createdAt = {
        [Op.between]: [
          new Date(new Date().setHours(0, 0, 0, 0)),
          new Date(new Date().setHours(23, 59, 59, 999)),
        ],
      };
    } else if (interval === "weekly") {
      let startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Mulai dari awal minggu ini
      startOfWeek.setHours(0, 0, 0, 0);

      let endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // Sampai akhir minggu ini
      endOfWeek.setHours(23, 59, 59, 999);

      whereClause.createdAt = {
        [Op.between]: [startOfWeek, endOfWeek],
      };
    } else if (interval === "monthly") {
      let startOfMonth = new Date();
      startOfMonth.setDate(1); // Mulai dari awal bulan ini
      startOfMonth.setHours(0, 0, 0, 0);

      let endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(startOfMonth.getMonth() + 1); // Sampai akhir bulan ini
      endOfMonth.setDate(0); // Terakhir hari bulan sebelumnya
      endOfMonth.setHours(23, 59, 59, 999);

      whereClause.createdAt = {
        [Op.between]: [startOfMonth, endOfMonth],
      };
    }

    // Query untuk mengambil data invoices berdasarkan rentang waktu yang ditentukan
    invoices = await Invoice.findAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    });

    count = await Invoice.count({
      where: whereClause,
    });

    // Menghitung total revenue dari invoices yang didapat
    const totalRevenue = invoices.reduce(
      (acc, invoice) => acc + invoice.totalAmountPaid,
      0
    );

    res.json({
      invoices,
      revenues: totalRevenue,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { calculateRevenue };
