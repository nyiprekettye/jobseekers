const oracledb = require('oracledb');
const dbConfig = require('../oracle-connection-config');
const debug = true;
function doRelease(connection) {
    connection.close(
        (err) => {
            if (err)
                console.error(err.message);
        });
}

exports.getPaymentsData = (data, reqCodeMsg, callback) =>{
    if(debug)
        console.log("call getPaymentsData function");
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
                if(debug)
                    console.log("Successfull create db connection");
                const sql =  "SELECT JOB_TYPE.JOB_TYPE_NAME, MIN(JOB_ADVERTISEMENT.PAYMENT),AVG(JOB_ADVERTISEMENT.PAYMENT),MAX(JOB_ADVERTISEMENT.PAYMENT)\n" +
                    "FROM JOB_ADVERTISEMENT, JOB_TYPE\n" +
                    "WHERE JOB_ADVERTISEMENT.JOB_TYPE_ID = JOB_TYPE.ID\n" +
                    "GROUP BY JOB_ADVERTISEMENT.JOB_TYPE_ID, JOB_TYPE.JOB_TYPE_NAME" ;
                if(debug)
                    console.log(sql);
                connection.execute(sql, []
                    , (err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            console.log(resp);
                            callback(200, resp.rows);
                        }
                    });
            }
        });
};