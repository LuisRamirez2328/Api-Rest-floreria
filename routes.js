const express = require('express');
const app = express();
const db = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

app.use(express.json());

const swaggerOption = {
    swaggerDefinition: {
        info: {
            title: 'Floristas Api-rest-full',
            description: 'Api para gestionar el catalogo y pedidos de una floreria',
            version: '1.0.0',
        }
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJSDoc(swaggerOption);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// GET route to fetch all products
app.get('/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});

// POST route to create a new product
app.post('/products', (req, res) => {
    const { name, description, price, stock, image_url } = req.body;
    const query = 'INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, description, price, stock, image_url], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ id: results.insertId });
        }
    });
});

// PUT route to update an existing product
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price, stock, image_url } = req.body;
    const query = 'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, image_url = ? WHERE id = ?';
    db.query(query, [name, description, price, stock, image_url, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({ message: 'Producto actualizado correctamente' });
        }
    });
});

// DELETE route to delete a product
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({ message: 'Producto eliminado correctamente' });
        }
    });
});

app.get('/orders', (req, res) => {
    const query = 'SELECT * FROM orders';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(results);
        }
    });
});


// POST route to create a new order (ya lo tienes)
app.post('/orders', (req, res) => {
    const { product_id, quantity, customer_name, customer_address } = req.body;
    const query = 'INSERT INTO orders (product_id, quantity, customer_name, customer_address) VALUES (?, ?, ?, ?)';
    db.query(query, [product_id, quantity, customer_name, customer_address], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json({ id: results.insertId });
        }
    });
});

// PUT route to update an existing order
app.put('/orders/:id', (req, res) => {
    const { id } = req.params;
    const { product_id, quantity, customer_name, customer_address } = req.body;
    const query = 'UPDATE orders SET product_id = ?, quantity = ?, customer_name = ?, customer_address = ? WHERE id = ?';
    db.query(query, [product_id, quantity, customer_name, customer_address, id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({ message: 'Pedido actualizado correctamente' });
        }
    });
});

// DELETE route to delete an order
app.delete('/orders/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM orders WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({ message: 'Pedido eliminado correctamente' });
        }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
