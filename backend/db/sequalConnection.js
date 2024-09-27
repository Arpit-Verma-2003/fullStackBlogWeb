const { Sequelize } = require('sequelize');
const connection = async () => {
  const sequelize = new Sequelize('blogapp', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres',
  });

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
module.exports = { connection };