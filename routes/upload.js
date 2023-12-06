var express = require('express');
const router = express.Router();
var multer = require('multer');
var multerS3 = require('multer-s3');
const db = require('../db');
//var bodyParser = require('body-parser');

//var app = express();

//app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config(); 

var AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


const s3 = new AWS.S3();
const myBucket = 'closetimages';

// this deals with the image uploading to multer
var upload = multer({
    storage: multerS3({
        s3:s3,
        bucket: myBucket,
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function(req, file, cb){
            cb(null, file.originalname); // we keep the original name
        }
    })
});

// here we render the upload page
router.get("/", (req, res, next) =>{
    res.render("upload", {action:'add'}); //d
});

// now we get the user inputted info to put into our database
// upload.single("file") is uploading the image using multer
router.post("/", upload.single("file"), (req, res) => {
    //console.log(req.file);
    //res.setEncoding("uploaded successfully !");
    //res.write("Uploaded successfully !");
    var userID = 100000;
    // clothingID is a random 6 digit number
    var clothingID = Math.floor(100000 + Math.random() * 900000);
    var link = req.file.location;
    var title = req.body.title;
    var brand = req.body.brand;
    var desc = req.body.description;
    var size = req.body.size;
    // type, sizing, gender, color, selling, buying, and measurements all have corresponding answers in a table in the db
    var s_size = Number(req.body.special_size);
    var c_type = Number(req.body.clothing_type);

    var gender = Number(req.body.gender);
    var color = Number(req.body.color);
    var selling = Number(req.body.selling);
    var buying = Number(req.body.buying);

    var bust = Number(req.body.bust);
    var waist = Number(req.body.waist);
    var hip = Number(req.body.hip);
    var len = Number(req.body.len);
    var arm_opening = Number(req.body.arm_opening);
    var leg_opening = Number(req.body.leg_opening);
    var inseam = Number(req.body.inseam);

    var tag = req.body.tag;

    // I kept having issues with getting the correct information for subtype
    // so I had to make separate sections in the ejs file 
    // and receive all of them. They're either undefined, 0, or have the correct value
    var temp5 = Number(req.body.clothing_subtype5);
    var temp4 = Number(req.body.clothing_subtype4);
    var temp3 = Number(req.body.clothing_subtype3);
    var temp2 = Number(req.body.clothing_subtype2);
    var temp1 = Number(req.body.clothing_subtype1);

    var c_subtype = 41;
    var say = "test";

    //console.log("temp5, 4, 3, 2, 1: ", temp5, temp4, temp3, temp2, temp1);

    // so we have to go through one by one to check if it's empty and assign it to a variable
    if(Number.isNaN(temp5)){ //|| temp5 !== 0){//(temp5 !== NaN || temp5 !== 0 || temp5 !== undefined || temp5 !== " "){
        say = "temp5";
        temp5 = 0;
        c_subtype = temp5;
    }
    else if(Number.isNaN(temp4)){//temp4 !== NaN || temp4 !== 0 || temp5 !== undefined){
        say = "temp4";
        temp4 = 0;
        c_subtype = temp4;
    }
    else if(Number.isNaN(temp3)){//(temp3 !== NaN || temp3 !== 0 || temp5 !== undefined){
        say = "temp3";
        temp3 = 0;
        c_subtype = temp3;
    }
    else if(Number.isNaN(temp2)){//(temp2 !== NaN || temp2 !== 0 || temp5 !== undefined){
        say = "temp2";
        temp2 = 0;
        c_subtype = temp2;
    }
    //if(temp5 != "NaN"){
    else{
        say = "temp1";
        temp1 = 0;
        c_subtype = temp1;
    }

    // and then we just take the max because everything is now 0 or another number
    c_subtype = Math.max(temp1, temp2, temp3, temp4, temp5);

    //console.log("temp5, 4, 3, 2, 1, subtype, + say: ", temp5, temp4, temp3, temp2, temp1, c_subtype, say);
    //VALUES ("${userID}", "${clothingID}", "${link}", "${title}", "${brand}", "${desc}", "${size}", "${c_type}", "${c_subtype}", "${color}", "${s_size}", "${gender}", "${selling}", "${buying}")
    //VALUES ("${userID}", "${clothingID}", "${bust}", "${waist}", "${hip}", "${len}", "${arm_opening}", "${leg_opening}", "${inseam}")

    // we're inserting into the clothing, tag, and measurement table.
    var sql1 = `INSERT INTO clothing (userID, clothingID, image_link, title, brand, description, size, typeNo, subtypeNo, colorNo, specialSizingNo, genderNo, selling, buying) VALUES ("${userID}", "${clothingID}", "${link}", "${title}", "${brand}", "${desc}", "${size}", "${c_type}", "${c_subtype}", "${color}", "${s_size}", "${gender}", "${selling}", "${buying}"); `;
    var sql2 = `INSERT INTO tag_system (userID, clothingID, tag) VALUES ("${userID}", "${clothingID}", "${tag}"); `;
    var sql3 = `INSERT INTO measurements (userID, clothingID, bust, waist, hip, length, arm_opening, leg_opening, inseam) VALUES ("${userID}", "${clothingID}", "${bust}", "${waist}", "${hip}", "${len}", "${arm_opening}", "${leg_opening}", "${inseam}");`;

    db.query(sql1+sql2+sql3, function(error, data){
        if(error){
            throw error;
        }
        else{
            //if(buying == 1){
              //  res.redirect('/buying-item/:clothingID');
            //}
            //res.send("Uploaded successfully"); // + req.file.location);
            res.redirect(`/view-closet/view-item/${clothingID}`);

        }
    });
});

