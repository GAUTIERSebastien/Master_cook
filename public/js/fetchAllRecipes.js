import { createMarkup } from "../utils/createMarkup.js";
import { fetchDelete } from "../js/fetchDelete.js";
import { createForm } from './createForm.js';
import { createFilteredRecipeElements } from "../js/filterRecipe.js"
import { filterRecipes } from "../js/filterRecipe.js"
import { units } from "../utils/unit.js"

const showElement = document.getElementById('showElement');

// Creation du bouton nouvelle recette puis du formulaire
createForm();


fetch('https://localhost:4343/recipes', {
    method: "GET",
    headers:
    {
        "content-type": "application/json",

    },
}
)
    .then(res => res.json())
    .then(allRecipes => {
        // console.log(allRecipes); 
        //console.log(allRecipes.recipes.name);
        allRecipes.forEach(recipeGroup => {
            
             createMarkup('h1', recipeGroup.name, showElement,);

            const country = createMarkup('section', "", showElement, [{ class: "row" }]);

            const recipes = recipeGroup.recipes;
            recipes.forEach(recipe => {
                // console.log(recette.ingredients);
                //recuperation de toutes les recettes (uniquement!)
                //console.log(recette);
                const titleIng = createMarkup('article', '', country, [{ class: "card col-4 recipeName" }])

                createMarkup('h2', recipe.title, titleIng, [{ class: "card-title" }]);


                const cardBody = createMarkup('div', "", titleIng, [{ class: "card-body" }]);

                const ingredients = recipe.ingredients;
                ingredients.forEach(ingredient => {
                    // console.log(ingredient.name);


                    createMarkup('h3', ingredient.name, cardBody,[{ class:"fw-bold"}]);
                    createMarkup('p', ingredient.quantity+ " "+units[ingredient.unit], cardBody,[{class:"fs-5"}]);


                })
                const buttonDiv = createMarkup('div', '', cardBody)

                const btnEdit = createMarkup('button', 'Modifier', buttonDiv, [
                    { class: 'edit-recipe btn btn-warning' },
                    { 'data-id': recipe.id },
                    { 'data-ingredients': JSON.stringify(recipe.ingredients) }
                ]);
                btnEdit.addEventListener('click', () => {
                    handleEditButtonClick(recipe.id, JSON.stringify(recipe.ingredients));
                    console.log("Modifier recipe :", recipe);

                });
                const btnDelete = createMarkup('button', 'Supprimer', buttonDiv, [{ class: "reload btn btn-danger" }]);
                btnDelete.addEventListener('click', () => {
                    console.log(recipe.id);
                    if (confirm('Souhaitez-vous confirmer ?')) {

                        fetchDelete(recipe.id)
                        location.href = "https://localhost:4343/home"
                    }
                    else {
                        location.href = "https://localhost:4343/home"
                    }

                    location.href = "https://localhost:4343/home"

                    console.log("supprimer recipe ", recipe);
                });
            })
        })
        // Gestionnaire d'événements pour le formulaire de filtrage
        document.getElementById('filterForm').addEventListener('submit', event => {
            event.preventDefault();


            const recipeNameInput = document.getElementById('recipeNameInput');
            const recipeName = recipeNameInput.value.toLowerCase();

            // Filtrer les recettes par nom
            const resultFilter = filterRecipes(allRecipes, recipeName)

            // Générer les éléments HTML de la recette filtrée
            createFilteredRecipeElements(resultFilter)



        })
    });


