const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

router.get('/', (req, res) =>{
    res.render('index');
});


router.get('/get_started', (req, res) =>{
    const apiKey = process.env.API_KEY;

    res.render('get_started', { apiKey });
});



module.exports = router;