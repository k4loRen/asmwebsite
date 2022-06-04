var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/adhesion', function(req, res, next) {
  res.render('adhesion');
});

module.exports = router;