// now we get all of the information we posted in /  to edit it
router.get("/edit/:clothingID", (req, res, next) => {
     //d
     var id = req.params.clothingID;

    // res.render("edit_item");
     var q = `SELECT * FROM clothing WHERE clothingID = "${id}"; `;
     var q2 = `SELECT * FROM measurements WHERE clothingID = "${id}"; `;
     var q3 = `SELECT * FROM tag_system WHERE clothingID = "${id}"; `;

     var quer = `SELECT c.userID, c.clothingID, image_link, title, brand, description, size, typeNo, subtypeNo, colorNo, specialSizingNo, genderNo, selling, buying, tag, bust, 
     waist, hip, length, arm_opening, leg_opening, inseam FROM clothing c, tag_system t, measurements m WHERE c.clothingID = "${id}" AND c.clothingID = t.clothingID AND t.clothingID = m.clothingID; `;

    db.query(quer, function(error, data){
        if (error){
            throw error;
        }
        //console.log(data[0].subtypeNo);
        res.render("edit_item", {action:'edit', data:data[0]});
    });



});

// this is uncommented as it's the exact same as post, except it has pre-inserted values (from the database)
// also I don't allow for images to be changed, just for simplicity  and the fact that I store using 
// the original name, which would cause issues if the original name existed in the storage
router.post("/edit/:clothingID", (req, res, next) =>{
    var userID = 100000;
    var clothingID = req.params.clothingID; //Math.floor(100000 + Math.random() * 900000);
    var link = req.body.img_link; //req.file.location;
    var title = req.body.title;
    //console.log(title);
    var brand = req.body.brand;
    var desc = req.body.description;
    var size = req.body.size;
    var s_size = Number(req.body.special_size);
    var c_type = Number(req.body.clothing_type);
    //var c_subtype = Number(req.body.clothing_subtype);
    var gender = Number(req.body.gender);
    var color = Number(req.body.color);
    var selling = Number(req.body.selling);
    var buying = Number(req.body.buying);

    var bust = Number(req.body.bust);
    var waist = Number(req.body.waist);
    var hip = Number(req.body.hip);
    var len = Number(req.body.len);
    var arm_opening = Number(req.body.arm_opening);
    var leg_opening = Number(req.body.leg_opening);
    var inseam = Number(req.body.inseam);

    var tag = req.body.tag;

    var temp5 = Number(req.body.clothing_subtype5);
    var temp4 = Number(req.body.clothing_subtype4);
    var temp3 = Number(req.body.clothing_subtype3);
    var temp2 = Number(req.body.clothing_subtype2);
    var temp1 = Number(req.body.clothing_subtype1);

    var c_subtype = 41;
    var say = "test";

    //console.log("temp5, 4, 3, 2, 1: ", temp5, temp4, temp3, temp2, temp1);

    if(Number.isNaN(temp5)){ //|| temp5 !== 0){//(temp5 !== NaN || temp5 !== 0 || temp5 !== undefined || temp5 !== " "){
        say = "temp5";
        temp5 = 0;
        c_subtype = temp5;
    }
    else if(Number.isNaN(temp4)){//temp4 !== NaN || temp4 !== 0 || temp5 !== undefined){
        say = "temp4";
        temp4 = 0;
        c_subtype = temp4;
    }
    else if(Number.isNaN(temp3)){//(temp3 !== NaN || temp3 !== 0 || temp5 !== undefined){
        say = "temp3";
        temp3 = 0;
        c_subtype = temp3;
    }
    else if(Number.isNaN(temp2)){//(temp2 !== NaN || temp2 !== 0 || temp5 !== undefined){
        say = "temp2";
        temp2 = 0;
        c_subtype = temp2;
    }
    //if(temp5 != "NaN"){
    else{
        say = "temp1";
        temp1 = 0;
        c_subtype = temp1;
    }

    //c_subtype = Math.max(temp1, temp2, temp3, temp4, temp5);

    console.log("Here's subtype number: " + c_subtype);

    //console.log("temp5, 4, 3, 2, 1, subtype, + say: ", temp5, temp4, temp3, temp2, temp1, c_subtype, say);
    //VALUES ("${userID}", "${clothingID}", "${link}", "${title}", "${brand}", "${desc}", "${size}", "${c_type}", "${c_subtype}", "${color}", "${s_size}", "${gender}", "${selling}", "${buying}")
    //VALUES ("${userID}", "${clothingID}", "${bust}", "${waist}", "${hip}", "${len}", "${arm_opening}", "${leg_opening}", "${inseam}")


    //var sql1 = `INSERT INTO clothing (userID, clothingID, image_link, title, brand, description, size, typeNo, subtypeNo, colorNo, specialSizingNo, genderNo, selling, buying) 
    //VALUES ("${userID}", "${clothingID}", "${link}", "${title}", "${brand}", "${desc}", "${size}", "${c_type}", "${c_subtype}", 
    //"${color}", "${s_size}", "${gender}", "${selling}", "${buying}"); `;
    
    var squer1 = `UPDATE clothing SET image_link = "${link}", 
    title = "${title}", brand = "${brand}", description = "${desc}", size = "${size}", typeNo = "${c_type}", subtypeNo = "${c_subtype}", 
    colorNo = "${color}", specialSizingNo = "${s_size}", genderNo = "${gender}", selling = "${selling}", buying = "${buying}" 
    WHERE clothingID = "${clothingID}"; `;
    
    //var sql2 = `INSERT INTO tag_system (userID, clothingID, tag) VALUES ("${userID}", "${clothingID}", "${tag}"); `;

    var squer2 = `UPDATE tag_system SET tag = "${tag}" WHERE clothingID = "${clothingID}"; `;

    //var sql3 = `INSERT INTO measurements (userID, clothingID, bust, waist, hip, length, arm_opening, leg_opening, inseam) 
    //VALUES ("${userID}", "${clothingID}", "${bust}", "${waist}", "${hip}", "${len}", "${arm_opening}", "${leg_opening}", "${inseam}");`;

    var squer3 = ` UPDATE measurements SET bust = "${bust}", waist = "${waist}", hip = "${hip}", length = "${len}", 
    arm_opening = "${arm_opening}", leg_opening = "${leg_opening}", inseam = "${inseam}" WHERE clothingID = "${clothingID}"; `;

    db.query(squer1+squer2+squer3, function(error, data){
        if(error){
            throw error;
        }
        else{
            //res.send("Updated successfully"); // + req.file.location);
            res.redirect(`/view-closet/view-item/${clothingID}`);
            

        }
    });
});

