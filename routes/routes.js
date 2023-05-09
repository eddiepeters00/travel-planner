const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('index');
});


router.get('/get_started', (req, res) =>{
    res.render('get_started');
});



module.exports = router;