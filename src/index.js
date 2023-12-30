// Importing required modules
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

// Importing routes
const customerRoutes = require('./routes/customer');

// Application settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware configuration

// Morgan middleware for logging HTTP requests in development mode
app.use(morgan('dev'));

// Express-myconnection middleware for MySQL database connection management
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'crudnodejsmysql'
}, 'single'));

// Express middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Routes configuration
app.use('/', customerRoutes);

// Static files setup
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});
