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

exports.getJobseekerById = (data, reqCodeMsg, callback) =>{
    if (debug)
        console.log('Called getJobseekerById function');
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
                const sql = "SELECT ID, NAME, EMAIL, CITY FROM JOBSEEKERS WHERE ID = :id";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                        data.jobseekerId
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

exports.getJobseekerRating = (data, reqCodeMsg, callback) =>{
    if (debug)
        console.log('Called getJobseekerRating function');
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
                const sql = "SELECT ROUND(AVG(RATING),1) FROM JOBSEEKERS_RATING WHERE JOBSEEKER_ID = :jobseeker_id";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                        data.jobseekerId
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

exports.insertJobseekerRating = (data, reqCodeMsg, callback) =>{
    if (debug)
        console.log('Called insertJobseekerRating function');
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
                const sql = "SELECT DEL_ABOVE_AND_INS_JOBSE_RATING(:jobseeker_id,:company_id,:rating) FROM DUAL";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                        data.jobseekerId,
                        data.company_id,
                        data.rating
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
