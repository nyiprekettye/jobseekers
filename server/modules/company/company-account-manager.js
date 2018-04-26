const oracledb = require('oracledb');
const dbConfig = require('../oracle-connection-config');
const debug = false;

function doRelease(connection) {
    connection.close(
        (err) => {
            if (err)
                console.error(err.message);
        });
}

exports.authCompany = (user, pass, reqCodeMsg, callback) =>{
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
                console.log("Sikeres kapcsolodas");
                const sql = "SELECT ID, USERNAME, PASSWORD, NAME FROM COMPANY WHERE USERNAME = :name";
                //console.log(sql);
                connection.execute(sql, [user]
                    , (err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            if (resp.rows.length > 0) { // found jobseekers with this name
                                if (resp.rows[0][2] === pass) { // the passworld is correct
                                    console.log(resp.rows[0][0]);
                                    callback(200, {'ID': resp.rows[0][0], 'NAME': resp.rows[0][3]});

                                } else {// the passworld doesnt match
                                    callback(407, reqCodeMsg[407]);
                                }
                            } else { // doenst found jobseekers with this name
                                callback(406, reqCodeMsg[406]);
                            }
                        }
                    });
            }
        });
};

exports.authUserEmailAndName = (username, email, reqCodeMsg, callback) =>{
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
                const sql = "SELECT * FROM COMPANY WHERE USERNAME LIKE :name OR EMAIL LIKE :email";
                if (debug)
                    console.log(sql);
                connection.execute(sql, [username, email]
                    , (err, resp) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            if (debug)
                                console.log(resp.rows);
                            if (resp.rows.length > 0) { // found jobseekers with this name
                                callback(406, reqCodeMsg[406]);
                            } else { // doenst found jobseekers with this name
                                callback(201, reqCodeMsg[201]);
                            }
                        }
                    });
            }
        });
};

exports.regCompany = (data, reqCodeMsg, callback) =>{
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
                const sql = 'select COMPANY_INSERT_FUNC(' +
                    ':uname,:pw,:name,:email, :tax,:city,:address' +
                    ') from dual';
                if (debug)
                    console.log(sql);
                connection.execute(sql, [
                        data.username,
                        data.pw,
                        data.name,
                        data.email,
                        data.tax_number,
                        data.city,
                        data.address
                    ]
                    , (err, rows) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            if (debug)
                                console.log(rows['rows'][0][0]);
                            callback(200, reqCodeMsg[200]);
                        }
                    });
            }
        });
};


exports.getCompanyData = (company_id, reqCodeMsg, callback) =>{
    oracledb.getConnection(
        {
            user          : dbConfig.user,
            password      : dbConfig.password,
            connectString : dbConfig.connectString
        },
        (err, connection) => {
            if (err) {
                console.error(err);
                callback(404, reqCodeMsg[404]);
            } else {
                const sql = 'SELECT NAME, USERNAME, EMAIL, ADDRESS, ADDRESS_CITY, TAX_NUMBER ' +
                    'FROM COMPANY WHERE ID = :company_id';
                if (debug)
                    console.log(sql);
                connection.execute(sql, company_id
                    , (err, rows) => {
                        doRelease(connection);
                        if (err) {
                            console.error(err);
                            callback(405, reqCodeMsg[405]);
                        } else {
                            if (debug)
                                console.log(rows);
                            callback(200, rows);
                        }
                    });
            }
        });
};







