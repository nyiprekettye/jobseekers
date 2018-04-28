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
                const sql = "SELECT JOB_ADVERTISEMENT_INSERT_FUNC(" +
                    ":q_company_id, :q_job_type_id, :q_name, :q_desc, :q_city" +
                    ") from dual";
                if(debug)
                    console.log(sql);
                if(debug)
                    console.log(data);
                connection.execute(sql, [
                        data.company_id,
                        data.job_type_id,
                        data.name,
                        data.description,
                        data.city
                    ]
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
                const sql =  "SELECT JOB_ADVERTISEMENT.ID, JOB_ADVERTISEMENT.COMPANY_ID,JOB_TYPE.JOB_TYPE_NAME,JOB_ADVERTISEMENT.NAME,JOB_ADVERTISEMENT.DESCRIPTION,JOB_ADVERTISEMENT.CITY,JOB_ADVERTISEMENT.JOB_GIVE_UP_DATE,JOB_ADVERTISEMENT.INSPECTED,JOB_ADVERTISEMENT.ARCHIVE FROM JOB_ADVERTISEMENT, JOB_TYPE WHERE COMPANY_ID = :companyId AND JOB_TYPE.ID = JOB_ADVERTISEMENT.JOB_TYPE_ID";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [companyId]
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


exports.getAdvertisementByCompanyId = (data,reqCodeMsg, callback) =>{
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
                const sql =  "JOB_ADVERTISEMENT.NAME,JOB_ADVERTISEMENT.DESCRIPTION,JOB_ADVERTISEMENT.CITY " +
                    "FROM JOB_ADVERTISEMENT " +
                    "WHERE COMPANY_ID =:companyId AND ID = :id";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [data.companyId, data.advertismenet_id, advert]
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

exports.updateAdvertisementArchiveState = (data,reqCodeMsg, callback) =>{
    if(debug)
        console.log("call updateAdvertisementArchiveState function");
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
                const sql =  'SELECT SET ARCHIVE = :archive FROM JOB_ADVERTISEMENT WHERE ID = :id';
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                        data.archive,
                        data.advertisement_id
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

exports.updateAdvertisementById = (data,reqCodeMsg, callback) =>{
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
                const sql =  'SELECT SET ' +
                    'ARCHIVE = 0, ' +
                    'INSPECTED = 0, ' +
                    'NAME = :name ' +
                    'DESCRIPTION = :description ' +
                    'CITY = :city ' +
                    ' JOB_ADVERTISEMENT WHERE ID = :id AND COMPANY_ID = :c_id';
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                        data.name,
                        data.description,
                        data.city,
                        data.advertismenet_id,
                        data.company_id
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

