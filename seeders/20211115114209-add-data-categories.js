"use strict";
<<<<<<< HEAD

const category = require("../models/category");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("categories", [
      { category: "Photography", createdAt: new Date(), updatedAt: new Date() },
      { category: "Design", createdAt: new Date(), updatedAt: new Date() },
      { category: "Development", createdAt: new Date(), updatedAt: new Date() },
      { category: "Marketing", createdAt: new Date(), updatedAt: new Date() },
      { category: "Business", createdAt: new Date(), updatedAt: new Date() },
      { category: "Lifestyle", createdAt: new Date(), updatedAt: new Date() },
      { category: "Music", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("events", null, {});
  },
};
// "use strict";
=======
>>>>>>> 0c6afeeef8658b26c5e27b641516f4057de5b67a

const category = require("../models/category");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("categories", [
      { category: "Photography", createdAt: new Date(), updatedAt: new Date() },
      { category: "Design", createdAt: new Date(), updatedAt: new Date() },
      { category: "Development", createdAt: new Date(), updatedAt: new Date() },
      { category: "Marketing", createdAt: new Date(), updatedAt: new Date() },
      { category: "Business", createdAt: new Date(), updatedAt: new Date() },
      { category: "Lifestyle", createdAt: new Date(), updatedAt: new Date() },
      { category: "Music", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
