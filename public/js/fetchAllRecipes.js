
import { createMarkup } from "../utils/createMarkup.js";
import { handleEditButtonClick, } from "./update.js";
import { fetchDelete } from "../js/fetchDelete.js"


export const units = {
    "UNIT_GRAM": "gramme",// "gram",
    "UNIT_KILOGRAM": "Kg",// "kilogram",
    "UNIT_OBJECT": "piece",// "object",
    "UNIT_PACK": "sachet",// "bag",
    "UNIT_SLICE": "tranche",// "slice",
    "UNIT_MILLILITERS": "millilitre",
    "UNIT_LITER": "litre",
    "UNIT_TABLESPOON": "cuillère à soupe",// "tablespoon",
    "UNIT_TEASPOON": "cuillère à café",// "teaspoon",
    "UNIT_CUBE": "cube",
    "UNIT_POD": "gousse",// "pod",
    "UNIT_PINCH": "pincer",// "pinch",
    "UNIT_SHEET": "feuille",// "sheet",
    "UNIT_PM": "selon son goût" //"to taste"
};

const showElement = document.getElementById('showElement');


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
                    createMarkup('p', ingredient.quantity + " " + units[ingredient.unit], cardBody, [{ class: 'card-text' }]);


                })
                const buttonDiv = createMarkup('div', '', cardBody)

                const btnEdit = createMarkup('button', 'Modifier', buttonDiv, [
                    { class: 'edit-recipe btn btn-warning' },
                    { 'data-id': recette.id },
                    { 'data-ingredients': JSON.stringify(recette.ingredients) }
                ]);


                // Passer l'ID de la recette, l'objet recette et le titre de la recette à la fonction handleEditButtonClick
                btnEdit.addEventListener('click', () => {
                    handleEditButtonClick(recette.id, JSON.stringify(recette.ingredients), recette.title);
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


