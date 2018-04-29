const express = require('express');
//import jwt from 'jsonwebtoken';
const jwt = require('jwt-simple');
const secret = 'jwtuserTokensecret';
const _ = require('underscore');
const companyAccountManager = require('../modules/company/company-account-manager');
const companyJobTypeManager = require('../modules/company/company-jobType-manager');
const companyAdvertisementManager = require('../modules/company/company-advertisement-manager');
let router = express.Router();
const databaseOfflineMode = false;
let companyTokens = [];

function requiresAuthentication(request, response, next) {
    //console.log("["+ new Date()+"][check]: requiresAuthentication");
    //console.log(request.headers);
    if (request.headers.access_token) {
        let token = request.headers.access_token;

        //console.log(token);
        if (_.where(companyTokens, token).length > 0) {
            let decodedToken = jwt.decode(token, secret);
            if (new Date(decodedToken.expires) > new Date()) {
                next();
                return;
            } else {
                removeFromcompanyTokens(token);
                response.status(402).end("Your session is expired");
            }
        }else {
            response.status(401).end("No access token found in the server");
        }
    } else  {
        //response.send(401, "No access token found in the request");
        response.status(401).end("No access token found in the request");
    }
    //response.end(401, "No access token found in the request");

}

function removeFromcompanyTokens(token) {
    for (let counter = 0; counter < companyTokens.length; counter++) {
        if (companyTokens[counter] === token) {
            companyTokens.splice(counter, 1);
            break;
        }
    }
}

/**Company query*/

router.post('/login', function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/company/login");

    const reqCodeMsg = {
        '200': 'result'
        ,'404': '[login]: cant connect to database'
        ,'405': '[login]:  query throw error'
        ,'406': '[login]: bad username'
        ,'407': '[login]: bad passworld'
        ,'408': '[login]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;
    if(!request.body.identifier){	errValues.push("err userName");	}else { counter++; }
    if(!request.body.password){	errValues.push("err password");	}else { counter++; }

    if((counter + errValues.length) === 2){
        if(counter === 2){
            const userName = request.body.identifier;
            const password = request.body.password


            companyAccountManager.authCompany(userName, password, reqCodeMsg, function(e, o){
                if (e === 200) {
                    let expires = new Date();
                    expires.setDate((new Date()).getDate() + 5); //current date +5 days
                    let id = o.ID;
                    let NAME = o.NAME;
                    let token = jwt.encode({
                        id:id,
                        userName: userName,
                        expires: expires,
                        secret2: password
                    }, secret);
                    //console.log(id);
                    companyTokens.push(token);
                    response.status(200).json({ access_token: token, userName: userName, name:NAME });
                }else {
                    if (databaseOfflineMode) {
                        console.log(o);
                        console.log("Cant got data from database, but i send tes data");
                        let expires = new Date();
                        expires.setDate((new Date()).getDate() + 5); //current date +5 days
                        let token = jwt.encode({
                            id: 1,
                            userName: userName,
                            expires: expires,
                            secret2: password
                        }, secret);
                        //console.log(id);
                        companyTokens.push(token);
                        response.status(200).json({access_token: token, userName: userName, name: "Company name"});
                    }else {
                        response.status(e).json(o);
                    }
                }
            });
        } else {
            console.log(request.body);
            //console.log(request);
            response.status(408).send(reqCodeMsg[408]);
        }
    } else {
        //console.log(request);
        console.log(request.body);
        response.status(408).send(reqCodeMsg[408]);
    }
});

router.post('/logout', requiresAuthentication, function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/company/logout");
    const token= request.headers.access_token;
    removeFromcompanyTokens(token);
    response.status(200).send('ok');
});

router.post('/reg', function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/company registration");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[registration]: userName not exist'
        ,'404': '[registration]: cant connect to database'
        ,'405': '[registration]:  query throw error'
        ,'406': '[registration]: userName or email already exist'
        ,'407': '[registration]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.username){	errValues.push("err username");	}else { counter++; }
    if(!request.body.name){	errValues.push("err name");	}else { counter++; }
    if(!request.body.pw){	errValues.push("err pw");	}else { counter++; }
    if(!request.body.email){	errValues.push("err email");	}else { counter++; }
    if(!request.body.tax_number){	errValues.push("err tax_number");	}else { counter++; }
    if(!request.body.city){	errValues.push("err city");	}else { counter++; }
    if(!request.body.fullAddress){	errValues.push("err address");	}else { counter++; }

    if((counter + errValues.length) === 7){
        if(counter === 7){
            const data = {
                username: request.body.username,
                name : request.body.name,
                pw : request.body.pw,
                email: request.body.email,
                tax_number: request.body.tax_number,
                city : request.body.city,
                address:  request.body.fullAddress
             };

            companyAccountManager.authUserEmailAndName(data.username,data.email, reqCodeMsg, function(e, o){
                if (e === 201) {
                    companyAccountManager.regCompany( data, reqCodeMsg, function(e, o){
                        if (e === 200) {
                            response.status(200).send("Sucessfully registrater!");
                        }else {
                            response.status(e).send(o);
                        }
                    });
                }else {
                    response.status(406).send(o);
                }
            });
        }
    }else {
        //console.log(request);
        console.log(request.body);
        response.status(407).send(reqCodeMsg[407]);
    }
});

