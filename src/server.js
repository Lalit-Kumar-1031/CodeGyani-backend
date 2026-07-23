const express = require('express');
const dotenv = require('dotenv');
const envConfig = require('./config/envConfig');
const startServer = require('./config/config');
const indexRoutes = require('./routes/index.js');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/', indexRoutes);

// app.use('/', async (req, res) => {
//     return res.send("Server is Working......");
// })


app.listen(envConfig.PORT, async () => {
    await startServer()
    console.log(`Server is running on http://localhost:${envConfig.PORT}`);
})
