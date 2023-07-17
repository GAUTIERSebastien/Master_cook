 // Fonction pour générer le formulaire de modification de recette
 function generateRecipeForm() {
    var recipeSelect = document.getElementById('recipeSelect');
    var recipeId = recipeSelect.value;
    var recipe = getRecipeById(recipeId);

    // Vérifier si la recette existe
    if (recipe) {
      var formContainer = document.getElementById('formContainer');
      formContainer.innerHTML = ''; // Réinitialiser le formulaire

      // Créer les éléments du formulaire
      createMarkup('label', 'Titre de la recette: ', formContainer);
      var titleInput = createMarkup('input', '', formContainer, [{ 'type': 'text' }, { 'name': 'recipeTitle' }, { 'value': recipe.title }]);

      createMarkup('label', 'Ingrédients: <br>', formContainer);
      var ingredientsContainer = document.createElement('div');

      // Ajouter les champs d'ingrédients
      for (var i = 0; i < recipe.ingredients.length; i++) {
        var ingredient = recipe.ingredients[i];

        var ingredientDiv = document.createElement('div');

        var ingredientName = createMarkup('input', '', ingredientDiv, [{ 'type': 'text' }, { 'name': 'ingredientName' }, { 'value': ingredient.name }]);

        var ingredientQuantity = createMarkup('input', '', ingredientDiv, [{ 'type': 'number' }, { 'name': 'ingredientQuantity' }, { 'value': ingredient.quantity }]);

        var ingredientUnit = document.createElement('select');
        ingredientUnit.setAttribute('name', 'ingredientUnit');

        // Ajouter les options pour les unités de mesure
        for (var j = 0; j < units.length; j++) {
          var unit = units[j];
          createMarkup('option', unit, ingredientUnit, [{ 'value': unit }]);
        }

        // Ajouter les éléments d'ingrédient au conteneur
        ingredientDiv.appendChild(ingredientName);
        ingredientDiv.appendChild(ingredientQuantity);
        ingredientDiv.appendChild(ingredientUnit);
        ingredientsContainer.appendChild(ingredientDiv);
      }

      // Ajouter les éléments au formulaire
      formContainer.appendChild(ingredientsContainer);
    }
  }

  // Fonction pour récupérer une recette par son ID
  function getRecipeById(id) {
    for (var i = 0; i < allRecipes.length; i++) {
      var recipeCategory = allRecipes[i];
      for (var j = 0; j < recipeCategory.recipes.length; j++) {
        var recipe = recipeCategory.recipes[j];
        if (recipe.id === id) {
          return recipe;
        }
      }
    }
    return null; // Si aucune recette n'est trouvée
  }

  // Récupérer les données du fichier db.json
  fetchData('db.json')
    .then(data => {
      var allRecipes = data.allRecipes;
      var units = data.units;

      // Remplir la liste déroulante avec les recettes
      var recipeSelect = document.getElementById('recipeSelect');
      for (var i = 0; i < allRecipes.length; i++) {
        var recipeCategory = allRecipes[i];
        for (var j = 0; j < recipeCategory.recipes.length; j++) {
          var recipe = recipeCategory.recipes[j];
          createMarkup('option', recipe.title, recipeSelect, [{ 'value': recipe.id }]);
        }
      }

      // Ajouter un gestionnaire d'événement pour générer le formulaire lors de la sélection d'une recette
      recipeSelect.addEventListener('change', generateRecipeForm);
    });
