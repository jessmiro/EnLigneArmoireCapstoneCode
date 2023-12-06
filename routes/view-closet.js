const express = require('express');

const router = express.Router();

const db = require('../db'); 


/*//router.get("/view-closet", function(request, response, next){
    const q = "SELECT image_link, title, size FROM clothing";

    database.query(q, function(error, data){
        if(error){
            throw error;
        }
        else{
            response.render('/view-closet', {title: 'Display item', displayItem: data});
        }
    });
}); */

// changes .get(/view-closet) to .get(/)

// displaying items in closet
router.get('/', (req, res) =>{
    const sql = 'SELECT clothingID, image_link, title, size, buying FROM clothing';
    db.query(sql, (err, data) => {
      if (err) throw err; 
      res.render('view-closet', {title: 'Viewing closet', displayItem : data });
      //res.render('view-closet.ejs', {title: 'Viewing Closet'});
    });
  }); 

  /*router.get('/view-closet/view-item/:clothingID', (req, res) =>{
        //res.send('Testing ! xx');
    const productId = req.params.clothingID;
        //const sql2 = 'SELECT * FROM clothing WHERE clothingID = ?';
    db.query('SELECT * FROM clothing WHERE clothingID = ?', [productId], function (err, results, fields) {
        if (err) throw err;
        data = results[0];
        res.render('view-item', {singleItem: data});
    });
  }); */
  

module.exports = router; 