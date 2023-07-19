const fs = require('fs');
const { allRecipes } = require('../data/db.json');

exports.addRecipeCtrl = (req, res) => {
    const recipe = req.body;
    const name = recipe.name;
    let found = false;
  
    for (let i = 0; i < allRecipes.length; i++) {
        if (allRecipes[i].name === name) {
            allRecipes[i].recipes.push(recipe);
            found = true;
            break;
        }
    }
    
    // Si la gastronomie n'existe pas, créez-en une nouvelle
    if (!found) {
        allRecipes.push({
            name: name,
            recipes: [recipe]
        });
    }

    // Réécrire le fichier db.json avec les modifications
    const updatedData = JSON.stringify({ allRecipes });
    fs.writeFile('data/db.json', updatedData, err => {
        if (err) {
            console.error(err);
            return res.status(500).send({ message: 'Erreur lors de la sauvegarde de la recette' });
        }
        console.log('db.json updated successfully');
        return res.status(200).send({ message: 'Recette ajoutée avec succès' });
    });
};

