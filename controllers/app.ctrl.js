const { resolve } = require('path');
const {allRecipes} = require('../data/db.json')

exports.homeCtrl = (req, res) => {

    res.sendFile(resolve('public', 'home.html'));
};

exports.servicesCtrl = (req, res) => {
 
    res.end('Services');
};

exports.contactCtrl = (req, res) => res.end('Contact');

exports.recipesCtrl = (req, res)=>
res.json(allRecipes)