router.post('/get-company-data', requiresAuthentication,  function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/company/get-company-data");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[get-company-data]: userName not exist'
        ,'404': '[get-company-data]: cant connect to database'
        ,'405': '[get-company-data]:  query throw error'
    };
    const token= request.headers.access_token;
    const decodedToken = jwt.decode(token, secret);
    const company_id = decodedToken.id;
    companyAccountManager.getCompanyData( company_id,  reqCodeMsg, function(e, o){
        if (e === 200) {
            let data = {
                id: decodedToken.id,
                name: o[0],
                username: decodedToken.userName,
                email: o[2],
                tax_number : o[5],
                city: o[4],
                address: o[3],
            };
            response.status(200).send(data);
        }else {
            if (databaseOfflineMode) {
                let data = {
                    id: decodedToken.id,
                    name: "Company kft",
                    username: decodedToken.userName,
                    email: "asd@asd.asd",
                    tax_number : "123123124123",
                    city: " Szeged",
                    address: " Szeged béka u. 34.",
                };
                console.log(o);
                console.log('But sent test data!');
                response.status(200).send(data);
            }else {
                response.status(e).send(o);
            }
        }
    });
});

router.post('/get-job-types', /*requiresAuthentication, */ function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/company/get-job-types");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[get-job-types]: userName not exist'
        ,'404': '[get-job-types]: cant connect to database'
        ,'405': '[get-job-types]:  query throw error'
    };

    companyJobTypeManager.getJobTypes(  reqCodeMsg, function(e, o){
        if (e === 200) {
            //console.log(o)
            response.status(200).send(o);
        }else {
            if (databaseOfflineMode) {
                let data = [ [ 1, 'Informatikai' ],
                    [ 2, 'Fizikai' ],
                    [ 3, 'Irodai' ],
                    [ 4, 'Gyári' ],
                    [ 5, 'Könyvelő' ],
                    [ 6, 'Biológiai' ] ];
                console.log(o);
                console.log('But sent test data!');
                response.status(200).send(data);
            }else {
                response.status(e).send(o);
            }
        }
    });
});

router.post('/new-advertisement', requiresAuthentication, function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/company/new-advertisement");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[new-advertisement]: userName not exist'
        ,'404': '[new-advertisement]: cant connect to database'
        ,'405': '[new-advertisement]:  query throw error'
        ,'407': '[new-advertisement]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.name){	errValues.push("err name");	}else { counter++; }
    if(!request.body.city){	errValues.push("err city");	}else { counter++; }
    if(!request.body.description){	errValues.push("err description");	}else { counter++; }
    if(!request.body.current_job_type){	errValues.push("err current_job_type");	}else { counter++; }
    if(!request.body.payment){	errValues.push("err payment");	}else { counter++; }
    const token= request.headers.access_token;
    const decodedToken = jwt.decode(token, secret);
    const company_id = decodedToken.id;

    if((counter + errValues.length) === 5){
        if(counter === 5){
            const data = {
                company_id:company_id,
                name: request.body.name,
                city : request.body.city,
                description : request.body.description,
                job_type_id: request.body.current_job_type,
                payment: request.body.payment
            };
            console.log(data);
            companyAdvertisementManager.insertNewAdvertisement( data, reqCodeMsg, function(e, o){
                if (e === 200) {
                    response.status(200).send("Sucessfully registrater!");
                }else {
                    response.status(e).send(o);
                }
            });

        }else {
            console.log(request.body);
            response.status(407).send(errValues);

        }
    }else {
        //console.log(request);
        console.log(request.body);
        response.status(407).send(reqCodeMsg[407]);
    }
});

router.post('/get-job-advertisements', requiresAuthentication,  function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/company/get-job-advertisements");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[get-job-advertisements]: userName not exist'
        ,'404': '[get-job-advertisements]: cant connect to database'
        ,'405': '[get-job-advertisements]:  query throw error'
    };
    const token= request.headers.access_token;
    const decodedToken = jwt.decode(token, secret);
    const company_id = decodedToken.id;
    companyAdvertisementManager.getAdvertisementsByCompanyId( company_id, reqCodeMsg, function(e, o){
        if (e === 200) {
            //console.log(o);
            response.status(200).send(o);
        }else {

            if (databaseOfflineMode){
                let data = [
                    [ 5, 8,  'Informatikai','It állás','description value','Szeged','2018-04-27T09:48:33.000Z',0,0 ],
                    [ 3, 8, 'Informatikai', 'name', 'desc', 'city', '2018-04-27T09:12:29.000Z', 0, 1 ],
                    [ 4, 8, 'Informatikai', 'name', 'desc', 'city', '2018-04-27T09:45:54.000Z', 1, 0 ],
                    [ 4, 8, 'Informatikai', 'name', 'desc', 'city', '2018-04-27T09:45:54.000Z', -1, 0 ]
                ];
                console.log(o);
                console.log('But sent test data!');
                response.status(200).send(data);
            } else {
                response.status(e).send(o);
            }
        }
    });
});

