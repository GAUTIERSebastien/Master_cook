import { createMarkup } from "../untils/createMarkup.js";
import {fetchDelete} from "../js/fetchDelete.js"

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
            const pays = createMarkup('section', "", showElement, [{ class: "row" }]);


            const recettes = recipe.recipes;
            recettes.forEach(recette => {
                // console.log(recette.ingredients);
                //recuperation de toutes les recettes (uniquement!)
                //console.log(recette);
                const titleIng = createMarkup('article', '', pays, [{ class: "recipeName card col-4" }])

                createMarkup('h2', recette.title, titleIng, [{ class: "card-title" }]);

                const cardBody = createMarkup('div', "", titleIng, [{ class: "card-body" }]);

                const ingredients = recette.ingredients;
                ingredients.forEach(ingredient => {
                    // console.log(ingredient.name);

                    createMarkup('h3', ingredient.name, cardBody);
                    createMarkup('span', ingredient.quantity, cardBody);
                    createMarkup('span', ingredient.unit, cardBody); //à modifier pour avoir les resultat du 2eme tableau



                    //creation des buttons supprimer/modifier (avec des contantes btn edit & delete, le parent sera le titleIng (a recuperer avec la class ou l'id (a voir)))

                })
                const buttonDiv = createMarkup('div', '', cardBody)
                const btnEdit = createMarkup('button', 'Modifier', buttonDiv, [
                    { class: 'edit-recipe btn btn-warning' },
                    { 'data-id': recette.id },
                    { 'data-ingredients': JSON.stringify(recette.ingredients) }
                ]);
                btnEdit.addEventListener("click", () => {
                    handleEditButtonClick(recette.id, JSON.stringify(recette.ingredients));
                });


      const btnDelete = createMarkup('button', 'Supprimer', buttonDiv, [{class:'btn btn-danger'}]);
      btnDelete.addEventListener('click', ()=>{
            console.log(recette.id);
            if(confirm('Souhaitez-vous confirmer ?')) {
              
              fetchDelete(recette.id)
              location.href="https://localhost:4343/home"
            }
            else {
              location.href="https://localhost:4343/home"
              
            }


            
             location.href="https://localhost:4343/home"
              

            console.log("supprimer recette ", recette);
            

          });
           })


        })

    });



