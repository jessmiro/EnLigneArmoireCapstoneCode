const express = require('express');

const router = express.Router();

const db = require('../db'); 

// gets all items from query
router.get('/', (req, res) =>{
    const sql = `SELECT c.clothingID, c.image_link, c.title, b.link FROM clothing c, buying b WHERE c.clothingID = b.clothingID`;
    db.query(sql, (err, data) => {
      if (err) throw err; 
      res.render('buying-item', {displayItem : data });
      //res.render('view-closet.ejs', {title: 'Viewing Closet'});
    });
  }); 

  module.exports = router; 