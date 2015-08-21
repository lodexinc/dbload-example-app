var mysql = require('mysql');
var async   = require('async');


function mysqlConn() {
  var connection = mysql.createConnection({
    host     : 'demo.strongloop.com',
    user     : 'demo',
    password : 'L00pBack',
    database : 'apm'
  });
  return connection;
}

var connection = mysqlConn();       // init mysql
function doMySQL(result, callback) { // for waterfall
  connection.fakeWait = Math.round(Math.random() * 50) + 50;
  connection.query('SELECT * from loadtest', function(err, rows, fields) {
    if (err) throw err;
    console.log('The MySQL solution is: ', rows);
    callback(err, rows);
  });
}

function mysqlOperations(res){
  var x = 0;
  x += 1;
  doMySQL(123, function aboutToSendResponse(err, result){
    var t = parseInt(new Date().getTime()/1000);
    var r = (t%360) * 2*Math.PI/360;

    var now = Date.now();
    while ( (Date.now() - now) < 100 );

    setTimeout(function sendResponse() {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Hello World ' + x);
//    }, parseInt(200 + Math.sin(r) * 50));
    }, 100);
  });
}

module.exports.mysqlOperations = mysqlOperations;
module.exports.mysqlConn = mysqlConn;
