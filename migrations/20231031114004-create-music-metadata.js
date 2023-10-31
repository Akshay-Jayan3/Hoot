'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MusicMetadata', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      artist: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      album: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        type: Sequelize.DATE,
        // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MusicMetadata');
  },
};

