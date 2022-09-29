// 3fe55cbd  ID
// 43119aedb2ca6b9807fa142f62b069e4   API KEY

// https://api.edamam.com/api/recipes/v2    BASE URL

const recipeName = document.querySelector(".custom-recipe-name");

const cuisineType = document.querySelector(".custom-recipe-cuisine");
const calories = document.querySelector(".custom-recipe-calories");
const timeRequired = document.querySelector(".custom-recipe-time");
const recipeYield = document.querySelector(".custom-recipe-yield");
const ingrList = document.querySelector(".custom-recipe-ingrList");
const namePhotoContainer = document.querySelector(".custom-recipe-name-photo");

const modal = document.querySelector(".custom-modal");
const errorMsg = document.querySelector(".custom-errorMsg");
const returnButton = document.querySelector(".custom-return");

let searchParam = document.location.search;

console.log(searchParam);

function fetchData() {
  removeElements();

  fetch(
    "https://api.edamam.com/api/recipes/v2" +
      searchParam +
      "&type=any&ingr=5-10&app_id=3fe55cbd&app_key=43119aedb2ca6b9807fa142f62b069e4"
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
  // let randomIndex = Math.floor(Math.random() * (recipes.hits.length - 1));

  recipeName.textContent = recipes.hits[0].recipe.label;
  const recipePhoto = document.createElement("img");
  recipePhoto.setAttribute("alt", "recipe photo");
  recipePhoto.setAttribute("class", "custom-recipe-photo");
  recipePhoto.setAttribute("src", recipes.hits[0].recipe.image);
  namePhotoContainer.appendChild(recipePhoto);

  let str = recipes.hits[0].recipe.cuisineType[0];
  let fisrtLetterUpper = str.slice(0, 1).toUpperCase(); // capitalize the first letter of each word.

  cuisineType.textContent =
    fisrtLetterUpper + str.slice(1, str.length).toLowerCase(); // needs to capitalize the first letter of each word.
  calories.textContent = recipes.hits[0].recipe.calories.toFixed(0) + " kJ";

  timeRequired.textContent = recipes.hits[0].recipe.totalTime + " minutes";
  recipeYield.textContent = "Serves " + recipes.hits[0].recipe.yield;

  for (let i = 0; i < recipes.hits[0].recipe.ingredientLines.length; i++) {
    const ingredient = document.createElement("li");
    ingredient.setAttribute("class", "custom-recipe-ingr");
    ingredient.textContent = recipes.hits[0].recipe.ingredientLines[i];

    ingrList.appendChild(ingredient);
  }

  console.log(recipes.hits[0]);
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
