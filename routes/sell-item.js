const express = require('express');

const router = express.Router();

const db = require('../db'); 

// just getting the query info and sending it to the ejs file
router.get('/', (req, res) =>{
    const sql = `SELECT clothingID, image_link, title, size FROM clothing WHERE selling='1'`;
    db.query(sql, (err, data) => {
      if (err) throw err; 
      res.render('sell-item', {displayItem : data });
    });
  }); 

  module.exports = router; 