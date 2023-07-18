
import { createMarkup } from "../utils/createMarkup.js";

// Fonction pour gérer la soumission du formulaire
export function handleEditFormSubmit(recipeId, titreModifie, ingredientsModifies) {
  // Effectuer une requête HTTP pour mettre à jour la recette sur le serveur
  fetch(`https://localhost:4343/recipes/${recipeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: titreModifie,
      ingredients: ingredientsModifies,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Recette mise à jour avec succès :", data.recipe);
      // Vous pouvez mettre à jour l'interface utilisateur ou effectuer d'autres actions ici après la mise à jour de la recette
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la mise à jour de la recette :", error);
    });
}

// Fonction pour créer un formulaire de modification pour une recette
export function createEditForm(recipeId, titreCourant, ingredientsCourants) {
  const containerForm = createMarkup("div", "", document.body);

  const form = createMarkup("form", "", containerForm);

  const labelTitre = createMarkup("label", "Titre de la recette :", form);
  const inputTitre = createMarkup("input", "", form, [
    { type: "text" },
    { value: titreCourant },
  ]);

  const labelIngredients = createMarkup("label", "Ingrédients :", form);

  // Créer un champ de saisie pour chaque ingrédient
  ingredientsCourants.forEach((ingredient, index) => {
    const inputIngredient = createMarkup("input", "", form, [
      { type: "text" },
      { value: ingredient },
    ]);
    inputIngredient.dataset.index = index;
  });

  const boutonModifier = createMarkup("button", "Modifier la recette", form);

  // Ajouter un gestionnaire d'événements à la soumission du formulaire
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const titreModifie = inputTitre.value;
    const ingredientsModifies = Array.from(form.querySelectorAll("input[data-index]")).map(
      (input) => input.value
    );
    handleEditFormSubmit(recipeId, titreModifie, ingredientsModifies);
  });
}

// Fonction pour gérer le clic sur le bouton de modification
export function handleEditButtonClick(recipeId, ingredientsCourants) {
  // Effectuer une requête HTTP pour récupérer les détails de la recette en fonction de l'ID de la recette
  fetch(`https://localhost:4343/home/${recipeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const titreCourant = data.recipe.title;
      createEditForm(recipeId, titreCourant, ingredientsCourants);
    })
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la récupération des détails de la recette :", error);
    });
}