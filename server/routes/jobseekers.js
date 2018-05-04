const express = require('express');
//import jwt from 'jsonwebtoken';
const jwt = require('jwt-simple');
const secret = 'jwtuserTokensecret';
const _ = require('underscore');
const JobseekersAccountManager = require('../modules/jobseekers/jobseekers-account-manager');
const JobseekersJobTypesManager = require('../modules/jobseekers/jobseekers-jobTypes-mannager');
const JobseekersApplyJobManager = require('../modules/jobseekers/jobseekers-applyJob-manager');
const JobseekersCompanyManager = require('../modules/jobseekers/jobseekers-company-manager');
let router = express.Router();
const databaseOfflineMode = true;
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

router.post('/get-job-types', requiresAuthentication,  function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/jobseekers/get-job-types");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[get-job-types]: userName not exist'
        ,'404': '[get-job-types]: cant connect to database'
        ,'405': '[get-job-types]:  query throw error'
    };
    const token= request.headers.access_token;
    const decodedToken = jwt.decode(token, secret);
    const jobseeker_id = decodedToken.id;

    JobseekersJobTypesManager.getTaggedJobTypes( jobseeker_id, reqCodeMsg, function(e, o){
        if (e === 200) {
            JobseekersJobTypesManager.getNotTaggedJobTypes( jobseeker_id, reqCodeMsg, function(e2, o2){
                if (e2 === 200) {
                    //console.log(o);
                    let data = {
                        taggedJobTypes:o,
                        otherJobTypes:o2
                    };
                    response.status(200).send(data);
                }else {

                    if (databaseOfflineMode){
                        let data = [
                           ];
                        console.log(o2);
                        console.log('But sent test data!');
                        response.status(200).send(data);
                    } else {
                        response.status(e2).send(o2);
                    }
                }
            });
        }else {

            if (databaseOfflineMode){
                let data = {
                    taggedJobTypes:[
                        [1,'valam'],
                        [2,'valam2'],
                        [3,'valam3']
                    ],
                    otherJobTypes:[
                        [4,'valam4'],
                        [5,'valam5'],
                        [6,'valam6']
                    ]
            };
                console.log(o);
                console.log('But sent test data!');
                response.status(200).send(data);
            } else {
                response.status(e).send(o);
            }
        }
    });
});

router.post('/add-new-job-type', requiresAuthentication, function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/jobseekers/add-new-job-type");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[add-new-job-type]: userName not exist'
        ,'404': '[add-new-job-type]: cant connect to database'
        ,'405': '[add-new-job-type]:  query throw error'
        ,'406': '[add-new-job-type]: userName or email already exist'
        ,'407': '[add-new-job-type]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.jobTypeId){errValues.push("err jobTypeId");	}else { counter++; }

    if((counter + errValues.length) === 1){
        if(counter === 1){
            const token= request.headers.access_token;
            const decodedToken = jwt.decode(token, secret);
           const data = {
                jobseeker_id:decodedToken.id,
                jobTypeId:request.body.jobTypeId
            }
            JobseekersJobTypesManager.insertTaggedJobTypes( data, reqCodeMsg, function(e, o){
                    if (e === 200) {
                        response.status(200).send("Sucessfully add new jobseekers job type!");
                    }else {
                        response.status(e).send(o);
                    }
                });

        }
    }else {
        //console.log(request);
        console.log(request.body);
        response.status(407).send(reqCodeMsg[407]);
    }
});

router.post('/del-job-type', requiresAuthentication, function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/jobseekers/del-job-type");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[del-job-type]: userName not exist'
        ,'404': '[del-job-type]: cant connect to database'
        ,'405': '[del-job-type]:  query throw error'
        ,'406': '[del-job-type]: userName or email already exist'
        ,'407': '[del-job-type]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.jobseekerJobTypeId){	errValues.push("err jobseekerJobTypeId");	}else { counter++; }

    if((counter + errValues.length) === 1){
        if(counter === 1){
            const token= request.headers.access_token;
            const decodedToken = jwt.decode(token, secret);
            const data = {
                jobseeker_id:decodedToken.id,
                jobseekerJobTypeId:request.body.jobseekerJobTypeId
            }
            JobseekersJobTypesManager.delTaggedJobTypes( data, reqCodeMsg, function(e, o){
                    if (e === 200) {
                        response.status(200).send("Sucessfully del jobseekers job type!");
                    }else {
                        response.status(e).send(o);
                    }
                });

        }
    }else {
        //console.log(request);
        console.log(request.body);
        response.status(407).send(reqCodeMsg[407]);
    }
});

