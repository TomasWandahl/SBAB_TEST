require('dotenv').config();
const { traficLabData } = require('../controllers/traficLabController.js');
const express = require('express');
var cors = require('cors')

const PORT = process.env.PORT_NUMBER || 1337;

const app = express();
app.use(cors());

app.get(`/api/trafic`, (req, res) => {
        try {
                traficLabData().then(lines => res.json({statuscode: 200, lines}));
        } catch (error) {
                res.json({statuscode: 500, error});
        }
})

app.listen(PORT, () => {
        console.log('Server is currently listening on port: ' + PORT);
})