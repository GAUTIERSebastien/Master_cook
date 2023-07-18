import { createMarkup } from "../utils/createMarkup.js";
import { units } from './fetchAllRecipes.js';

// Variable pour stocker le formulaire actif
let activeForm = null;

// Fonction pour gérer l'événement de clic du bouton "Modifier"
export function handleEditButtonClick(recipeId, ingredientsJSON, recipeTitle) {
    const ingredients = JSON.parse(ingredientsJSON);
  
    // Récupérer l'article (titleIng) correspondant à l'ID du bouton "Modifier"
    const titleIng = document.querySelector(`[data-id="${recipeId}"]`);
  
    // Vérifier si le formulaire est déjà ouvert
    if (activeForm) {
      return; // Ne rien faire si le formulaire est déjà ouvert
    }
  
    // Créer le formulaire de modification et l'insérer dans l'article titleIng
    const form = createMarkup('form', '', titleIng, [{ class: 'edit-form' }]);
  
    // Champs pour modifier le titre de la recette
    const titleLabel = createMarkup('label', 'Titre de la recette:', form);
    const titleInput = createMarkup('input', '', form, [
      { type: 'text' },
      { value: recipeTitle }, // Afficher le titre actuel de la recette dans le champ de saisie
    ]);
  
    // Champs pour modifier les ingrédients
    const ingredientsLabel = createMarkup('label', 'Ingrédients:', form);
    const ingredientList = createMarkup('div', '', form, [{ class: 'ingredient-list' }]);
  
    function createIngredientInput(ingredient) {
      const ingredientGroup = createMarkup('div', '', ingredientList, [{ class: 'ingredient-group' }]);
  
      const nameInput = createMarkup('input', '', ingredientGroup, [
        { type: 'text' },
        { value: ingredient.name }, // Afficher le nom actuel de l'ingrédient dans le champ de saisie
        { placeholder: "Nom de l'ingrédient" },
      ]);
  
      const quantityInput = createMarkup('input', '', ingredientGroup, [
        { type: 'number' },
        { value: ingredient.quantity }, // Afficher la quantité actuelle de l'ingrédient dans le champ de saisie
        { placeholder: 'Quantité' },
      ]);
  
      // Créer l'élément select pour l'unité de l'ingrédient
      const unitSelect = createMarkup('select', '', ingredientGroup);
  
      // Ajouter les options à l'élément select
      for (const [unitKey, unitName] of Object.entries(units)) {
        const option = createMarkup('option', unitName, unitSelect, [
          { value: unitKey },
          { selected: unitKey === ingredient.unit }, // Définir l'attribut selected pour l'unité actuelle
        ]);
      }
  
      // Écouteur d'événement pour détecter les changements dans les champs de saisie
      nameInput.addEventListener('input', () => {
        ingredient.name = nameInput.value;
      });
  
      quantityInput.addEventListener('input', () => {
        ingredient.quantity = quantityInput.value;
      });
  
      // Écouteur d'événement pour gérer les changements dans l'élément select d'unité
      unitSelect.addEventListener('change', () => {
        ingredient.unit = unitSelect.value;
      });
    }
  
    // Créer les champs pour les ingrédients existants
    ingredients.forEach((ingredient) => createIngredientInput(ingredient));
  
    // Bouton "Ajouter un ingrédient"
    const addIngredientButton = createMarkup('button', 'Ajouter un ingrédient', form);
    addIngredientButton.addEventListener('click', () => {
      // Créer un nouvel ingrédient avec des valeurs par défaut
      const newIngredient = {
        name: '',
        quantity: '',
        unit: Object.keys(units)[0], // Sélectionner la première unité par défaut
      };
      createIngredientInput(newIngredient);
    });
  
    // Bouton "Enregistrer" de type submit
    const submitButton = createMarkup('button', 'Enregistrer', form, [{ type: 'submit' }]);
  
    // Stocker le formulaire actif
    activeForm = form;
  }