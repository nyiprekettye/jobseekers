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

exports.insertCompanyRating = (data, reqCodeMsg, callback) =>{
    if (debug)
        console.log('Called insertCompanyRating function');
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
                const sql = "SELECT DEL_ABOVE_AND_INS_COMP_RATING(:jobseeker_id,:company_id,:rating) FROM DUAL";
                if(debug)
                    console.log(sql);
                connection.execute(sql, [
                        data.jobseekerId,
                        data.companyId,
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
