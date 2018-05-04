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

exports.getCompanyById = (data,reqCodeMsg, callback) =>{
    if(debug)
        console.log("call getCompanyById function");
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
                const sql =  "SELECT ID, " +
                    "NAME, " +
                    "TAX_NUMBER , " +
                    "ADDRESS_CITY,"+
                    "ADDRESS "+
                    "FROM COMPANY "+
                    "WHERE ID = :id ";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                        data.companyId
                    ]
                    , (err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            // console.log(resp);
                            callback(200, resp.rows[0]);
                        }
                    });
            }
        });
};


exports.getCompanyRatingById = (data,reqCodeMsg, callback) =>{
    if(debug)
        console.log("call getCompanyById function");
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
                const sql =  "SELECT ROUND(AVG(RATING),1) FROM COMPANY_RATING WHERE COMPANY_ID = :id";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                        data.companyId
                    ]
                    , (err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            // console.log(resp);
                            callback(200, resp.rows);
                        }
                    });
            }
        });
};

