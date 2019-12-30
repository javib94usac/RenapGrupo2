var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.download(__dirname+'/routes'+req.params.id,
    req.params.id,function(err)
    {
      if(err)
      {
        console.log(err);
      }
    });
});

module.exports = router;