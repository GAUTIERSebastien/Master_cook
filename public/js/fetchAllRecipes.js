import { createMarkup } from "../utils/createMarkup.js";
import { fetchDelete } from "../js/fetchDelete.js";
import {units} from "../utils/unit.js";

const showElement = document.getElementById('showElement');


// Ajout d'un champ ingrédient
function addIngredientFields(ingredientsDiv, index) {
    createMarkup('input', '', ingredientsDiv, [{ placeholder: 'Nom de l\'ingredient', name: `ingredientName${index}`, required: 'true' }]);
    createMarkup('input', '', ingredientsDiv, [{ placeholder: 'Quantité', name: `ingredientQuantity${index}`, required: 'true' }]);
    
    const unitSelect = createMarkup('select', '', ingredientsDiv, [{ name: `ingredientUnit${index}`, required: 'true' }]);
    Object.values(units).forEach(unit => {
        createMarkup('option', unit, unitSelect);
    });
}

//************Button add recipe**********************/
// Création du conteneur pour le bouton
const buttonContainer = createMarkup('div', '', document.body, [{ class: "button-container" }]);

// Ajout du bouton "Ajouter une recette" à l'intérieur du conteneur
const addButton = createMarkup('button', 'Ajouter une recette', buttonContainer, [{ class: "add-recipe btn btn-success" }]);

addButton.addEventListener('click', () => {
    // Création du formulaire d'ajout de recette
    const form = createMarkup('form', '', document.body, [{ id: "recipe-form" }]);
    createMarkup('input', '', form, [{ placeholder: 'Titre de la recette', name: 'title', required: 'true' }]);
    createMarkup('input', '', form, [{ placeholder: 'Pays', name: 'country', required: 'true' }]);

    
    const ingredientsDiv = createMarkup('div', '', form, [{ id: 'ingredients' }]);
    createMarkup('h2', 'Ingredients', ingredientsDiv);
    
    // Création des champs d'ingrédient par défaut
    for (let i = 0; i < 3; i++) {
        addIngredientFields(ingredientsDiv, i);
    }
    
    // Bouton pour ajouter plus d'ingrédients
    const addIngredientButton = createMarkup('button', 'Ajouter un ingredient', form, [{ type: 'button' }]);
    let ingredientCount = 3;
    addIngredientButton.addEventListener('click', () => {
        addIngredientFields(ingredientsDiv, ingredientCount);
        ingredientCount++;
    });
    
    // Bouton de soumission du formulaire
    const submitButton = createMarkup('button', 'Ajouter la recette', form, [{ type: 'submit' }]);
    form.addEventListener('submit', handleFormSubmit);

    // Insertion du formulaire avant le conteneur du bouton
    document.body.insertBefore(form, buttonContainer);
});
//***************************************************/


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
        allRecipes.forEach(recipe => {
            // console.log(recipe.recipes);
            //recuperation des recettes par Pays
            //console.log(recipe);
            createMarkup('h1', recipe.name, showElement,);

            const country = createMarkup('section', "", showElement, [{ class: "row" }]);

            const recettes = recipe.recipes;
            recettes.forEach(recette => {
                // console.log(recette.ingredients);
                //recuperation de toutes les recettes (uniquement!)
                //console.log(recette);
                const titleIng = createMarkup('article', '', country, [{ class: "card col-4 recipeName" }])

                createMarkup('h2', recette.title, titleIng, [{ class: "card-title" }]);


                const cardBody = createMarkup('div', "", titleIng, [{ class: "card-body" }]);

                const ingredients = recette.ingredients;
                ingredients.forEach(ingredient => {
                    // console.log(ingredient.name);


                    createMarkup('h3', ingredient.name, cardBody);
                    createMarkup('span', ingredient.quantity, cardBody);
                    createMarkup('span', ingredient.unit, cardBody); //à modifier pour avoir les resultat du 2eme tableau


                })
                const buttonDiv = createMarkup('div', '', cardBody)

                const btnEdit = createMarkup('button', 'Modifier', buttonDiv, [
                    { class: 'edit-recipe btn btn-warning' },
                    { 'data-id': recette.id },
                    { 'data-ingredients': JSON.stringify(recette.ingredients) }
                ]);
                btnEdit.addEventListener('click', () => {
                    handleEditButtonClick(recette.id, JSON.stringify(recette.ingredients));
                    console.log("Modifier recette :", recette);

                });
                const btnDelete = createMarkup('button', 'Supprimer', buttonDiv, [{ class: "reload btn btn-danger" }]);
                btnDelete.addEventListener('click', () => {
                    console.log(recette.id);
                    if (confirm('Souhaitez-vous confirmer ?')) {

                        fetchDelete(recette.id)
                        location.href = "https://localhost:4343/home"
                    }
                    else {
                        location.href = "https://localhost:4343/home"
                    }

                    location.href = "https://localhost:4343/home"

                    console.log("supprimer recette ", recette);
                });
            })
        })

    });


