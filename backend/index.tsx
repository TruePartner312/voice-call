import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';

const app: Application = express()

const server = require("http").createServer(app);
const cors = require("cors");

app.use(cors());
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello World');
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));