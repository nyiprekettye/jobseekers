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

exports.addNewCV = (data, reqCodeMsg, callback) =>{
    if (debug)
        console.log('Called addNewCV function');
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
                const sql = "SELECT INSERT_JOBSEEKERS_CV( :jobseekerId, :name, :language, :content) FROM DUAL";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                    data.jobseekerId,
                    data.name,
                    data.language,
                    data.content
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

exports.getCVsById = (data, reqCodeMsg, callback) =>{
    if (debug)
        console.log('Called getCVsById function');
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
                const sql = "SELECT * FROM JOBSEEKERS_CV WHERE JOBSEEKER_ID = :id";
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

exports.delCVById = (data, reqCodeMsg, callback) =>{
    if (debug)
        console.log('Called delCVById function');
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
                const sql = "SELECT DELETE_JOBSEEKERS_CV(:id) FROM DUAL";
                if(debug)
                    console.log(sql);
                console.log(data)
                connection.execute(sql, [
                    data.cvId
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
