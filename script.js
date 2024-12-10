const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchbtn")
const recipeContainer = document.querySelector(".recipe-container")
// const recipeDetails = document.querySelector(".recipe-details")
const recipeDetailsContent = document.querySelector(".recipe-details-content")
const recipeCloseBtn = document.querySelector(".recipe-close-btn")

// axios
//function to get recipe
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h3>Fetching Recipes...</h3>"
    try {
        const data = await fetch(`https://www.themealdb.com/api/json//v1/1/search.php?s=${query}`);
        // API se response milta hai
        const response = await data.json();
        recipeContainer.innerHTML = "";
        // Response mein `meals` array hota hai
        response.meals.forEach((meal) => {
            // Har meal ka ek div banate hain jisme us meal ki details show karenge
            const recipeDiv = document.createElement('div')
            recipeDiv.classList.add('recipe');
            // Meal ke details ko HTML ke andar display karte hain
            recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}">
                    <h3><span>${meal.strMeal}</span> Meal</h3>
                    <p><span>${meal.strArea}</span> Area</p>
                     <p>Belongs To <span>${meal.strCategory}</span> Category</p>`

                     // Save aur View buttons add karte hain
            const button = document.createElement('button');
            button.textContent = "View Recipe"
            recipeDiv.appendChild(button);

            //adding eventlistener for button
            button.addEventListener('click', (e) => {
                openRecipePopup(meal);// Meal ka detailed view open hoga
            })

            recipeContainer.appendChild(recipeDiv);// Recipe ko container mein add karte hain
        });
    }
    catch (error) {
        recipeContainer.innerHTML = "<h2>Error in Fetching Recipes...</h2>"
    }
    // console.log(response.meals[0]);



}

//Function to fetch ingredients  and measurment 
const fetchIngredients = (meal) => {
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientList;

}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `<h2 class="recipeName">${meal.strMeal}</h2>
                                      <h3>Ingredients:</h3>
                                      <ul class="ingredientList">${fetchIngredients(meal)}</ul>
                                      <div class="recipeInstructions">
                                      <h3>Instructions:</h3>
                                      <p>${meal.strInstructions}</p>
                                      </div>
    `

    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', (e) => {
    recipeDetailsContent.parentElement.style.display = "none"
})

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Type The Meal in the Search Box.</h2>`
        return;
    }
    fetchRecipes(searchInput);
    // console.log("button clicked");

})