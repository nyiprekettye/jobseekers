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

exports.getAdvertisementsByCompanyId = (companyId,reqCodeMsg, callback) =>{
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
                const sql =  "SELECT JOB_ADVERTISEMENT.ID, " +
                    "JOB_ADVERTISEMENT.COMPANY_ID," +
                    "JOB_TYPE.JOB_TYPE_NAME," +
                    "JOB_ADVERTISEMENT.NAME," +
                    "JOB_ADVERTISEMENT.DESCRIPTION," +
                    "JOB_ADVERTISEMENT.CITY," +
                    "JOB_ADVERTISEMENT.JOB_GIVE_UP_DATE," +
                    "JOB_ADVERTISEMENT.ADV_INSPECTED," +
                    "JOB_ADVERTISEMENT.ADV_ARCHIVE " +
                    "FROM JOB_ADVERTISEMENT, JOB_TYPE WHERE COMPANY_ID = :companyId AND JOB_TYPE.ID = JOB_ADVERTISEMENT.JOB_TYPE_ID";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [companyId]
                    , (err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            //console.log(resp);
                            //console.log(resp.rows);
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
                const sql =  "SELECT NAME, DESCRIPTION, CITY " +
                    "FROM JOB_ADVERTISEMENT " +
                    "WHERE COMPANY_ID =:companyId AND ID = :id";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                        data.company_id,
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
                const sql =  'SELECT UPDATE_ADVERTISEMENT_ARCHIVE(:id,:archive) FROM dual';
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                        data.advertisement_id,
                        data.archive
                    ]
                    , (err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            console.log(resp.rows);
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
                const sql =  'SELECT UPDATE_ADVERTISEMENT_DATAS(:a_id, :a_com_id,:a_name,:a_desc,:a_city) from DUAL';
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                        parseInt(data.advertismenet_id),
                        parseInt(data.company_id),
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
                            callback(200, resp.rows);
                        }
                    });
            }
        });
};

