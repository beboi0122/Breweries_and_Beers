const authMW = require('../middleware/auth/authMW');
const checkPasswordMW = require('../middleware/auth/checkPasswordMW');
const logoutMW = require('../middleware/auth/logoutMW');
const deleteBeerMW = require('../middleware/beer/deleteBeerMW');
const getBeerMW = require('../middleware/beer/getBeerMW');
const getBeersMW = require('../middleware/beer/getBeersMW');
const saveBeerMW = require('../middleware/beer/saveBeerMW');
const deleteBreweryMW = require('../middleware/brewery/deleteBreweryMW');
const getBreweriesMW = require('../middleware/brewery/getBreweriesMW');
const getBreweryMW = require('../middleware/brewery/getBreweryMW');
const saveBreweryMW = require('../middleware/brewery/saveBreweryMW');
const renderMW = require('../middleware/renderMW');
const invAuthMW = require('../middleware/auth/invAuthMW');

const BeerModel = require("../models/beer");
const BreweryModel = require("../models/brewery");
module.exports = function (app){
    const objRepo = {
        BeerModel: BeerModel,
        BreweryModel: BreweryModel
    };

    app.get('/brewery/show/:breweryid',
        authMW(objRepo),
        getBreweryMW(objRepo),
        getBeersMW(objRepo),
        renderMW(objRepo, 'brewery'));

    app.use('/brewery/new',
        authMW(objRepo),
        saveBreweryMW(objRepo),
        renderMW(objRepo, 'addbrewery'));

    app.use('/brewery/edit/:breweryid',
        authMW(objRepo),
        getBreweryMW(objRepo),
        saveBreweryMW(objRepo),
        renderMW(objRepo, 'addbrewery'));

    app.get('/brewery/delete/:breweryid',
        authMW(objRepo),
        getBreweryMW(objRepo),
        deleteBreweryMW(objRepo));

    app.get('/brewerylist',
        authMW(objRepo),
        getBreweriesMW(objRepo),
        getBeersMW(objRepo),
        renderMW(objRepo, 'breweries'));



    app.use('/beer/new',
        authMW(objRepo),
        saveBeerMW(objRepo),
        getBreweriesMW(objRepo),
        renderMW(objRepo, 'addbeer'));

    app.use('/beer/edit/:beerid',
        authMW(objRepo),
        getBeerMW(objRepo),
        getBreweriesMW(objRepo),
        saveBeerMW(objRepo),
        renderMW(objRepo, 'addbeer'));

    app.get('/beer/delete/:beerid',
        authMW(objRepo),
        getBeerMW(objRepo),
        deleteBeerMW(objRepo))

    app.get('/beerlist',
        authMW(objRepo),
        getBreweriesMW(objRepo),
        getBeersMW(objRepo),
        renderMW(objRepo, 'beers'));

    app.get('/logout',
        logoutMW(objRepo));

    app.use('/',
        invAuthMW(objRepo),
        checkPasswordMW(objRepo),
        renderMW(objRepo, 'login'));




}