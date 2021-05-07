const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3jkq8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 5000;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const productsCollection = client.db('emaJhonStore').collection('products');
  const ordersCollection = client.db('emaJhonStore').collection('orders');

  app.post('/addProduct', (req, res) => {
    const products = req.body;
    console.log(products);
    productsCollection.insertOne(products).then((result) => {
      console.log(result);
      res.send(result.insertedCount);
    });
  });

  app.get('/products', (req, res) => {
    const search = req.query.search;
    productsCollection
      .find({ name: { $regex: search } })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });
  app.get('/product/:key', (req, res) => {
    productsCollection
      .find({ key: req.params.key })
      .toArray((err, documents) => {
        res.send(documents[0]);
      });
  });

  app.post('/productByKeys', (req, res) => {
    const productKeys = req.body;
    productsCollection
      .find({ key: { $in: productKeys } })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });

  app.post('/addOrder', (req, res) => {
    const products = req.body;
    console.log(products);
    ordersCollection.insertOne(products).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
