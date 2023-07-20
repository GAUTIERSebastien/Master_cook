const data = require('../data/db.json');
const fs = require('fs');


exports.updateRecipeCtrl = (req, res) => {
    const { recipeId } = req.params;
    const { title, ingredients } = req.body;
  
    // Recherche de la recette correspondante dans la base de données
    const recipe = data.allRecipes.flatMap((country) => country.recipes).find((recipe) => recipe.id === parseInt(recipeId));
  
    if (!recipe) {
      return res.status(404).json({ message: "Recette non trouvée." });
    }
  
    // Mise à jour du titre et des ingrédients de la recette
    recipe.title = title;
    recipe.ingredients = ingredients;
  
    // Réécrire le fichier db.json avec les modifications
    const updatedData = JSON.stringify({ allRecipes: data.allRecipes });
    fs.writeFile('data/db.json', updatedData, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Erreur lors de la mise à jour de la recette." });
      }
      console.log('db.json updated successfully');
      res.status(200).json({ message: "Recette mise à jour avec succès.", recipe });
    });
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
  
  // ...
  