const oracledb = require('oracledb');
const dbConfig = require('../oracle-connection-config');
const debug = false;

function doRelease(connection) {
    connection.close(
        (err) => {
            if (err)
                console.error(err.message);
        });
}

exports.authJobseekers = (user, pass, reqCodeMsg, callback) =>{
    console.log("meghivva");
    oracledb.getConnection(
        {
            user          : dbConfig.user,
            password      : dbConfig.password,
            connectString : dbConfig.connectString
        },
        (err, connection) => {
            if (err) {
                console.error(err);
                callback(404, reqCodeMsg[404]);
            } else {
                console.log("Connection:");
                console.log(connection);
                console.log("Err:");
                console.log(err);
                console.log("Sikeres kapcsolodas");
                const sql = "SELECT ID, NAME, PASSWORD FROM JOBSEEKERS WHERE NAME = :name";
                console.log(sql);
                connection.execute(sql, [user]
                    , (err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            console.log("sikeres lekérdezés");
                            console.log(resp.rows[0]);
                            if (resp.rows.length > 0) { // found jobseekers with this name
                                if (resp.rows[0][2] === pass) { // the passworld is correct
                                    console.log(resp.rows[0][0]);
                                    callback(200, resp.rows[0][0]);

                                } else {// the passworld doesnt match
                                    callback(407, reqCodeMsg[407]);
                                }
                            } else { // doenst found jobseekers with this name
                                callback(406, reqCodeMsg[406]);
                            }
                        }
                    });
            }
        });
};

exports.authUserEmailAndName = (username, email, reqCodeMsg, callback) =>{
    oracledb.getConnection(
        {
            user          : dbConfig.user,
            password      : dbConfig.password,
            connectString : dbConfig.connectString
        },
        (err, connection) => {
            if (err) {
                console.error(err);
                callback(404,reqCodeMsg[404]);
            } else {
                const sql = "SELECT * FROM JOBSEEKERS WHERE NAME LIKE :name OR EMAIL LIKE :email";
                if (debug)
                    console.log(sql);
                connection.execute(sql, [username, email]
                    , (err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            if (debug)
                                console.log("SUCCESFUL QUERY");
                            if (debug)
                                console.log(resp.rows);
                            if (resp.rows.length > 0) { // found jobseekers with this name
                                callback(406, reqCodeMsg[406]);
                            } else { // doenst found jobseekers with this name
                                callback(201, reqCodeMsg[201]);
                            }
                        }
                    });
            }
        });
};



exports.regJobseeker = (name, pw, email,city, reqCodeMsg, callback) =>{
    oracledb.getConnection(
        {
            user          : dbConfig.user,
            password      : dbConfig.password,
            connectString : dbConfig.connectString
        },
        (err, connection) => {
            if (err) {
                console.error(err);
                callback(404,reqCodeMsg[404]);
            } else {


                const sql = `select JOBSEEKERS_INSERT_FUNC(:name, :email, :pw, :city) from dual`;
                if (debug)
                    console.log(sql);
                connection.execute(sql, [name, email, pw, city]
                    , (err, rows) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            if (debug)
                                console.log(rows['rows'][0][0]);
                            callback(200, reqCodeMsg[200]);
                        }
                    });
            }
        });
};

