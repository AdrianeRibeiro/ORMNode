'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Matriculas', 'deletedAt', {
      allowNull: true,
      type: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Matriculas', 'deletedAt')
  }
};