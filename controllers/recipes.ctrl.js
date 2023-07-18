// controllers/recipes.ctrl.js

const data = require('../data/db.json');

exports.updateRecipeCtrl = (req, res) => {
  const { recipeId } = req.params;
  const { title } = req.body;

  // Recherche de la recette correspondante dans la base de données
  const recipe = data.allRecipes
  .flatMap(country => country.recipes)
  .find(recipe => recipe.id === parseInt(recipeId));

  if (!recipe) {
    return res.status(404).json({ message: "Recette non trouvée." });
  }

  // Mise à jour du titre de la recette
  recipe.title = title;

  res.status(200).json({ message: "Recette mise à jour avec succès.", recipe });
};

exports.updateIngredientsCtrl = (req, res) => {
  const { recipeId } = req.params;
  const { ingredients } = req.body;

  // Recherche de la recette correspondante dans la base de données
  const recipe = data.allRecipes.flatMap(country => country.recipes).find(recipe => recipe.id === parseInt(recipeId));

  if (!recipe) {
    return res.status(404).json({ message: "Recette non trouvée." });
  }

  // Mise à jour des ingrédients de la recette
  recipe.ingredients = ingredients;

  res.status(200).json({ message: "Ingrédients de recette mis à jour avec succès.", recipe });
};
