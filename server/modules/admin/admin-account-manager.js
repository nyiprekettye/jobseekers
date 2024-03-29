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

exports.authAdmin = (user, pass, reqCodeMsg, callback) =>{
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
                console.log("Sikeres kapcsolodas");
                const sql = "SELECT ID, USERNAME, PASSWORD FROM JOBSEEKERS_ADMIN WHERE USERNAME = :name";
                //console.log(sql);
                connection.execute(sql, [user]
                    ,(err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
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