var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
    request('https://yesno.wtf/api', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            const answer = data.answer;
            let imageUrl = '';
            if (answer === 'yes') {
                imageUrl = 'https://yesno.wtf/assets/yes/10-271c872c91cd72c1e38e72d2f8eda676.gif';
            } else if (answer === 'no') {
                imageUrl = 'https://yesno.wtf/assets/no/2-101be1e3d8a0ed407c4e3c001ef8fa66.gif';
            }
            res.json({ answer: answer, image: imageUrl });
        } else {
            console.error('Error fetching data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});

module.exports = router;
