import {createMarkup} from "../untils/createMarkup.js";
import {units} from "../untils/units.js"

// Attention je n'ai pas gérer si on click plusieur fois sur modif => les modal réapparaissent à la suite


export function fetchUpdate(id, recipe) {
    // console.log('title dans function fetchUpadte : ', recipe.title);
    // console.log('ingredients dans function fetchUpadte :', recipe.ingredients);
    const ingredientsForm = recipe.ingredients;

    let editModal = document.getElementById('modalUpdate');


    // Create modal with stye bootstrap
    const divDialog = createMarkup('div', '', editModal, [{class: 'modal-dialog'}]);
    const divContent = createMarkup('div', '', divDialog, [{class: 'modal-content'}]);
    const divHeader = createMarkup('div', '', divContent, [{class: 'modal-header'}]);


    // Start FormEdit

    //Create form modal bootstrap
    const formEdit = createMarkup('form', '', divHeader, [{class: ''}]);


    // Create "crossClose" => cancel
    const btnClose = createMarkup('button', '', formEdit, [{class: 'btn-close'}, {'data-bs-dismiss': 'modal'}, {'aria-label': 'Close'}])


    // Create label + input for recipe.title
    const labelTilte = createMarkup('label', 'Titre de la Recette', formEdit, [{for: 'title'}, {class: 'form-label'}]);
    const inputTitle = createMarkup('input', '', formEdit, [{type: 'text'}, {id: 'title'}, {name: 'titleRecipe'}, {value: `${recipe.title}`}, {class: 'form-control'}]);


    //Start label + input Ingredients with 'compteur'
    let cpt = 0;
    ingredientsForm.forEach(ing => {

        //Display name
        // console.log('list ingredients : ', ing.name);
        cpt++


        // je n'arrive pas récupérer la valeur lors de la saisie
        // Method 1 : j'ai déjà essayer avec 1 seul label => je recupère la saisie mais comment l'envoyer ds la fetch ??

        const divIngredient = createMarkup('div', '', formEdit, [{class: 'ingredient'}]);

        //Méthos 2 
        //Name ingredients
        createMarkup('label', 'Ingrédient N°' + cpt, divIngredient, [{for: 'ingName'}, {class: 'form-label'}]);
        createMarkup('input', '', divIngredient, [{type: 'text'}, {id: 'ingName'}, {name: 'ingName'}, {value: `${ing.name}`}, {class: 'form-control  name'}])

        //Number ingredients
        // createMarkup('label', 'Quantité pour l\'Ingrédient N°' + cpt, formEdit, [{ for: 'ingQ' }, { class: 'form-label' }]);
        createMarkup('input', '', divIngredient, [{type: 'number'}, {id: 'ingQ'}, {name: 'ingQ'}, {value: `${ing.quantity}`}, {class: 'form-control  quantity'}])

        //Unit Ingredient ??? Avoir avec Hamza
        // createMarkup('label', 'l\'Unité pour l\'Ingrédient N°' + cpt, formEdit, [{ for: 'ingUnit' }, { class: 'form-label' }]);
        createMarkup('input', '', divIngredient, [{type: 'text'}, {id: 'ingUnit'}, {name: 'ingUnit'}, {value: `${ing.unit}`}, {class: 'form-control unit '}])


        // const selectEdit = createMarkup('select', '', formEdit, [{ class: "form-select" }]);
        // createMarkup('option', 'Sélectionnez une unité', selectEdit, [{ class: "selected" }]);

        // //loop of the units
        // // console.log(units);
        // for (const element in units) {
        //     // console.log(`Vous etes ici , ${units[element]}`)
        //     createMarkup('option', units[element], selectEdit, [{ value: element }]);
        // }

    });

    // Create Btn submit "du form "
    const btnSubmit = createMarkup('button', 'Modifier', formEdit, [{class: 'btn btn-primary'}, {type: 'submit'}])


    // // Submit le form
    // formEdit.addEventListener('submit', (e) => {
    //     e.preventDefault();

    //     console.log(e);
    //     //Je récupère la modif de la saisie du titleform => ok
    //     //Méthod 2
    //     // console.log('Formulaire : ',formEdit);
    //     // console.log(formEdit.titleRecipe.value);
    //     // console.log(formEdit.ingName.value);
    //     // console.log(formEdit.ingQ);
    //     // console.log(formEdit.ingUnit);

    //     // Voir plus haut Method 1
    //     // console.log(formEdit.ingName); //=> recupère tous les ingrédients mais à voir comment je peux dispacher chaque element
    //     // const formIngrs = formEdit.ingName;
    //     // formIngrs.forEach(element => {
    //     //     console.log('element: ', element.value);
    //     // });
    // })


    btnSubmit.addEventListener("click", (e) => {
        e.preventDefault();

        // Collecter les données saisies dans le formulaire
        const title = inputTitle.value;
        const ingredients = [];

        const ingredientInputs = document.querySelectorAll(".ingredient");
        ingredientInputs.forEach((input) => {
            const name = input.querySelector(".name").value;
            const quantity = input.querySelector(".quantity").value;
            const unit = input.querySelector(".unit").value;
            ingredients.push({name, quantity, unit});
        });
        // if (name && quantity && unit) {
        //     const name = nameInput.value;
        //     const quantity = quantityInput.value;
        //     const unit = unitInput.value;
        //     ingredients.push({ name, quantity, unit });
        // }

        const updatedRecipe = {title, ingredients};

        update(updatedRecipe, id).then(res => res.json())
    });


    // Appeler la fonction fetchUpdate pour envoyer les modifications au serveur
    // fetchUpdate(recipeId, updatedRecipe);
    // });


    // "Lancement bootstrapModal => formedit"
    editModal = new bootstrap.Modal(document.getElementById('modalUpdate'), {});
    editModal.show(); // => Modal l'affiche


    // START FETCH PUT
    // console.log("Start fetchUpadte");

    async function update(updatedRecipe, id) {
        try {
            // SOUCIS AU NIVEAU DE LA ROUTE EROR 404 DS CONSOLE
            fetch(`https://localhost:4343/recipes/update/${id}`, {

                method: "PATCH",
                headers:
                    {
                        "content-type": "application/json",

                    },
                body: JSON.stringify(updatedRecipe)
            })
        } catch (error) {
            console.log(error.message)
        }

    }


// ////////////////////////////////////////////////////////////////////////////////////////////////

// Code pour fetchUpdate.js

// import { createMarkup } from "../untils/createMarkup.js";
// import { units } from "../untils/units.js";

// export function fetchUpdate(id, recipe) {
//     const ingredientsForm = recipe.ingredients;

//     let editModal = document.getElementById('modalUpdate');

//     const divDialog = createMarkup('div', '', editModal, [{ class: 'modal-dialog' }]);
//     const divContent = createMarkup('div', '', divDialog, [{ class: 'modal-content' }]);
//     const divHeader = createMarkup('div', '', divContent, [{ class: 'modal-header' }]);

//     const formEdit = createMarkup('form', '', divHeader, [{ class: '' }]);

//     const btnClose = createMarkup('button', '', formEdit, [{ class: 'btn-close' }, { 'data-bs-dismiss': 'modal' }, { 'aria-label': 'Close' }])

//     const labelTilte = createMarkup('label', 'Titre de la Recette', formEdit, [{ for: 'titleRecipe' }, { class: 'form-label' }]);
//     const inputTitle = createMarkup('input', '', formEdit, [{ type: 'text' }, { id: 'titleRecipe' }, { name: 'titleRecipe' }, { value: `${recipe.title}` }, { class: 'form-control' }]);

//     let cpt = 0;
//     ingredientsForm.forEach(ing => {
//         cpt++;
//         createMarkup('label', 'Ingrédient N°' + cpt, formEdit, [{ for: `ingName${cpt}` }, { class: 'form-label' }]);
//         createMarkup('input', '', formEdit, [{ type: 'text' }, { id: `ingName${cpt}` }, { name: `ingName${cpt}` }, { value: `${ing.name}` }, { class: 'form-control' }]);

//         createMarkup('label', 'Quantité pour l\'Ingrédient N°' + cpt, formEdit, [{ for: `ingQ${cpt}` }, { class: 'form-label' }]);
//         createMarkup('input', '', formEdit, [{ type: 'number' }, { id: `ingQ${cpt}` }, { name: `ingQ${cpt}` }, { value: `${ing.quantity}` }, { class: 'form-control' }]);

//         createMarkup('label', 'l\'Unité pour l\'Ingrédient N°' + cpt, formEdit, [{ for: `ingUnit${cpt}` }, { class: 'form-label' }]);
//         createMarkup('input', '', formEdit, [{ type: 'text' }, { id: `ingUnit${cpt}` }, { name: `ingUnit${cpt}` }, { value: `${ing.unit}` }, { class: 'form-control' }]);

//         const selectEdit = createMarkup('select', '', formEdit, [{ class: "form-select" }]);
//         createMarkup('option', 'Sélectionnez une unité', selectEdit, [{ class: "selected" }]);
//         for (const element in units) {
//             createMarkup('option', units[element], selectEdit, [{ value: element }]);
//         }
//     });

//     const btnSubmit = createMarkup('button', 'Modifier', formEdit, [{ class: 'btn btn-primary' }, { type: 'submit' }])

//     formEdit.addEventListener('submit', (e) => {
//         e.preventDefault();

//         const formData = new FormData(formEdit);
//         const titleRecipe = formData.get('titleRecipe');
//         const ingredients = [];
//         for (let i = 1; i <= cpt; i++) {
//             const ingName = formData.get(`ingName${i}`);
//             const ingQ = formData.get(`ingQ${i}`);
//             const ingUnit = formData.get(`ingUnit${i}`);
//             ingredients.push({ name: ingName, quantity: ingQ, unit: ingUnit });
//         }

//         console.log('Titre de la recette: ', titleRecipe);
//         console.log('Ingrédients: ', ingredients);

//         fetch(`https://localhost:4343/recipes/update/${id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 "title": titleRecipe,
//                 "ingredients": ingredients
//             })
//         })
//             .then(res => res.json())
//             .then(data => {
//                 console.log("Réponse du serveur: ", data);
//                 // Traite la réponse du serveur (si nécessaire)
//                 // Par exemple, tu peux recharger la page pour afficher les recettes mises à jour
//                 location.href = "https://localhost:4343/home";
//             })
//             .catch(error => {
//                 console.error("Erreur lors de la mise à jour: ", error);
//             });
//     });

//     editModal = new bootstrap.Modal(document.getElementById('modalUpdate'), {});
//     editModal.show();
}
