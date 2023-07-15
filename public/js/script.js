import { createMarkup } from "./utils/function.js";

let recettes = [];
let ingredients = [];
const recipesAll = document.getElementById('recipesAll');




//function create recipeShow
function recipeShow(){

}

fetch('https://localhost:4343/recipes', {

        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
})

    .then(res => {
        if(res.status !== 200){
            throw new Error("Le serveur est indisponible")
        } else {
            return res.json()
        }
    })
    .then(recipes => {
        //Récupération des données {3 objet}
        console.log('Base de données ', recipes) // => recupère objet tous pays

        recipes.forEach(recipe => {
            //Récupération des recettes 
            // console.log('title : ', recipe.name) // name du pays
            console.log('Pays ', recipe); // objet par pays
            console.log('Liste des recettes :' , recipe.recipes)
            recettes= recipe.recipes;

// console.log('ingredients : ', recettes.ingredients)

                recettes.forEach(rec =>{
                    console.log('rec : ', rec)

                    ingredients = rec.ingredients;
                    console.log('ingredient : ', ingredients);



                    //Création de l'article
                    const articleRecipe = createMarkup("article", "", recipesAll, [{ class: "recipesAll" }])
                    createMarkup('h4', rec.title, articleRecipe, [{ class: "recipe text-center" }]);

                        ingredients.forEach(ingredient =>{
                            console.log('Name ingredient : ', ingredient.name)
                            createMarkup('p', ingredient.name, articleRecipe)
                        });

                        let btnD = createMarkup('button', "Supprimer", articleRecipe, [{class: "btn btn-danger"}, {id: "btnD" }]);
                        let btnE = createMarkup('button', "Modifier", articleRecipe, [{ class: "btn btn-warning mx-3" }, ]);
                


                })            
        })
    });

