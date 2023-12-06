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
// getting information to display in view outfits
router.get('/', (req, res) =>{
    const sql = 'SELECT c.clothingID, c.image_link, o.title, o.outfitID, o.clothingID FROM clothing c, outfit o WHERE c.clothingID = o.clothingID';
    db.query(sql, (err, data) => {
      if (err) throw err; 
      res.render('view-outfits', {displayItem : data });
      //res.render('view-closet.ejs', {title: 'Viewing Closet'});
    });
  }); 

  // delete the outfit because we can't delete an item in the closet unless the outfit is deleted
  router.get("/delete-outfit/:outfitID", (req, res) => {
    var outfitID = req.params.outfitID;

    q1 = `DELETE FROM outfits_tag_system WHERE outfitID = "${outfitID}"; `;
    q2 = `DELETE FROM outfit WHERE outfitID = "${outfitID}"; `;
    db.query(q1+q2, function(error, data){
        if (error) throw error;
        //res.send("Deleted");
        res.redirect(`/view-outfits`);
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