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
    .then(res=>res.json())   
    .then(allRecipes =>{
        // console.log(allRecipes); 
        //console.log(allRecipes.recipes.name);
        allRecipes.forEach(recipe => {
          // console.log(recipe.recipes);
          //recuperation des recettes par Pays
          //console.log(recipe);
          createMarkup('h1', recipe.name, showElement, );
          
        
           const recettes = recipe.recipes;
           recettes.forEach(recette =>{
            // console.log(recette.ingredients);
            //recuperation de toutes les recettes (uniquement!)
            //console.log(recette);
            const titleIng = createMarkup('section', '', showElement, [{class: "recipeName"}])

           createMarkup('h2', recette.title, titleIng );


            const ingredients = recette.ingredients;
            ingredients.forEach(ingredient =>{  
               // console.log(ingredient.name);
               
                createMarkup('p', ingredient.name, titleIng);
                //creation des buttons supprimer/modifier (avec des contantes btn edit & delete, le parent sera le titleIng (a recuperer avec la class ou l'id (a voir)))

            })
            const btnEdit = createMarkup('button', 'Modifier', titleIng );
          btnEdit.addEventListener('click', () => {
            
            console.log("Modifier recette :", recette);

          });
          const btnDelete = createMarkup('button', 'Supprimer', titleIng);
          btnDelete.addEventListener('click', ()=>{
            console.log(recette.id);
            fetchDelete(recette.id);
              

              console.log("supprimer recette ", recette);

          });
           })
        })
            
        });

        

