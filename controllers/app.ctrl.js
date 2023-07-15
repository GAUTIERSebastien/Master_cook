const { resolve } = require('path');
const {allRecipes} = require('../data/db.json')

exports.homeCtrl = (req, res) => {

    res.sendFile(resolve('public', 'home.html'));
};

exports.recipesCtrl = (req, res)=>
res.json(allRecipes)

