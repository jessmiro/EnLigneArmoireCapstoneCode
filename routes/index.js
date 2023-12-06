/*var express = require('express');
var router = express.Router();

// GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Testing~~' });
});

module.exports = router; */

const express = require('express'); 
const app = express(); 
const path = require('path'); 
const router = express.Router(); 

// Setup essential routes 
router.get('/', function(req, res) { 
  res.render('index', {title: 'PLEASE WORK'});
    //res.sendFile(path.join(__dirname + '/index.html')); 
     //__dirname : It will resolve to your project folder. 
}); 
// add item
// change app to router
/*router.get('/add-item', function(req, res) { 
  ////res.sendFile(path.join(__dirname + '/add-item.html'));  //change ot .html
  //res.render('add-item');
  ////res.render(_dirname + "/views/add-item.ejs");
}); */

// view closet
/* router.get('/view-closet', function(req, res) { 
   res.render('view-closet.ejs');
}); */

// create outfit
/*router.get('/create-outfit', function(req, res) { 
  //res.sendFile(path.join(__dirname + '/create-outfit.html')); 
  res.render('views/create-outfit.ejs');
}); */

//view outfits
/*router.get('/view-outfits', function(req, res) { 
     //res.sendFile(path.join(__dirname + '/view-outfits.html')); 
     res.render('views/view-outfits.ejs');
}); */

// sell item
//router.set('view engine', 'ejs');
/*router.get('/sell-item', function(req, res) { 
  //res.sendFile(path.join(__dirname + '/sell-item.html'));
  res.render('views/sell-item.ejs');
});
*/

//add the router 
//app.use('/', router); 
//app.listen(process.env.port || 3000); 
//console.log('Running at Port 3000'); 

module.exports = router;