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

exports.getAdvertisements = (reqCodeMsg, callback) =>{
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
                const sql =  "SELECT * FROM JOB_ADVERTISEMENT " ;
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

exports.getAdvertisementById = (data,reqCodeMsg, callback) =>{
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
                const sql =  "SELECT JOB_ADVERTISEMENT.NAME, " +
                    "JOB_ADVERTISEMENT.DESCRIPTION, " +
                    "JOB_ADVERTISEMENT.CITY, " +
                    "JOB_TYPE.JOB_TYPE_NAME " +
                    "FROM JOB_ADVERTISEMENT, JOB_TYPE " +
                    "WHERE JOB_ADVERTISEMENT.JOB_TYPE_ID = JOB_TYPE.ID " +
                    "AND JOB_ADVERTISEMENT.ID = :id";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                        data.advertismenet_id
                    ]
                    , (err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            console.log(resp);
                            callback(200, resp.rows[0]);
                        }
                    });
            }
        });
};


exports.updateAdvertisementInspectedState = (data,reqCodeMsg, callback) =>{
    if(debug)
        console.log("call updateAdvertisementInspectedState function");
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
                const sql =  `SELECT UPDATE_ADVERTISEMENT_INSPECTED(:id, :inspect_state) FROM DUAL`;
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                        data.advertisement_id,
                        data.inspect_state
                    ]
                    , (err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            console.log(resp);
                            callback(200, resp.rows[0]);
                        }
                    });
            }
        });
};
