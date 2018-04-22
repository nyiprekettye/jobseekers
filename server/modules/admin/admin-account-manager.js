const mysql = require('mysql');

const accuntPool = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'test_nodejs',
    connectionLimit : 10,
    multipleStatements : true
});

exports.authAdmin = function(user, pass, reqCodeMsg, callback)
{
    accuntPool.getConnection(function (err, conn) {
        if (err){	// error get connection from pool
            callback(404,reqCodeMsg[404]);
        } else {
            conn.query("SELECT `USERNAME`, `PASSWORD` FROM `admin` WHERE `USERNAME` = ?", user, function(err, rows) {
                conn.release();	 //close database connection
                if (err) { // something wrong with the query
                    //console.log(err);
                    callback(405,reqCodeMsg[405]);
                }else {
                    if (rows.length > 0){ // found jobseekers with this name
                        if (rows[0]['PASSWORD'] === pass){ // the passworld is correct
                            callback(200,rows[0]);
                        }else {// the passworld doesnt match
                            callback(407,reqCodeMsg[407]);
                        }
                    }else { // doenst found jobseekers with this name
                        callback(406,reqCodeMsg[406]);
                    }
                }
            });
        }

    });
};