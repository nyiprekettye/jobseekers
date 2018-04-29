const express = require('express');
//import jwt from 'jsonwebtoken';
const jwt = require('jwt-simple');
const secret = 'jwtuserTokensecret';
const _ = require('underscore');
const JobseekersAccountManager = require('../modules/jobseekers/jobseekers-account-manager');
let router = express.Router();

let userTokens = [];

function requiresAuthentication(request, response, next) {
    //console.log("["+ new Date()+"][check]: requiresAuthentication");
    //console.log(request.headers);
    if (request.headers.access_token) {
        let token = request.headers.access_token;

        //console.log(token);
        if (_.where(userTokens, token).length > 0) {
            let decodedToken = jwt.decode(token, secret);
            if (new Date(decodedToken.expires) > new Date()) {
                next();
                return;
            } else {
                removeFromuserTokens(token);
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

function removeFromuserTokens(token) {
    for (let counter = 0; counter < userTokens.length; counter++) {
        if (userTokens[counter] === token) {
            userTokens.splice(counter, 1);
            break;
        }
    }
}

/**Jobseekers query*/

router.post('/login', function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/jbseekers/login");

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


            /*
            let expires = new Date();
            expires.setDate((new Date()).getDate() + 5); //current date +5 days
            let token = jwt.encode({
                id:2345,
                userName: userName,
                expires: expires,
                secret2: password
            }, secret);

            //console.log(id);
            userTokens.push(token);
            response.status(200).json({ access_token: token, userName: userName });
            */



            JobseekersAccountManager.authJobseekers(userName, password, reqCodeMsg, function(e, o){
                if (e === 200) {
                    let expires = new Date();
                    expires.setDate((new Date()).getDate() + 5); //current date +5 days
                    let id = o;
                    let token = jwt.encode({
                        id:id,
                        userName: userName,
                        expires: expires,
                        secret2: password
                    }, secret);

                    //console.log(id);
                    userTokens.push(token);
                    response.status(200).json({ access_token: token, userName: userName });
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
    console.log("["+ new Date()+"][POST]:/api/jobseekers/logout");
    const token= request.headers.access_token;
    removeFromuserTokens(token);
    response.status(200).send('ok');
});

router.post('/reg', function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/jobseekers registration");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[registration]: userName not exist'
        ,'404': '[registration]: cant connect to database'
        ,'405': '[registration]:  query throw error'
        ,'406': '[registration]: userName or email already exist'
        ,'407': '[login]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.name){	errValues.push("err name");	}else { counter++; }
    if(!request.body.pw){	errValues.push("err pw");	}else { counter++; }
    if(!request.body.email){	errValues.push("err email");	}else { counter++; }
    if(!request.body.city){	errValues.push("err city");	}else { counter++; }
    if(!request.body.birth){	errValues.push("err birth");	}else { counter++; }

    if((counter + errValues.length) === 5){
        if(counter === 5){
            const name = request.body.name;
            const pw = request.body.pw;
            const email = request.body.email;
            const city = request.body.city;
            const birth = request.body.birth;

            JobseekersAccountManager.authUserEmailAndName(name,email, reqCodeMsg, function(e, o){
                if (e === 201) {
                    JobseekersAccountManager.regJobseeker( name, pw, email,city, birth, reqCodeMsg, function(e, o){
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

router.post('/jobseeker-data', requiresAuthentication, function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/jobseekers/user-data");

    const token = request.headers.access_token;
    const decodedToken = jwt.decode(token, secret);

    let data = {
        email:"email",
        username: decodedToken.userName,
        city: "varos",
        birth: "1993"
    };
    response.status(200).send(data);
});


module.exports = router;