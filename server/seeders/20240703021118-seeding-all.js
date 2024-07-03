'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const Products = require("../Data/Product.json");
    
    await queryInterface.bulkInsert('Products', Products.map(Products => {
      return {
        ...Products,
        createdAt: new Date,
        updatedAt: new Date
      }
     }));

    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
