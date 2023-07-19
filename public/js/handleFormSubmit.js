//Ecoute le submit du formulaire de création de recette
export function handleFormSubmit(event) {
    event.preventDefault(); // Empêche le formulaire d'être soumis normalement
    const formData = new FormData(event.target); // Crée un objet FormData à partir du formulaire
    console.log("Form data:", Array.from(formData.entries())); // Affiche le contenu du formulaire dans la console
}

