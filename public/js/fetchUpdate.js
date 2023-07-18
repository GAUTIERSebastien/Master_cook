import { createMarkup } from "../untils/createMarkup.js";

// Attention je n'ai pas gérer si on click plusieur fois sur modif => les modal réapparaissent à la suite 


export function fetchUpadate(id, recipe){
    console.log('ici dans function fetchUpadte: ', id);
    console.log('la dans function fetchUpadte : ', recipe);
    console.log('title dans function fetchUpadte : ', recipe.title);
    console.log('ingredients dans function fetchUpadte :', recipe.ingredients);
    const ingredientsForm = recipe.ingredients;



    let editModal = document.getElementById('modalUpdate');

    
    // Create modal with stye bootstrap
    const divDialog = createMarkup('div', '', editModal, [{ class: 'modal-dialog'}]);
    const divContent = createMarkup('div', '', divDialog, [{ class:'modal-content'}]);
    const divHeader = createMarkup('div', '', divContent, [{class:'modal-header'}]);



    // Start FormEdit

    //Create form modal bootstrap
    const formEdit = createMarkup('form', '', divHeader, [{class: ''}] );


    // Create "croix" => cancel
    const btnClose = createMarkup('button', '', divHeader, [{ class: 'btn-close' }, { 'data-bs-dismiss': 'modal' }, { 'aria-label': 'Close' }])

    

    // Create label + input for recipe.title
    const labelTilte = createMarkup('label', 'Titre de la Recette', formEdit, [{ for: 'titleRecipe' }, { class: 'form-label' }]);
    const inputTitle = createMarkup('input', '', formEdit, [{ type: 'text' }, { id: 'titleRecipe' }, { name: 'titleRecipe' }, { value: `${recipe.title}` }, { class: 'form-control' }]);



    //Start label + input Ingredients with 'compteur'
    let cpt = 0;
    ingredientsForm.forEach(ing => {

        //Display name
        console.log('list ingredients : ', ing.name);
        cpt ++
        

        // je n'arrive pas récupérer la valeur lors de la saisie
        // Method 1 : j'ai déjà essayer avec 1 seul label => je recupère la saisie mais comment l'envoyer ds la fetch ??

        //Méthos 2 
        //Name ingredients
        createMarkup('label', 'Ingrédient N°' + cpt, formEdit, [{ for: 'ingName' }, { class:'form-label'}]);
        createMarkup('input', '', formEdit, [{ type: 'text' }, { id: 'ingName' }, { name: 'ingName' }, { value: `${ing.name}` }, { class:'form-control'}])
        
        //Number ingredients
        createMarkup('label', 'Quantité pour l\'Ingrédient N°' + cpt, formEdit, [{ for: 'ingQ' }, { class: 'form-label' }]);
        createMarkup('input', '', formEdit, [{ type: 'number' }, { id: 'ingQ' }, { name: 'ingQ' }, { value: `${ing.quantity}` }, { class:'form-control'}])
        
        //Unit Ingredient ??? Avoir avec Hamza
        createMarkup('label', 'l\'Unité pour l\'Ingrédient N°' + cpt, formEdit, [{ for: 'ingUnit' }, { class: 'form-label' }]);
        createMarkup('input', '', formEdit, [{ type: 'text' }, { id: 'ingUnit' }, { name: 'ingUnit' }, { value: `${ing.unit}` }, { class:'form-control'}])
    });


    // Create Btn submit "du form "
    const btnSubmit = createMarkup('button', 'Modifier', formEdit, [{class: 'btn btn-primary'}, {type:'submit'}])


    // Submit le form
    formEdit.addEventListener('submit', (e) => {
        e.preventDefault();
        
        //Je récupère la modif de la saisie du titleform => ok
        //Méthod 2
        console.log(formEdit.titleRecipe.value);
        console.log(formEdit.ingName.value);
        console.log(formEdit.ingQ.value);
        console.log(formEdit.ingUnit.value);

        // Voir plus haut Method 1
        // console.log(formEdit.ingName); //=> recupère tous les ingrédients mais à voir comment je peux dispacher chaque element
        // const formIngrs = formEdit.ingName;
        // formIngrs.forEach(element => {
        //     console.log('element: ', element.value);
        // });
    })



    // "Lancement bootstrapModal => formedit"
    editModal = new bootstrap.Modal(document.getElementById('modalUpdate'), {});
    editModal.show(); // => Modal l'affiche

        
    
    // START FETCH PUT
    // console.log("Start fetchUpadte");


    // SOUCIS AU NIVEAU DE LA ROUTE EROR 404 DS CONSOLE
    // fetch(`https://localhost:4343/recipes/update/${id}`, {

    //     method: "PUT",
    //     // headers:
    //     // {
    //     //     "content-type": "application/json",

    //     // },
    //     body: {
    //         "title": formEdit.titleRecipe.value,
    //     }
    // })
    //     .then(res => res.json())

}