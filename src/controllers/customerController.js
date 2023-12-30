// Controller object to manage CRUD operations for the 'customer' entity
const controller = {};

// Handles the retrieval of all customer records from the database and renders the 'customers' view
controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.json(err);
            return;
        }

        // Fetch all records from the 'customer' table
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                console.error(err);
                res.json(err);
                return;
            }

            // Render the 'customers' view with the retrieved data
            res.render('customers', {
                data: customers
            });
        });
    });
};

// Handles the insertion of a new customer record into the database
controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.send('Error during connection');
            return;
        }

        // Insert the provided data into the 'customer' table
        conn.query('INSERT INTO customer SET ?', [data], (err, result) => {
            if (err) {
                console.error(err);
                res.send('Error during insertion');
                return;
            }

            // Log the inserted record's ID and redirect to the home page
            console.log('Inserted ID:', result.insertId);
            res.redirect('/');
        });
    });
};

// Handles the retrieval of a specific customer record for editing
controller.edit = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        // Fetch the customer record with the specified ID
        conn.query('SELECT * FROM customer WHERE id =  ?', [id], (err, customer) => {
            // Render the 'customer_edit' view with the retrieved data
            res.render('customer_edit', {
                data: customer
            });
        });
    });
};

// Handles the deletion of a specific customer record from the database
controller.delete = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        // Delete the customer record with the specified ID from the 'customer' table
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, customer) => {
            // Redirect to the home page after deletion
            res.redirect('/');
        });
    });
};

// Exports the controller object for use in other modules
module.exports = controller;
