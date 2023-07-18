import { createMarkup } from "../untils/createMarkup.js";
import { fetchDelete } from "../js/fetchDelete.js"


const units = {
    "UNIT_GRAM": "gram",
    "UNIT_KILOGRAM": "kilogram",
    "UNIT_OBJECT": "object",
    "UNIT_PACK": "bag",
    "UNIT_SLICE": "slice",
    "UNIT_MILLILITERS": "millilitre",
    "UNIT_LITER": "litre",
    "UNIT_TABLESPOON": "tablespoon",
    "UNIT_TEASPOON": "teaspoon",
    "UNIT_CUBE": "cube",
    "UNIT_POD": "pod",
    "UNIT_PINCH": "pinch",
    "UNIT_SHEET": "sheet",
    "UNIT_PM": "to taste"
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
        console.log(allRecipes); 
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
                   
                    createMarkup('h3', ingredient.name, cardBody);
                    createMarkup('span', ingredient.quantity, cardBody);
                    createMarkup('span', units[ingredient.unit], cardBody);
                  });
                  
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