/*
exports.authUserName = function(uname, reqCodeMsg, callback) {
    accuntPool.getConnection(function (err, conn) {
        if (err) {
            callback(404,reqCodeMsg[404]);
        } else {
            conn.query("SELECT USERNAME FROM `jobseekers` WHERE `USERNAME` = ?",uname, function(err, rows) {
                conn.release();	 //close database connection
                if (err) { // something wrong with the query
                    callback(405,reqCodeMsg[405]);
                }else {
                    if (rows.length > 0){ // found jobseekers with this name
                        callback(408,reqCodeMsg[408]);

                    }else { // doenst found jobseekers with this name
                        callback(201,reqCodeMsg[201]);
                    }
                }
            });
        }
    });
};

exports.regUser = function(fname, lname, uname, regpass, email, phonenumber, subscribe, all_headers, activation_code,
                           reqCodeMsg, callback){
    accuntPool.getConnection(function (err, conn) {
        if (err) {
            callback(404,reqCodeMsg[404]);
        } else {
            //let activation_code = ( new Date() + "_" + uname + "_" + Math.random())
            // .replace(/[ `~!@#$%^&*()|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/[öÖüÜóÓőŐúÚéÉáÁűŰíÍ]/gi, '');
            let reg_datatime = new Date();
            let sql="INSERT INTO `jobseekers` (`ID`, `USERNAME`, `EMAIL`, `PASSWORD`, `SALT`, `FNAME`, `LNAME`, `ACTIVE`," +
                " `ACTIVATION_CODE`, `SUBSCRIBE`, `PHONE_NUMBER`, `REG_DATATIME`, `REG_ALL_HEADER`)" +
                " VALUES (NULL, ?, ?, ?, 'salt', ?, ?, '0', ?, ?, ?, ?, 'all_headers');";
            conn.query(sql, [uname, email, regpass, fname, lname,
                activation_code, subscribe.value, phonenumber, reg_datatime], function(err, rows) {
                conn.release();	 //close database connection
                if (err) { // something wrong with the query
                    callback(405,reqCodeMsg[405]);
                }else {

                    callback(200,reqCodeMsg[200]);
                    //console.log('feliratkozott '+subscribe.value+'tel:'+phonenumber);
                    //console.log("ALL HEADER KIIRATVA:" + all_headers);
                }
            });
        }
    });
};

exports.getUserAllData = function(uname, reqCodeMsg, callback){
    accuntPool.getConnection(function (err, conn) {
        if (err){	// error get connection from pool
            callback(404,reqCodeMsg[404]);
        } else {
            conn.query("SELECT `USERNAME`,`EMAIL`,`FNAME`,`LNAME`,`ACTIVE`,`PHONE_NUMBER`,`REG_DATATIME`" +
                " FROM `jobseekers` WHERE `USERNAME`= ?",[uname] ,function(err, rows) {
                conn.release();	 //close database connection
                if (err) { // something wrong with the query
                    //console.log(err);
                    callback(405,reqCodeMsg[405]);
                }else {
                    callback(200,rows);
                }
            });
        }
    });
};

exports.saveUserDataByUsername = function(fname, lname, uname, email, phonenumber, reqCodeMsg, callback){
    accuntPool.getConnection(function (err, conn) {
        if (err){	// error get connection from pool
            callback(404,reqCodeMsg[404]);
        } else {
            let sql ="UPDATE `jobseekers` SET `EMAIL`= ?, `FNAME`= ?,`LNAME`= ?,`PHONE_NUMBER`= ? WHERE `USERNAME` = ?";
            conn.query(sql,[email, fname, lname, phonenumber, uname] ,function(err, rows) {
                conn.release();	 //close database connection
                if (err) { // something wrong with the query
                    console.log(err);
                    callback(405,reqCodeMsg[405]);
                }else {
                    callback(200,reqCodeMsg[200]);
                }
            });
        }
    });
};

exports.saveUserPwByUsername = function(uname, pw, reqCodeMsg, callback){
    accuntPool.getConnection(function (err, conn) {
        if (err){	// error get connection from pool
            callback(404,reqCodeMsg[404]);
        } else {
            let sql ="UPDATE `jobseekers` SET `PASSWORD`= ? WHERE `USERNAME` = ?";
            conn.query(sql,[pw, uname] ,function(err, rows) {
                conn.release();	 //close database connection
                if (err) { // something wrong with the query
                    console.log(err);
                    callback(405,reqCodeMsg[405]);
                }else {
                    callback(200,reqCodeMsg[200]);
                }
            });
        }
    });
};

exports.getUserAllAddresses = function(id, reqCodeMsg, callback){
    accuntPool.getConnection(function (err, conn) {
        if (err){	// error get connection from pool
            callback(404,reqCodeMsg[404]);
        } else {
            conn.query("SELECT POSTCODE,CITY,ADDRESS FROM `address` WHERE `USER_ID`= ?",[id] ,function(err, rows) {
                conn.release();	 //close database connection
                if (err) { // something wrong with the query
                    //console.log(err);
                    callback(405,reqCodeMsg[405]);
                }else {
                    callback(200,rows);
                }
            });
        }
    });
};

exports.saveNewAddress = function(id, postcode, city, address, reqCodeMsg, callback){
    accuntPool.getConnection(function (err, conn) {
        if (err){	// error get connection from pool
            callback(404,reqCodeMsg[404]);
        } else {
            let sql ="INSERT INTO `address` (`ID`, `USER_ID`, `POSTCODE`, `CITY`, `ADDRESS`)" +
                " VALUES (NULL, ?, ?, ?,?);";
            conn.query(sql,[id, postcode, city, address] ,function(err, rows) {
                conn.release();	 //close database connection
                if (err) { // something wrong with the query
                    console.log(err);
                    callback(405,reqCodeMsg[405]);
                }else {
                    callback(200,reqCodeMsg[200]);
                }
            });
        }
    });
};

exports.activationUser = function(username, activation_code, reqCodeMsg, callback){
    accuntPool.getConnection(function (err, conn) {
        if (err){	// error get connection from pool
            callback(404,reqCodeMsg[404]);
        } else {
            let sql ="UPDATE `jobseekers` SET `ACTIVE` = '1' WHERE `USERNAME` = ? AND `ACTIVATION_CODE` = ? ;";
            conn.query(sql,[username, activation_code] ,function(err, rows) {
                conn.release();	 //close database connection
                console.log(rows);
                if (err) { // something wrong with the query
                    console.log(err);
                    callback(405,reqCodeMsg[405]);
                }else {
                    console.log('registration requiest');
                    console.log(rows);
                    if(Number(rows["changedRows"])=== 1){
                        callback(200,reqCodeMsg[200]);
                    }else {
                        console.log(rows);
                        callback(407,reqCodeMsg[407]);
                    }
                }
            });
        }
    });
};


exports.delAccount = function(USER_ID,  reqCodeMsg, callback){
    accuntPool.getConnection(function (err, conn) {
        if (err){	// error get connection from pool
            callback(404,reqCodeMsg[404]);
        } else {
            let sql ="SELECT del_user_with_user_id(?);";
            conn.query(sql,[USER_ID] ,function(err, rows) {
                conn.release();	 //close database connection
                if (err) { // something wrong with the query
                    console.log(err);
                    callback(405,reqCodeMsg[405]);
                }else {
                    callback(200,reqCodeMsg[200]);
                }
            });
        }
    });
};

*/