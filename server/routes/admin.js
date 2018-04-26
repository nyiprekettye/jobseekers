const express = require('express');
//import jwt from 'jsonwebtoken';
const jwt = require('jwt-simple');
const secret = 'jwtuserTokensecret';
const _ = require('underscore');
const adminAccountManager = require('../modules/admin/admin-account-manager');
let router = express.Router();

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


module.exports = router;