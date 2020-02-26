const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  database: process.env.DB,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: 'postgres'
});


const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATEONLY,

  },
});

// Connect to Database
sequelize
  .authenticate(
    // db,
    // { useNewUrlParser: true }
  )
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err));

User.sync()
  .then(() => console.log('User table created succesfully'))
  .catch(err => console.log('Unable to create the user table'));


//const User = mongoose.model('User', UserSchema);

module.exports = User;

