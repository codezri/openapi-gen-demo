const fs = require('fs');
const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
const port = 8080;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'OpenAPI demo',
            version: '1.0.0',
        },
        servers: [{
            url: 'http://localhost:8080'
        }]
    },
    apis: ['main.js'],
    format: '.yaml'
};

const apiSpec = swaggerJsdoc(options);
fs.writeFileSync('openapi.yaml', apiSpec);

app.use(express.json());
app.use(cors());


let products = [
    { id: 1, name: 'Book' }
];

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Product identifier.
 *           example: 1
 *         name:
 *           type: string
 *           description: Product name.
 *           example: MacBook Pro
 */

/**
 * @openapi
 * /products:
 *   get:
 *     description: Lists all products
 *     responses:
 *       200:
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/products', (req, res) => {
    const { name } = req.body;
    console.log(name);
    const latestProduct = products.reduce((prev, cur) => cur.id > prev.id ? cur : prev);
    const id = latestProduct ? latestProduct.id + 1 : 1;
    products.push({ id, name });
    res.json(products);
});

app.get('/products/:productId', (req, res) => {
    const product = products.find((product) => product.id === parseInt(req.params.productId));
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
});

app.delete('/products/:productId', (req, res) => {
    const productId = products.findIndex((product) => product.id === parseInt(req.params.productId));
    if (productId == -1) {
        return res.status(404).json({ error: 'Product not found' });
    }
    products.splice(productId);
    res.end();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})