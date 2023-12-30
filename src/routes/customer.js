// Importing the Express framework
const express = require('express');
// Creating a router instance
const router = express.Router();
// Importing the customerController for handling customer-related routes
const customerController = require('../controllers/customerController');

// Defining routes for customer operations

// Route: GET /
// Description: Displays a list of customers
router.get('/', customerController.list);

// Route: POST /add
// Description: Saves a new customer
router.post('/add', customerController.save);

// Route: GET /delete/:id
// Description: Deletes a customer with the specified ID
router.get('/delete/:id', customerController.delete);

// Route: GET /update/:id
// Description: Displays the form to edit a customer with the specified ID
router.get('/update/:id', customerController.edit);

// Exporting the router for use in the main application
module.exports = router;
