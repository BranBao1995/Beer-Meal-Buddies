// 3fe55cbd  ID
// 43119aedb2ca6b9807fa142f62b069e4   API KEY

// https://api.edamam.com/api/recipes/v2    BASE URL

const recipeName = document.querySelector(".custom-recipe-name");
const recipePhoto = document.querySelector(".custom-recipe-photo");
const cuisineType = document.querySelector(".custom-recipe-cuisine");
const calories = document.querySelector(".custom-recipe-calories");
const timeRequired = document.querySelector(".custom-recipe-time");
const recipeYield = document.querySelector(".custom-recipe-yield");
const ingrList = document.querySelector(".custom-recipe-ingrList");

const modal = document.querySelector(".custom-modal");
const errorMsg = document.querySelector(".custom-errorMsg");
const returnButton = document.querySelector(".custom-return");

function fetchData() {
  removeElements();

  fetch(
    "https://api.edamam.com/api/recipes/v2?q=beef&type=any&ingr=5-10&app_id=3fe55cbd&app_key=43119aedb2ca6b9807fa142f62b069e4"
  )
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          if (data.hits.length !== 0) {
            displayRecipe(data);
          } else {
            errorMsg.textContent = "Sorry, no matching results";
            modal.style.display = "block";
          }

          console.log(data);
        });
      } else {
        errorMsg.textContent = "Error: " + response.statusText;
        modal.style.display = "block";
      }
    })
    .catch(function (error) {
      errorMsg.textContent = "Error: " + response.statusText;
      modal.style.display = "block";
    });
}

function displayRecipe(recipes) {
  let randomIndex = Math.floor(Math.random() * (recipes.hits.length - 1));

  recipeName.textContent = recipes.hits[randomIndex].recipe.label;
  recipePhoto.setAttribute("src", recipes.hits[randomIndex].recipe.image);

  let str = recipes.hits[randomIndex].recipe.cuisineType[0];
  let fisrtLetterUpper = str.slice(0, 1).toUpperCase();

  cuisineType.textContent =
    fisrtLetterUpper + str.slice(1, str.length).toLowerCase(); // needs to capitalize the first letter of each word.
  calories.textContent =
    recipes.hits[randomIndex].recipe.calories.toFixed(0) + " kJ";

  timeRequired.textContent =
    recipes.hits[randomIndex].recipe.totalTime + " minutes";
  recipeYield.textContent = "Serves " + recipes.hits[randomIndex].recipe.yield;

  for (
    let i = 0;
    i < recipes.hits[randomIndex].recipe.ingredientLines.length;
    i++
  ) {
    const ingredient = document.createElement("li");
    ingredient.setAttribute("class", "custom-recipe-ingr");
    ingredient.textContent =
      recipes.hits[randomIndex].recipe.ingredientLines[i];

    ingrList.appendChild(ingredient);
  }

  console.log(recipes.hits[randomIndex]);
}

function removeElements() {
  const ingrElements = document.querySelectorAll(".custom-recipe-ingr");

  for (let i = 0; i < ingrElements.length; i++) {
    ingrElements[i].remove();
  }
}

returnButton.addEventListener("click", function () {
  modal.style.display = "none";
  location.assign("./Beer.html");
});

fetchData();
