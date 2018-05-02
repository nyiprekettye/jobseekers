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

exports.getAdvertisementsBySearchText = (data,reqCodeMsg, callback) =>{
    if(debug)
        console.log("call getAdvertisementsBySearchText function");
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
                const sql =  "SELECT JOB_ADVERTISEMENT.ID, " +
                        "JOB_ADVERTISEMENT.NAME, " +
                        "JOB_ADVERTISEMENT.CITY , " +
                        "JOB_ADVERTISEMENT.JOB_GIVE_UP_DATE,"+
                        "COMPANY.NAME, "+
                        "JOB_TYPE.*"+
                    "FROM JOB_ADVERTISEMENT, COMPANY, JOB_TYPE "+
                    "WHERE JOB_ADVERTISEMENT.ADV_INSPECTED LIKE 1 "+
                        "AND JOB_ADVERTISEMENT.ADV_ARCHIVE LIKE 0 "+
                        "AND COMPANY.ID = JOB_ADVERTISEMENT.COMPANY_ID "+
                        "AND JOB_TYPE.ID = JOB_ADVERTISEMENT.JOB_TYPE_ID "+
                        "AND (INSTR(JOB_ADVERTISEMENT.NAME,:q1) > 0 "+
                        "OR INSTR(JOB_ADVERTISEMENT.DESCRIPTION,:q2) > 0)";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                        data.searchText,
                        data.searchText
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


exports.getAdvertisementById = (data,reqCodeMsg, callback) =>{
    if(debug)
        console.log("call getAdvertisementById function");
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
                const sql =  "SELECT JOB_ADVERTISEMENT.ID, " +
                    "JOB_ADVERTISEMENT.NAME, " +
                    "JOB_ADVERTISEMENT.CITY , " +
                    "JOB_ADVERTISEMENT.JOB_GIVE_UP_DATE,"+
                    "JOB_ADVERTISEMENT.DESCRIPTION,"+
                    "COMPANY.NAME, "+
                    "JOB_TYPE.*"+
                    "FROM JOB_ADVERTISEMENT, COMPANY, JOB_TYPE "+
                    "WHERE JOB_ADVERTISEMENT.ADV_INSPECTED LIKE 1 "+
                    "AND JOB_ADVERTISEMENT.ADV_ARCHIVE LIKE 0 "+
                    "AND COMPANY.ID = JOB_ADVERTISEMENT.COMPANY_ID "+
                    "AND JOB_TYPE.ID = JOB_ADVERTISEMENT.JOB_TYPE_ID "+
                    "AND JOB_ADVERTISEMENT.ID = :jobAdvertisementId ";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                        data.jobAdvertisementId
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
