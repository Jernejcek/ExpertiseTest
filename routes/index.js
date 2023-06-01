var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ping', function(req, res) {
  try {
    return res.status(200).json({ message: 'Connectivity test successful!' });
  } catch (err) {
    return res.status(500).json({ message: 'Error during connectivity test', error: err });
  }
});

module.exports = router;
