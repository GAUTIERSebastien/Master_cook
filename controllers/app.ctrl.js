const { resolve } = require('path');
const {allRecipes} = require('../data/db.json')

exports.homeCtrl = (req, res) => {

    res.sendFile(resolve('public', 'home.html'));
};

exports.recipesCtrl = (req, res)=>
res.json(allRecipes)

const { resolve } = require('path');
const { allRecipes } = require('../data/db.json');
const fs = require('fs');

exports.homeCtrl = (req, res) => {
  res.sendFile(resolve('public', 'home.html'));
};

exports.recipesCtrl = (req, res) => {
  res.json(allRecipes);
};

exports.deleteCtrl = (req, res) => {
  const id = req.params.id;
  let isIdExists = false;

  allRecipes.forEach(recipe => {
    const recipes = recipe.recipes;

    const index = recipes.findIndex(r => r.id == id);
    if (index !== -1) {
      isIdExists = true;
      recipes.splice(index, 1);
      if (recipes.length === 0) {
        // Supprimer la gastronomie si elle ne contient plus de recette
        allRecipes.splice(allRecipes.findIndex(r => r === recipe), 1);
      }
      return;
    }
  });

  if (!isIdExists) {
    const error = new Error('ID not found');
    error.name = 'NotFoundError';
    throw error;
  }

  // Réécrire le fichier db.json avec les modifications
  const updatedData = JSON.stringify({ allRecipes });
  fs.writeFile('data/db.json', updatedData, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('db.json updated successfully');
  });

  // Le reste du code ici
};