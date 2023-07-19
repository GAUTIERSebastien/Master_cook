const fs = require('fs');
const { allRecipes } = require('../data/db.json');
const { v4: uuidv4 } = require('uuid'); // Importez le module uuid pour générer des ID uniques

exports.addRecipeCtrl = (req, res) => {
    const recipe = req.body;
    const title = recipe.title;
    const country = recipe.country;
    let found = false;

    // Générez un ID unique pour la recette
    recipe.id = uuidv4(); 

    // Chargez db.json chaque fois que vous devez l'utiliser
    const db = JSON.parse(fs.readFileSync('data/db.json', 'utf8'));
    const allRecipes = db.allRecipes;

    for (let i = 0; i < allRecipes.length; i++) {
        if (allRecipes[i].name === country) {
            allRecipes[i].recipes.push(recipe);
            found = true;
            break;
        }
    }
   
    // Si la gastronomie n'existe pas, créez-en une nouvelle
    if (!found) {
        allRecipes.push({
            name: country,
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