// here we're deleting the clothing ID
router.get("/delete/:clothingID", (req, res, next) => {
    var clothingID = req.params.clothingID;

    // we have to delete from tag, measurements, and then clothing
    // since tag and measurements both depend on clothing
    q1 = `DELETE FROM tag_system WHERE clothingID = "${clothingID}"; `;
    q2 = `DELETE FROM measurements WHERE clothingID = "${clothingID}"; `;
    q3 = `DELETE FROM clothing WHERE clothingID = "${clothingID}"; `;


    db.query(q1+q2+q3, function(error, data){
        if (error) throw error;
        //res.send("Deleted");
        res.redirect(`/view-closet`);
    })
    
    
});

// here we pull some basic information to display for add buying information
router.get("/add-buying/:clothingID", (req, res, next) => {
    const productId = req.params.clothingID;
    const sql = `SELECT clothingID, image_link, title FROM clothing WHERE buying='1' AND clothingID="${productId}"`;
    db.query(sql, (err, data) => {
      if (err) throw err; 
      res.render('add-buying', {data : data[0] });
});
});

// we post some additional info for the buying table
router.post("/add-buying/:clothingID", (req, res, next) => {
    const userID = 100000;
    // user inputs
    const clothingID = req.params.clothingID;
    const link = req.body.prodLink;
    const dateNotif = req.body.date;
    // inserting into the database
    const sql = `Insert INTO buying (userID, clothingID, link, dateNotif) VALUES ("${userID}", "${clothingID}", "${link}", "${dateNotif}"); `;

    db.query(sql, (err, data) => {
      if (err) throw err; 
      res.redirect("/buying-item");
});
});

// deleting from buying - we need to do this first before deleting the item overall
// since the buying table depends on the clothing table
router.get("/delete-buying/:clothingID", (req, res, next) => {
    var clothingID = req.params.clothingID;

    q = `DELETE FROM buying WHERE clothingID = "${clothingID}"; `;
    db.query(q, function(error, data){
        if (error) throw error;
        //res.send("Deleted");
        res.redirect(`/buying-item`);
    });
});

module.exports = router;