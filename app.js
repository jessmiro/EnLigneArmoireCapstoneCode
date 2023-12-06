var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');
const fileUpload = require('express-fileupload')
var formidable = require('formidable');
const fs = require('fs');





//var mysql = require('mysql');
var db = require('./db');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//added this
var viewClosetRouter = require('./routes/view-closet');
//var addItemRouter = require('./routes/add-item');
//var addItemRouter = require('./routes/add-item');
var uploadRouter = require('./routes/upload');
var aboutRouter = require('./routes/about');
var sellRouter = require('./routes/sell-item');
var createOutfitRouter = require('./routes/create-outfit');
var viewOutfitsRouter = require('./routes/view-outfits');
var viewBuyRouter = require('./routes/buying-item');
//var editRouter = require('./routes/upload/edit.:clothingID');
//var viewItemRouter = require('./routes/view-item')

var app = express();
const router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(fileUpload);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// added this - works
app.use('/view-closet', viewClosetRouter);
// just added
//app.use('/add-item', addItemRouter);
app.use('/upload', uploadRouter);
app.use('/about', aboutRouter);
app.use('/sell-item', sellRouter);
app.use('/create-outfit', createOutfitRouter);
app.use('/view-outfits', viewOutfitsRouter);
app.use('/buying-item', viewBuyRouter);
//app.use('/edit_item', editRouter);
//app.use('/view-closet/view-item/:id', viewClosetRouter);
app.get('/view-closet/view-item/:clothingID', (req, res) =>{
  const productId = req.params.clothingID;

  //console.log(productId);

  //var quer = ` SELECT c.clothingID, c.title, c.image_link, t.tag FROM clothing c, tag_system t WHERE c.clothingID = "${productId}" AND c.clothingID = t.clothingID; `

  var quer = `SELECT c.clothingID, image_link, c.title, brand, description, size, tag, bust, waist, hip, length, arm_opening, leg_opening, inseam, subtype, type, gender, color, special_sizing 
  FROM clothing c, tag_system t, measurements m, subtype s, type ty, gender g, color co, special_sizing sp 
  WHERE c.clothingID = "${productId}" AND c.clothingID = t.clothingID AND c.clothingID = m.clothingID AND c.subtypeNo = s.subtypeNo 
  AND c.typeNo = ty.typeNo AND c.genderNo = g.genderNo AND c.colorNo = co.colorNo AND c.specialSizingNo = sp.special_sizingNo; `;
  
  //console.log(data[0]);

  db.query(quer, function(error, results) {
    if (error) throw error;
    data = results[0];
    //console.log(data.subtype);
    res.render('view-item', {data:data});//{singleItem: data});
  });

  /*db.query('SELECT * FROM clothing WHERE clothingID = ?', [productId], function (err, results, fields) {
    if (err) throw err;
    data = results[0];
    res.render('view-item', {singleItem: data});
    });*/
}); 

// PLS WORK OMG
/*app.get('/add-item', function (req, res){
  //res.sendFile(__dirname + '/views/add-item.ejs');
  res.render('add-item');
}); */

/*app.post("/add-item", (req, res) => {
  //const form = formidable();
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    // your form fields will be found inside 'fields' variable
    // your form files will be inside files variable
    //const form = formidable();
    const form = new formidable.IncomingForm();

form.parse(req, async (err, fields, files) => {
  if (err) {
    return res.status(400).json({
      status: "Failure",
      msg: "Some error occured " + err.message,
    });
  }
  let oldPath = files.nameOfTheField.path;
  res.send("hit old path");
  let newPath = `imageHold/${files.nameOfTheField.name}`;
  fs.rename(oldPath, newPath, (err) => {
    if (err) {
      return res.status(400).json({
        status: "Failure",
        msg: "Failed to upload file. " + err.message,
      });
    }
    res.status(201).json({
      status: "Success", 
      msg: "File uploaded successfully"
    });
  });
});
  });
});
*/

//fs did not work
/*app.post('/add-item', (req, res, next) => {
 
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {

      let oldPath = files.profilePic.filepath;
      let newPath = path.join(__dirname, 'imageHold')
          + '/' + files.profilePic.name
      let rawData = fs.readFileSync(oldPath)

      fs.writeFile(newPath, rawData, function (err) {
          if (err) console.log(err)
          return res.send("Successfully uploaded")
      })
  })
}); */

/*app.post('/add-item', function (req, res){
  var form = new formidable.IncomingForm();

  form.parse(req);

  form.on('fileBegin', function (name, file){
      file.path = __dirname + '/imageHold/' + file.name;
  });

  form.on('file', function (name, file){
      console.log('Uploaded ' + file.name);
  });

  //res.sendFile(__dirname + '/views/add-item.ejs');
}); */

/*app.use(fileUpload);
app.post('/add-item', (req, res) => {
	if (!req.files) {
		return res.status(400).send('No files were uploaded.')
	}

	let sampleFile = req.files.sampleFile
	let uploadPath = __dirname + '/imageHold/' + sampleFile.name

    sampleFile.mv(uploadPath, function (err) {
		if (err) {
			return res.status(500).send(err)
		}
    });

}); */

/*app.post('/add-item', upload.single('file'), (req, res) => {
  // Handle the uploaded file
  res.json({ message: 'File uploaded successfully!' });
});*/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
