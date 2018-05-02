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


exports.getTaggedJobTypes = (jobseeker_id, reqCodeMsg, callback) =>{
    if (debug)
        console.log('Called getTaggedJobTypes function');
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
                const sql = "SELECT JOBSEEKERS_JOB_TYPE.ID, JOB_TYPE.JOB_TYPE_NAME FROM JOB_TYPE, JOBSEEKERS_JOB_TYPE "
               +" WHERE JOB_TYPE.ID = JOBSEEKERS_JOB_TYPE.JOB_TYPE_ID"
                +" AND JOBSEEKERS_JOB_TYPE.JOBSEEKER_ID = :jobseeker_id";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [jobseeker_id]
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

exports.getNotTaggedJobTypes = (jobseeker_id, reqCodeMsg, callback) =>{
    if (debug)
        console.log('Called getNotTaggedJobTypes function');
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
                const sql = "SELECT JOB_TYPE.* FROM JOB_TYPE WHERE \n" +
                    "ID NOT IN (SELECT JOB_TYPE_ID FROM JOBSEEKERS_JOB_TYPE WHERE JOBSEEKERS_JOB_TYPE.JOBSEEKER_ID = :jobseeker_id)";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [jobseeker_id]
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

exports.insertTaggedJobTypes = (data, reqCodeMsg, callback) =>{
    if (debug)
        console.log('Called getNotTaggedJobTypes function');
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
                const sql = "SELECT INSERT_JOBSEEKERS_JOB_TYPE(:jobseekerID, :jobTypeId) FROM DUAL";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [data.jobseeker_id, data.jobTypeId]
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

exports.delTaggedJobTypes = (data, reqCodeMsg, callback) =>{
    if (debug)
        console.log('Called getNotTaggedJobTypes function');
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
                const sql = "SELECT DELETE_JOBSEEKERS_JOB_TYPE( :jobseeker_id, :id) FROM DUAL";
                if(debug)
                    console.log(sql);
                if(debug)
                    console.log(data);
                connection.execute(sql, [data.jobseeker_id, data.jobseekerJobTypeId]
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
