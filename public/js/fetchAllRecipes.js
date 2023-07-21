import { createMarkup } from "../utils/createMarkup.js";
import { fetchDelete } from "../js/fetchDelete.js";
import { fetchUpdate } from "../js/fetchUpdate.js";
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
            // console.log(recipe.recipes);
            //recuperation des recettes par Pays
            //console.log(recipe);

            if (recipeGroup.name === 'french') {
                createMarkup('h1', "France", showElement,);
            }
            if (recipeGroup.name === 'american') {
                createMarkup('h1', "Amérique", showElement,);
            }
            if (recipeGroup.name === 'japanese') {
                createMarkup('h1', "Japon", showElement,);
            }
            if (recipeGroup.name === 'italian') {
                createMarkup('h1', "Italie", showElement,);
            }
            // createMarkup('h1', recipeGroup.name, showElement,);

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


                    createMarkup('h3', ingredient.name, cardBody);
                    createMarkup('span', ingredient.quantity+ " ", cardBody);
                    createMarkup('span', units[ingredient.unit], cardBody); //à modifier pour avoir les resultat du 2eme tableau


                })
                const buttonDiv = createMarkup('div', '', cardBody, [{ class: 'd-flex justify-content-center' }])

                const btnEdit = createMarkup('button', 'Modifier', buttonDiv, [{ class: "btn btn-warning" }]);
                btnEdit.addEventListener('click', () => {
                    // console.log("Modifier recette dans file fetclAllRecipes : ", recette);
                    // console.log('Id recupérer au click sur btn Modifié : ', recette.id)

                    fetchUpdate(recipe.id, recipe);

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


