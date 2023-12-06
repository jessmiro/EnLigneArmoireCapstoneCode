var express = require('express');
const router = express.Router();
const db = require('../db');

// get item from query
router.get("/", (req, res) =>{
    const sql = `SELECT c.clothingID, c.image_link FROM clothing c; `;
     
    //const sql2 = `SELECT COUNT(outfitID) as count_outfits FROM outfit; `
    
    db.query(sql, (err, data) => {
        if (err) throw err; 
        res.render('create-outfit', {displayItem : data });
        //res.render('view-closet.ejs', {title: 'Viewing Closet'});
      });
});

// we add the outfit
router.post("/", (req, res) => {
    var userID = 100000;
    var clothingID = req.body.clothingOutfitID;

    var answer = req.body.addOutfit;
    // outfit ID is a random 6 digit number
    var outfitID = Math.floor(100000 + Math.random() * 900000);
    // but if we answered that we're using a pre existing outfit, then we get the outfitID that was entered
    if(answer == 1){
        outfitID = req.body.outfitID;
    }

    // user inputted info 
    var title = req.body.outfitTitle;
    var description = req.body.description;

    var tag = req.body.tag;

    // we're adding the outfit and the tag for the outfit
    const q1 = `INSERT INTO outfit (userID, clothingID, outfitID, title, description) VALUES ("${userID}", "${clothingID}", "${outfitID}", "${title}", "${description}"); `
    const q2 = `INSERT INTO outfits_tag_system (userID, outfitID, tag) VALUES ("${userID}", "${outfitID}", "${tag}"); `

    db.query(q1+q2, function(error, data){
        if(error){
            throw error;
        }
        else{
            // and redirect to the view outfit page
            res.redirect("/view-outfits");
        }
    });
});



module.exports = router; 