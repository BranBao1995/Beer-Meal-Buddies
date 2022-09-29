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
modalEl = document.querySelector("#modalBtn");
modalDescrption = document.querySelector(".description");

// function to fetch data
function fetchData() {
  removeElements();

  let searchParam = document.location.search;

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
            $(".tiny.modal").modal("show");
          }

          console.log(data);
        });
      } else {
        $(".tiny.modal").modal("show");
      }
    })
    .catch(function (error) {
      $(".tiny.modal").modal("show");
    });
}

function displayRecipe(recipes) {
  recipeName.textContent = recipes.hits[0].recipe.label;
  const recipePhoto = document.createElement("img");
  recipePhoto.setAttribute("alt", "recipe photo");
  recipePhoto.setAttribute("class", "custom-recipe-photo");
  recipePhoto.setAttribute("src", recipes.hits[0].recipe.image);
  namePhotoContainer.appendChild(recipePhoto);

  let str = recipes.hits[0].recipe.cuisineType[0];
  let fisrtLetterUpper = str.slice(0, 1).toUpperCase(); // capitalize the first letter of each word.

  cuisineType.textContent =
    "Cuisine type: " +
    fisrtLetterUpper +
    str.slice(1, str.length).toLowerCase(); // needs to capitalize the first letter of each word.
  calories.textContent =
    "Calories: " + recipes.hits[0].recipe.calories.toFixed(0) + " kJ";

  if (
    recipes.hits[0].recipe.totalTime >= 0 &&
    recipes.hits[0].recipe.totalTime < 45
  ) {
    timeRequired.textContent = "Preparation time: ~ 30 minutes";
  } else if (
    recipes.hits[0].recipe.totalTime >= 45 &&
    recipes.hits[0].recipe.totalTime < 60
  ) {
    timeRequired.textContent = "Preparation time: ~ 45 minutes";
  } else if (
    recipes.hits[0].recipe.totalTime >= 60 &&
    recipes.hits[0].recipe.totalTime < 90
  ) {
    timeRequired.textContent = "Preparation time: ~ 60 minutes";
  } else if (
    recipes.hits[0].recipe.totalTime >= 90 &&
    recipes.hits[0].recipe.totalTime < 120
  ) {
    timeRequired.textContent = "Preparation time: ~ 90 minutes";
  } else if (recipes.hits[0].recipe.totalTime >= 120) {
    timeRequired.textContent = "Preparation time: > 120 minutes";
  }

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

// returnButton.addEventListener("click", function () {
//   modal.style.display = "none";
//   location.assign("./Beer.html");
// });

modalEl.addEventListener("click", function () {
  $(".tiny.modal").modal("hide");
  location.assign("./Beer.html");
});

fetchData();
