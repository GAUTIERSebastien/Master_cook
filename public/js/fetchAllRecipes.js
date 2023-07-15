function fetchAllRecipes() {
    fetch('/allRecipes')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}
module.exports = fetchAllRecipes;
