'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', { 
      userId: {
        type: Sequelize.UUID,
        references: {
            model: 'users',
            key: 'id',
        },
        primaryKey: true,
      },
      touristPlaceId: {
          type: Sequelize.UUID,
          references: {
              model: 'tourist-places',
              key: 'id',
          },
          primaryKey: true,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews');
  }
};