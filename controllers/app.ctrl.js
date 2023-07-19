const { resolve } = require('path');
const { allRecipes } = require('../data/db.json');
const { addRecipeCtrl } = require('./addRecipe.ctrl.js');
const fs = require('fs');

exports.homeCtrl = (req, res) => {
  res.sendFile(resolve('public', 'home.html'));
};

exports.recipesCtrl = (req, res) => {
  res.json(allRecipes);
};


exports.addRecipeCtrl = (req, res) => {
  addRecipeCtrl(req, res);
};


exports.deleteCtrl = (req, res) => {
  const id = req.params.id;
  let isIdExists = false;

  allRecipes.forEach(recipe => {
    const recipes = recipe.recipes;

    const index = recipes.findIndex(r => r.id == id);
    if (index !== -1) {
      isIdExists = true;
      recipes.splice(index, 1);
      if (recipes.length === 0) {
        // Supprimer la gastronomie si elle ne contient plus de recette
        allRecipes.splice(allRecipes.findIndex(r => r === recipe), 1);
      }
      return;
    }
  });

  if (!isIdExists) {
    const error = new Error('ID not found');
    error.name = 'NotFoundError';
    throw error;
  }

  // Réécrire le fichier db.json avec les modifications
  const updatedData = JSON.stringify({ allRecipes });
  fs.writeFile('data/db.json', updatedData, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('db.json updated successfully');
  });


};


//   if (!isIdExists) {
//     const error = new Error('ID not found');
//     error.name = 'NotFoundError';
//     throw error;
//   }

  // Le reste du code ici





// const { resolve } = require('path');
// const {allRecipes} = require('../data/db.json');
// const fs = require('fs');

// // const { log } = require('console');

// exports.homeCtrl = (req, res) => {

//     res.sendFile(resolve('public', 'home.html'));
// };

// exports.recipesCtrl = (req, res)=>
// res.json(allRecipes);

// exports.deleteCtrl = (req, res)=> {
// //console.log(req.params);
//  const id = req.params.id;
//  let isIdExists = false;

// //  fs.readFile('data/db.json', (err, data) => {
// //     if (err) {
// //       console.error(err);
// //       return;
// //     }
  
//     // const jsonData = JSON.parse();
//     // const allRecipes = jsonData.allRecipes;


//     allRecipes.forEach(recipe=>{
//         for(let i=0; i< allRecipes.findIndex.length; i++){

//             const recipeObject = allRecipes.recipes[i];
//             const recipes = recipeObject.recipes;
//              isIdExists = false;
//              const index = recipes.findIndex((r) => {
//                 return r.id === id});

//             if( index !== -1){
//                 console.log(index);
//             }else{
//                 console.log('t"as mrdéééééé');
//             }




            





//         }
        // console.log(recipe) //=> recupere le pays + recette + ingredient
        //console.log(recipe.recipes); // => toutes les recettes
        
    //     const recs= recipe.recipes;

    //     recs.forEach(rec=>{

    //         console.log(rec)  // la recette
    //         if (rec.id==id) {
    //                    console.log(true);


    //                     // Mettre ici le code pour supprimer
    //            // const recipeIndex = allRecipes.findIndex(recipes => recipe.id == rec.id)
    //                     // console.log(recipeIndex);

    //             const foundRecipe = allRecipes.findIndex(recipe => recipe.id === id);

    //             if (foundRecipe) {
    //                 console.log('On est ici');
    //                 console.log(foundRecipe);
    //             } else {
    //                 console.log(`Aucun élément avec l'ID ${id} n'a été trouvé.`);
    //             }


                        
    //                 }else{
    //                     console.log(false);
    //                     // Essayer de gérer les erreurs
            
            
    //                 }

    
    // })

// })

// //})
  
    

    
//  };
