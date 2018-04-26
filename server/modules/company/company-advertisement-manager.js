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

exports.insertNewAdvertisement = (data,reqCodeMsg, callback) =>{
    if(debug)
        console.log("call insertNewAdvertisement function");
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
                const sql = "SELECT * FROM JOB_TYPE";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [user]
                    , (err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            callback(200, resp);
                        }
                    });
            }
        });
};

exports.getAdvertisementByCompanyId = (companyId,reqCodeMsg, callback) =>{
    if(debug)
        console.log("call getAdvertisementByCompanyId function");
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
                const sql = "SELECT * FROM JOB_ADVERTISEMENT WHERE COMPANY_ID = :companyId";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [companyId]
                    , (err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            callback(200, resp);
                        }
                    });
            }
        });
};
