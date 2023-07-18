const { resolve } = require('path');
const { allRecipes, units } = require('../data/db.json');
const fs = require('fs');

exports.homeCtrl = (req, res) => {
  res.sendFile(resolve('public', 'home.html'));
};

exports.recipesCtrl = (req, res) => {
  res.json(allRecipes);
};

exports.unitsCtrl = (req, res) => {
  res.json(units);
};

exports.deleteCtrl = (req, res) => {
  const id = req.params.id;
  let isIdExists = false;

  allRecipes.forEach(recipeCategory => {
    const recipes = recipeCategory.recipes;
    const index = recipes.findIndex(recipe => recipe.id == id);

    if (index !== -1) {
      isIdExists = true;
      recipes.splice(index, 1);

      if (recipes.length === 0) {
        // Supprimer la catégorie de recettes si elle ne contient plus de recette
        allRecipes.splice(allRecipes.findIndex(category => category === recipeCategory), 1);
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

  res.sendStatus(200);
};
