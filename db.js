var mysql = require('mysql');
var fs = require('fs');

require('dotenv').config(); 

// Creating a connection between my database and azure
var con = mysql.createConnection({
  host: process.env.AZURE_SECRET_HOST,
  user: process.env.AZURE_SECRET_USERNAME,
  password: process.env.AZURE_SECRET_PASSWORD,
  database: process.env.AZURE_SECRET_DB,
  multipleStatements: true,
  ssl : {
    ca : fs.readFileSync(__dirname + '/DigiCertGlobalRootCA.crt.pem'),
    rejectUnauthorized: false
}
});

/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  }); 
}); */

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //con.query("SELECT * FROM CLOTHING", function (err, result, fields) {
    //if (err) throw err;
    //console.log("Result: " + result);
   // console.log(result);
 // });
});

module.exports = con;