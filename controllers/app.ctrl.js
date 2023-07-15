const { resolve } = require('path');
const {allRecipes} = require('../data/db.json');
const { log } = require('console');

exports.homeCtrl = (req, res) => {

    res.sendFile(resolve('public', 'home.html'));
};

exports.recipesCtrl = (req, res)=>
res.json(allRecipes);

exports.deleteCtrl = (req, res)=> {
    
    console.log(req.params);

    const id = req.params.id;

    // const recipe = allRecipes.find(rec=>rec.id==id);
    console.log(allRecipes.find(rec=>rec.id));
};
