const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nwazm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const textCollection = client.db("to-do").collection("text");

    
        app.get('/text', async (req, res) => {
            const query = {};
            const cursor = textCollection.find(query);
            const texts = await cursor.toArray();
            res.send(texts);
        });


        app.post('/text', async (req, res) => {
            const newText = req.body;
            console.log('adding new task', newText);
            const result = await userCollection.insertOne(newText);
            res.send(result)
        });

    }
    finally {

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('running my to-do server');
});

app.listen(port, () => {
    console.log('to+do server is running');
});