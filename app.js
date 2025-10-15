import express from 'express';
import connectDB from './config/connect.js';
import router from './routers/router.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

// connect to DB
connectDB();

app.use(express.json());

app.use('/api', router);

app.get("/", (req, res) => {
  res.send("allow all pages")
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

