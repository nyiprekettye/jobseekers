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

exports.getApplyJob = (data, reqCodeMsg, callback) =>{
    if (debug)
        console.log('Called getApplyJob function');
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
                const sql = "SELECT * FROM JOBSEEKERS_APPLY_JOB WHERE JOBSEEKER_ID = :jobseeker_id " +
                    "AND JOB_ADVERTISEMENT_ID = :jobADvertisementId";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                    data.jobseeker_id,
                    data.jobAdvertisementID
                    ]
                    , (err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            callback(200, resp.rows);
                        }
                    });
            }
        });
};

exports.insertNewApplyJob = (data, reqCodeMsg, callback) =>{
    if (debug)
        console.log('Called insertNewApplyJob function');
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
                const sql = "SELECT INSERT_JOBSEEKERS_APPLY_JOB(:jobseeker_id, :jobADvertisementId) FROM DUAL";
                if(debug)
                    console.log(sql);
                if(debug)
                    console.log(data);
                connection.execute(sql, [
                    data.jobseeker_id,
                    data.jobAdvertisementId
                    ]
                    , (err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            callback(200, resp.rows);
                        }
                    });
            }
        });
};

exports.delApplyJob = (data, reqCodeMsg, callback) =>{
    if (debug)
        console.log('Called delApplyJob function');
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
                const sql = "SELECT DELETE_JOBSEEKERS_APPLY_JOB(:id) FROM DUAL";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                    data.applyJobId
                    ]
                    , (err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            callback(200, resp.rows);
                        }
                    });
            }
        });
};
