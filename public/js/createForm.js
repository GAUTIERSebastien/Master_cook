import { createMarkup } from "../utils/createMarkup.js";
import { handleFormSubmit } from "./handleFormSubmit.js";
import { units } from "../utils/unit.js";


//***FORMULAIRE POUR CRÉER UNE RECETTE***// 

// Ajout d'un champ ingrédient
function addIngredientFields(ingredientsDiv, index) {
    createMarkup('input', '', ingredientsDiv, [{ placeholder: 'Nom de l\'ingredient', name: `ingredientName${index}`, required: 'true' }]);
    createMarkup('input', '', ingredientsDiv, [{ placeholder: 'Quantité', name: `ingredientQuantity${index}`, required: 'true' }]);
    
    const unitSelect = createMarkup('select', '', ingredientsDiv, [{ name: `ingredientUnit${index}`, required: 'true' }]);
    Object.values(units).forEach(unit => {
        createMarkup('option', unit, unitSelect);
    });
}

export function createForm() {
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
        for (let i = 0; i < 1; i++) {
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
}