router.post('/get-apply-job', requiresAuthentication, function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/jobseekers/get-apply-job");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[get-apply-job]: userName not exist'
        ,'404': '[get-apply-job]: cant connect to database'
        ,'405': '[get-apply-job]:  query throw error'
        ,'406': '[get-apply-job]: userName or email already exist'
        ,'407': '[get-apply-job]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.jobAdvertisementID){errValues.push("err jobAdvertisementID");	}else { counter++; }

    if((counter + errValues.length) === 1){
        if(counter === 1){
            const token= request.headers.access_token;
            const decodedToken = jwt.decode(token, secret);
            const data = {
                jobseeker_id:decodedToken.id,
                jobAdvertisementID:request.body.jobAdvertisementID
            }
            JobseekersApplyJobManager.getApplyJob( data, reqCodeMsg, function(e, o){
                if (e === 200) {
                    response.status(200).send(o);
                }else {
                    response.status(e).send(o);
                }
            });

        }else {
            //console.log(request);
            console.log(request.body);
            response.status(407).send(errValues);
        }
    }else {
        //console.log(request);
        console.log(request.body);
        response.status(407).send(reqCodeMsg[407]);
    }
});

router.post('/get-apply-jobs', requiresAuthentication, function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/jobseekers/get-apply-jobs");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[get-apply-jobs]: userName not exist'
        ,'404': '[get-apply-jobs]: cant connect to database'
        ,'405': '[get-apply-jobs]:  query throw error'
    };

    const token= request.headers.access_token;
    const decodedToken = jwt.decode(token, secret);
    const data = {
        jobseeker_id:decodedToken.id
    };

    JobseekersApplyJobManager.getApplyJobs( data, reqCodeMsg, function(e, o){
        if (e === 200) {
            response.status(200).send(o);
        }else {
            response.status(e).send(o);
        }
    });


});

router.post('/add-new-apply-job', requiresAuthentication, function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/jobseekers/add-new-apply-job");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[add-new-apply-job]: userName not exist'
        ,'404': '[add-new-apply-job]: cant connect to database'
        ,'405': '[add-new-apply-job]:  query throw error'
        ,'406': '[add-new-apply-job]: userName or email already exist'
        ,'407': '[add-new-apply-job]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.jobAdvertisementId){errValues.push("err jobAdvertisementID");	}else { counter++; }

    if((counter + errValues.length) === 1){
        if(counter === 1){
            const token= request.headers.access_token;
            const decodedToken = jwt.decode(token, secret);
            const data = {
                jobseeker_id:decodedToken.id,
                jobAdvertisementId:request.body.jobAdvertisementId
            }
            JobseekersApplyJobManager.insertNewApplyJob( data, reqCodeMsg, function(e, o){
                if (e === 200) {
                    response.status(200).send("Sucessfully add new apply job!");
                }else {
                    response.status(e).send(o);
                }
            });

        }else {
            //console.log(request);
            console.log(request.body);
            response.status(407).send(errValues);
        }
    }else {
        //console.log(request);
        console.log(request.body);
        response.status(407).send(reqCodeMsg[407]);
    }
});

router.post('/del-apply-job', requiresAuthentication, function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/jobseekers/del-apply-job");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[del-apply-job]: userName not exist'
        ,'404': '[del-apply-job]: cant connect to database'
        ,'405': '[del-apply-job]:  query throw error'
        ,'406': '[del-apply-job]: userName or email already exist'
        ,'407': '[del-apply-job]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.applyJobId){errValues.push("err applyJobId");	}else { counter++; }

    if((counter + errValues.length) === 1){
        if(counter === 1){
            const data = {
                applyJobId:request.body.applyJobId
            }
            console.log(data);
            JobseekersApplyJobManager.delApplyJob( data, reqCodeMsg, function(e, o){
                if (e === 200) {
                    response.status(200).send("Sucessfully add delete apply job!");
                }else {
                    response.status(e).send(o);
                }
            });

        }else {
            //console.log(request);
            console.log(request.body);
            response.status(407).send(errValues);
        }
    }else {
        //console.log(request);
        console.log(request.body);
        response.status(407).send(reqCodeMsg[407]);
    }
});


router.post('/insert-company-rating', requiresAuthentication,  function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/jobseeker/insert-company-rating");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[insert-company-rating]: userName not exist'
        ,'404': '[insert-company-rating]: cant connect to database'
        ,'405': '[insert-company-rating]:  query throw error'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.companyId){	errValues.push("err companyId");	}else { counter++; }
    if(!request.body.rating){	errValues.push("err rating");	}else { counter++; }
    const token= request.headers.access_token;
    const decodedToken = jwt.decode(token, secret);
    const jobseekerId = decodedToken.id;

    if((counter + errValues.length) === 2){
        if(counter === 2){
            const data = {
                companyId: request.body.companyId,
                jobseekerId: jobseekerId,
                rating: request.body.rating
            };
            console.log(data);
            JobseekersCompanyManager.insertCompanyRating( data, reqCodeMsg, function(e, o){
                if (e === 200) {
                    response.status(200).send(o);
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