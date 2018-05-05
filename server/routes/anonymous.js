const express = require('express');
const _ = require('underscore');
import anonymousAdvertisementManager from '../modules/anonymous/anonymous-advertisemet-manager';
import anonymousCompanyManager from '../modules/anonymous/anonymous-company-manager';
let router = express.Router();
const databaseOfflineMode = false;

/**anonymous query*/

router.post('/get-advertisement-by-search-text', function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/anonymous/get-advertisement-by-search-text");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[get-advertisement-by-search-text]: userName not exist'
        ,'404': '[get-advertisement-by-search-text]: cant connect to database'
        ,'405': '[get-advertisement-by-search-textget-advertisement-by-id]:  query throw error'
        ,'407': '[get-advertisement-by-search-text]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.searchText){	errValues.push("err searchText");	}else { counter++; }


    if((counter + errValues.length) === 1){
        if(counter === 1){
            const data = {
                searchText: request.body.searchText
            };
            console.log(data);
            anonymousAdvertisementManager.getAdvertisementsBySearchText( data, reqCodeMsg, function(e, o){
                if (e === 200) {
                    response.status(200).send(o);
                }else {
                    if (databaseOfflineMode) {
                        let data = [
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

router.post('/get-advertisement-by-id', function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/anonymous/get-advertisement-by-id");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[get-advertisement-by-id]: userName not exist'
        ,'404': '[get-advertisement-by-id]: cant connect to database'
        ,'405': '[get-advertisement-by-id]: get-advertisement-by-id]:  query throw error'
        ,'407': '[get-advertisement-by-id]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.jobAdvertisementId){	errValues.push("err jobAdvertisementId");	}else { counter++; }


    if((counter + errValues.length) === 1){
        if(counter === 1){
            const data = {
                jobAdvertisementId: request.body.jobAdvertisementId
            };
            console.log(data);
            anonymousAdvertisementManager.getAdvertisementById( data, reqCodeMsg, function(e, o){
                if (e === 200) {
                    response.status(200).send(o);
                }else {
                    if (databaseOfflineMode) {
                        let data = [
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

router.post('/get-all-advertisements', function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/anonymous/get-all-advertisements");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[get-all-advertisements]: userName not exist'
        ,'404': '[get-all-advertisements]: cant connect to database'
        ,'405': '[get-all-advertisements]: get-advertisement-by-id]:  query throw error'
        ,'407': '[get-all-advertisements]: didnt get enought parameters'
    };



    anonymousAdvertisementManager.getAllAdvertisements( {}, reqCodeMsg, function(e, o){
        if (e === 200) {
            response.status(200).send(o);
        }else {
            if (databaseOfflineMode) {
                let data = [
                ];
                console.log(o);
                console.log('But sent test data!');
                response.status(200).send(data);
            }else {
                response.status(e).send(o);
            }
        }
    });

});

router.post('/get-company-by-id', function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/anonymous/get-company-by-id");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[get-company-by-id]: userName not exist'
        ,'404': '[get-company-by-id]: cant connect to database'
        ,'405': '[get-company-by-id]: query throw error'
        ,'407': '[get-company-by-id]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.companyId){	errValues.push("err companyId");	}else { counter++; }


    if((counter + errValues.length) === 1){
        if(counter === 1){
            const data = {
                companyId: request.body.companyId
            };
            console.log(data);
            anonymousCompanyManager.getCompanyById( data, reqCodeMsg, function(e, o){
                if (e === 200) {
                    response.status(200).send(o);
                }else {
                    if (databaseOfflineMode) {
                        let data = [
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

router.post('/get-company-rating-by-id', function(request, response) {
    console.log("["+ new Date()+"][POST]:/api/anonymous/get-company-rating-by-id");

    const reqCodeMsg = {
        '200': 'result'
        ,'201': '[get-company-rating-by-id]: userName not exist'
        ,'404': '[get-company-rating-by-id]: cant connect to database'
        ,'405': '[get-company-rating-by-id]: get-advertisement-by-id]:  query throw error'
        ,'407': '[get-company-rating-by-id]: didnt get enought parameters'
    };
    let errValues = [];
    let counter = 0;

    if(!request.body.companyId){	errValues.push("err companyId");	}else { counter++; }


    if((counter + errValues.length) === 1){
        if(counter === 1){
            const data = {
                companyId: request.body.companyId
            };
            console.log(data);
            anonymousCompanyManager.getCompanyRatingById( data, reqCodeMsg, function(e, o){
                if (e === 200) {
                    response.status(200).send(o);
                }else {
                    if (databaseOfflineMode) {
                        let data = [
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



module.exports = router;