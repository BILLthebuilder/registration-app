const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const Sequelize = require('sequelize');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

//Prevent page caching so that logout works well
app.use((req, res, next) => { res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private'); next() })

// Passport Config
require('./config/passport')(passport);


//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
