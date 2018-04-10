

process.env['PATH'] = 'C:\Users\nyipr\Downloads\instantclient-basic-windows.x64-12.2.0.1.0\instantclient_12_2;' + process.env['PATH'];
var oracledb = require('oracledb');

oracledb.getConnection(
  {
    user          : "",
    password      : "",
    connectString : "localhost:4000/kabinet"
  },
  function(err, connection) {
    if (err) { 	
		console.error("Err 1 van:"); 
		console.error(err.message); 
		console.error(connection); 
		return; 
	}
	console.log("Nincs err a kapcsolodasban");

   

    connection.close(
      function(err) {
        if (err) { 			
			console.error("Err 2 van:"); 
			console.error(err.message); 
		}
      });
  });
