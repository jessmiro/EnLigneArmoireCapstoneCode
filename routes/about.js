const express = require('express'); 
const app = express(); 
const path = require('path'); 
const router = express.Router(); 

// Setup essential routes 
router.get('/', function(req, res) { 
  res.render('about');
    //res.sendFile(path.join(__dirname + '/index.html')); 
     //__dirname : It will resolve to your project folder. 
}); 

module.exports = router;