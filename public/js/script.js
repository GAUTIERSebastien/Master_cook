// Function de création
function createMarkup(markupname, text, parent, attributes = []) {
    const markup = document.createElement(markupname);
    markup.textContent = text;
    parent.appendChild(markup);
    for (const attribute of attributes) {
        for (let key in attribute) {
            markup.setAttribute(key, attribute[key]);
        }
    }
    return markup;
}


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

                

          const btnEdit = createMarkup('button', 'Modifier', titleIng );
          btnEdit.addEventListener('click', () => {
            
            console.log("Modifier l'ingrédient :", ingredient.name);


           
          });
          const btnDelete = createMarkup('button', 'Supprimer', titleIng);
            btnDelete.addEventListener('click', () => {
              // Effectuer une requête DELETE pour supprimer l'ingrédient
              const confirmDelete = confirm('Voulez-vous vraiment supprimer cet ingrédient ?');
              if (confirmDelete) {
                fetch(`https://localhost:4343/recipes/${recipe.id}/ingredients/${ingredient.id}`, {
                  method: 'DELETE',
                })
                  .then(() => {
                    console.log('Ingrédient supprimé');
                    // Supprimer l'affichage de l'ingrédient de la page
                    titleIng.removeChild(ingredientName);
                    // Mettre à jour l'affichage si nécessaire (par exemple, supprimer la recette si tous les ingrédients sont supprimés)
                    if (titleIng.children.length === 1) {
                      showElement.removeChild(titleIng);
                    }
                  })
                  .catch(error => {
                    console.error('Erreur lors de la suppression de l\'ingrédient :', error);
                  });
              }
            });
          });




                



            })



           })

        })
        
        
        



            
        



        
    // })
