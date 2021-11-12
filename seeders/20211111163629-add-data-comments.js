"use strict";
const faker = require("faker");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("comments", [
      {
        comment: faker.lorem.words(),
        userId: 1,
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 2,
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 2,
        eventId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 1,
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 2,
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 1,
        eventId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 1,
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 2,
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 2,
        eventId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 1,
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 2,
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 1,
        eventId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 1,
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 2,
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 2,
        eventId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 1,
        eventId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 2,
        eventId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        comment: faker.lorem.words(),
        userId: 1,
        eventId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
