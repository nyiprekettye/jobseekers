const express = require('express');
//import jwt from 'jsonwebtoken';
const jwt = require('jwt-simple');
const secret = 'jwtuserTokensecret';
const _ = require('underscore');
const adminAccountManager = require('../modules/admin/admin-account-manager');
import adminAdvertisementManager from '../modules/admin/admin-advertisement-manager';
import adminPaymentsManager from '../modules/admin/admin-payments-manager';
let router = express.Router();
const databaseOfflineMode = false;
let adminTokens = [];

function requiresAuthentication(request, response, next) {
    //console.log("["+ new Date()+"][check]: requiresAuthentication");
    //console.log(request.headers);
    if (request.headers.access_token) {
        let token = request.headers.access_token;

        //console.log(token);
        if (_.where(adminTokens, token).length > 0) {
            let decodedToken = jwt.decode(token, secret);
            if (new Date(decodedToken.expires) > new Date()) {
                next();
                return;
            } else {
                removeFromadminTokens(token);
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

function removeFromadminTokens(token) {
    for (let counter = 0; counter < adminTokens.length; counter++) {
        if (adminTokens[counter] === token) {
            adminTokens.splice(counter, 1);
            break;
        }
    }
}

/**admin query*/

router.post('/login', function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/admin/login");

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


            adminAccountManager.authAdmin(userName, password, reqCodeMsg, function(e, o){
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
                    adminTokens.push(token);
                    response.status(200).json({ access_token: token, userName: userName, name:NAME });
                }else {
                    response.status(e).json(o);
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
    console.log("["+ new Date()+"][POST]:/api/admin/logout");
    const token= request.headers.access_token;
    removeFromadminTokens(token);
    response.status(200).send('ok');
});

router.post('/get-job-advertisements', requiresAuthentication,  function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/admin/get-job-advertisements");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[get-job-advertisements]: userName not exist'
        ,'404': '[get-job-advertisements]: cant connect to database'
        ,'405': '[get-job-advertisements]:  query throw error'
    };
    const token= request.headers.access_token;
    const decodedToken = jwt.decode(token, secret);
    const admin_id = decodedToken.id;
    adminAdvertisementManager.getAdvertisements( reqCodeMsg, function(e, o){
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
    console.log("["+ new Date()+"][POST]:/api/admin/get-advertisement-by-id");

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


    if((counter + errValues.length) === 1){
        if(counter === 1){
            const data = {
                advertismenet_id: request.body.advertismenet_id
            };
            console.log(data);
            adminAdvertisementManager.getAdvertisementById( data, reqCodeMsg, function(e, o){
                if (e === 200) {
                    response.status(200).send(o);
                }else {
                    if (databaseOfflineMode) {
                        let data = [
                            "hirdetés neve",
                            "hirdetés leírás",
                            "Szeged",
                            "konyvelo"
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

router.post('/update-advertisement-inspected-by-id', requiresAuthentication, function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/admin/update-advertisement-inspected-by-id");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[update-advertisement-inspected-by-id]: userName not exist'
        ,'404': '[update-advertisement-inspected-by-id]: cant connect to database'
        ,'405': '[update-advertisement-inspected-by-id]:  query throw error'
        ,'407': '[update-advertisement-inspected-by-id]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.advertisement_id){	errValues.push("err advertisement_id");	}else { counter++; }
    if(typeof request.body.inspect_state === 'inspect_state'){	errValues.push("err archive");	}else { counter++; }


    if((counter + errValues.length) === 2){
        if(counter === 2){
            const data = {
                advertisement_id: request.body.advertisement_id,
                inspect_state: request.body.inspect_state
            };
            console.log(data);
            adminAdvertisementManager.updateAdvertisementInspectedState( data, reqCodeMsg, function(e, o){
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



router.post('/get-payments-data', requiresAuthentication, function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/admin/get-payments-data");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[get-payments-data]: userName not exist'
        ,'404': '[get-payments-data]: cant connect to database'
        ,'405': '[get-payments-data]:  query throw error'
        ,'407': '[get-payments-data]: didnt get enought parameters'
    };

    adminPaymentsManager.getPaymentsData( {}, reqCodeMsg, function(e, o){
        if (e === 200) {
            response.status(200).send(o);
        }else {
            response.status(e).send(o);
        }
    });
});





module.exports = router;