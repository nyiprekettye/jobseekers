

process.env['PATH'] = 'C:\Users\nyipr\Downloads\instantclient-basic-windows.x64-12.2.0.1.0\instantclient_12_2;' + process.env['PATH'];
var oracledb = require('oracledb');
/*
finance =
 (DESCRIPTION =
   (ADDRESS = (PROTOCOL = 'TCP'),(HOST = 'localhost'),(PORT = 1521)),
   (CONNECT_DATA =
     (SID = 'kabinet')
   )
 )
 */
tryConn("localhost",1521,"kabinet")
tryConn("localhost",1521,"XE")
tryConn("127.0.0.1",1521,"kabinet")
tryConn("127.0.0.1",1521,"XE")

function tryConn (host, port, sid) {
	console.log("-------------------------");
	console.log("Try to connect to:"+ host+ ":"+port+"/" +sid);
	console.log("Success?");
	oracledb.getConnection(
	  {
		user         : "hr",
		password      : "welcome",
		connectString : host+":"+port+"/"+sid
	 },
	  function(err, connection) {
		if (err) {
			console.log("NO");
		  console.error(err.message);
		  return;
		}
		console.log("YES");
		connection.execute(
		  `SELECT * FROM employees`,  // bind value for :id
		  function(err, result) {
			if (err) {
			  console.error(err.message);
			  doRelease(connection);
			  return;
			}
			console.log(result.rows);
			doRelease(connection);
		  });
	  });

	function doRelease(connection) {
	  connection.close(
		function(err) {
		  if (err)
			console.error(err.message);
		});
	}
 }