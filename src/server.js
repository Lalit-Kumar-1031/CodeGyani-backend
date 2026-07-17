const express = require('express');
const dotenv = require('dotenv');
const envConfig = require('./config/envConfig');


dotenv.config();

const app = express();

app.use(express.json());

app.use('/', (req, res) => {
    return res.send("Server is Working......");
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${envConfig.PORT}`);
})