router.post('/get-advertisement-by-id', requiresAuthentication, function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/company/get-advertisement-by-id");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[get-advertisement-by-id]: userName not exist'
        ,'404': '[get-advertisement-by-id]: cant connect to database'
        ,'405': '[get-advertisement-by-id]:  query throw error'
        ,'407': '[get-advertisement-by-id]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.advertismenet_id){	errValues.push("err advertismenet_id");	}else { counter++; }
    const token= request.headers.access_token;
    const decodedToken = jwt.decode(token, secret);
    const company_id = decodedToken.id;

    if((counter + errValues.length) === 1){
        if(counter === 1){
            const data = {
                company_id:company_id,
                advertismenet_id: request.body.advertismenet_id
            };
            console.log(data);
            companyAdvertisementManager.getAdvertisementById( data, reqCodeMsg, function(e, o){
                if (e === 200) {
                    response.status(200).send(o);
                }else {
                    if (databaseOfflineMode) {
                        let data = [
                            "hirdetés neve",
                            "hirdetés leírás",
                            "Szeged"
                        ];
                        console.log(o);
                        console.log('But sent test data!');
                        response.status(200).send(data);
                    }else {
                        response.status(e).send(o);
                    }
                }
            });

        }else {
            console.log(request.body);
            response.status(407).send(errValues);

        }
    }else {
        //console.log(request);
        console.log(request.body);
        response.status(407).send(reqCodeMsg[407]);
    }
});

router.post('/update-advertisement-by-id', requiresAuthentication, function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/company/update-advertisement-by-id");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[update-advertisement-by-id]: userName not exist'
        ,'404': '[update-advertisement-by-id]: cant connect to database'
        ,'405': '[update-advertisement-by-id]:  query throw error'
        ,'407': '[update-advertisement-by-id]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.advertismenet_id){	errValues.push("err advertismenet_id");	}else { counter++; }
    if(!request.body.name){	errValues.push("err name");	}else { counter++; }
    if(!request.body.description){	errValues.push("err description");	}else { counter++; }
    if(!request.body.city){	errValues.push("err city");	}else { counter++; }
    if(!request.body.payment){	errValues.push("err payment");	}else { counter++; }
    const token= request.headers.access_token;
    const decodedToken = jwt.decode(token, secret);
    const company_id = decodedToken.id;

    if((counter + errValues.length) === 5){
        if(counter === 5){
            const data = {
                company_id:company_id,
                advertismenet_id: request.body.advertismenet_id,
                name: request.body.name,
                description: request.body.description,
                city: request.body.city,
                payment: request.body.payment
            };
            console.log(data);
            companyAdvertisementManager.updateAdvertisementById( data, reqCodeMsg, function(e, o){
                if (e === 200) {
                    response.status(200).send("Update");
                }else {
                    if (databaseOfflineMode) {
                        let data = ['ok'
                        ];
                        console.log(o);
                        console.log('But sent test data!');
                        response.status(200).send(data);
                    }else {
                        response.status(e).send(o);
                    }
                }
            });

        }else {
            console.log(request.body);
            response.status(407).send(errValues);

        }
    }else {
        //console.log(request);
        console.log(request.body);
        response.status(407).send(reqCodeMsg[407]);
    }
});

router.post('/update-advertisement-archive-row', requiresAuthentication, function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/company/update-advertisement-archive-row");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[update-advertisement-archive-row]: userName not exist'
        ,'404': '[update-advertisement-archive-row]: cant connect to database'
        ,'405': '[update-advertisement-archive-row]:  query throw error'
        ,'407': '[update-advertisement-archive-row]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.advertisement_id){	errValues.push("err advertisement_id");	}else { counter++; }
    if(typeof request.body.archive_status === 'undefined'){	errValues.push("err archive");	}else { counter++; }


    if((counter + errValues.length) === 2){
        if(counter === 2){
            const data = {
                advertisement_id: request.body.advertisement_id,
                archive: request.body.archive_status
            };
            console.log(data);
            companyAdvertisementManager.updateAdvertisementArchiveState( data, reqCodeMsg, function(e, o){
                if (e === 200) {
                    response.status(200).send("Sucessfully registrater!");
                }else {
                    response.status(e).send(o);
                }
            });

        }else {
            console.log(request.body);
            response.status(407).send(errValues);

        }
    }else {
        //console.log(request);
        console.log(request.body);
        response.status(407).send(reqCodeMsg[407]);
    }
});


module.exports = router;