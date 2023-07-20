import { createMarkup } from "../untils/createMarkup.js";
import {units} from "../untils/units.js"
// Fonction pour filtrer les recettes par nom

export function filterRecipes(allRecipes, recipeName) {
  const filteredRecipes = [];

  allRecipes.forEach(recipeGroup => {
    const filteredGroup = {
      name: recipeGroup.name,
      recipes: []
    };

    recipeGroup.recipes.forEach(recipe => {
      // Vérifie si le titre de la recette correspond à la recherche (ignorer la casse)
      if (recipe.title.toLowerCase().includes(recipeName)) {
        filteredGroup.recipes.push(recipe);
        
      }
    });

    if (filteredGroup.recipes.length > 0) {
      filteredRecipes.push(filteredGroup);
    }
  });

  return filteredRecipes;
}

// Fonction pour générer les éléments HTML de la recette filtrée
export function createFilteredRecipeElements(filteredRecipes) {
  showElement.innerHTML = '';

  filteredRecipes.forEach(recipeGroup => {
    createMarkup('h2', recipeGroup.name, showElement);

    const groupElement = createMarkup('div', '', showElement);
    const recipes = recipeGroup.recipes;

    recipes.forEach(recipe => {
      const recipeElement = createMarkup('div', '', groupElement, [{ class: "recipe" }]);
      createMarkup('h3', recipe.title, recipeElement);

      const ulElement = createMarkup('ul', '', recipeElement);
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.unit === "UNIT_PM") {
          createMarkup('li', `${ingredient.name} - ${units[ingredient.unit]}`, ulElement);
          
        } else {
        
          createMarkup('li', `${ingredient.name} - ${ingredient.quantity} ${units[ingredient.unit]}`, ulElement);
        }
        
      });
    });
  });
}