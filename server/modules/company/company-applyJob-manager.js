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

exports.getApplyJobs = (data, reqCodeMsg, callback) =>{
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
                const sql = "SELECT JOBSEEKERS_APPLY_JOB.*, JOBSEEKERS.NAME " +
                    "FROM JOBSEEKERS_APPLY_JOB, JOBSEEKERS " +
                    "WHERE JOB_ADVERTISEMENT_ID = :advertisement_id " +
                    "AND JOBSEEKERS_APPLY_JOB.JOBSEEKER_ID = JOBSEEKERS.ID";
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
                            callback(200, resp.rows);
                        }
                    });
            }
        });
};

exports.updateApplyJobs = (data, reqCodeMsg, callback) =>{
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
                const sql ="SELECT UPDATE_JOBSEEKERS_APPLY_JOB(:apply_job_id, :state) FROM DUAL";
                if(debug)
                    console.log(sql);
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                        data.applyJobId,
                        data.applyJobState
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




