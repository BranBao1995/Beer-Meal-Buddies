// 3fe55cbd  ID
// 43119aedb2ca6b9807fa142f62b069e4   API KEY

// https://api.edamam.com/api/recipes/v2    BASE URL

function fetchData() {
  let apiUrl =
    "https://api.edamam.com/api/recipes/v2?q=beef&type=any&ingr=5-10&app_id=3fe55cbd&app_key=43119aedb2ca6b9807fa142f62b069e4";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          if (data.hits.length !== 0) {
            displayRecipe(data);
          } else {
            alert("No matched results!");
          }

          console.log(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to fetch");
    });
}

function displayRecipe(recipes) {
  const recipeName = document.querySelector(".custom-recipe-name");
  const recipePhoto = document.querySelector(".custom-recipe-photo");
  const cuisineType = document.querySelector(".custom-recipe-cuisine");
  const calories = document.querySelector(".custom-recipe-calories");
  const timeRequired = document.querySelector(".custom-recipe-time");
  const recipeYield = document.querySelector(".custom-recipe-yield");
  const ingrList = document.querySelector(".custom-recipe-ingrList");

  let randomIndex = Math.floor(Math.random() * (recipes.hits.length - 1));

  recipeName.textContent = recipes.hits[randomIndex].recipe.label;
  recipePhoto.setAttribute("src", recipes.hits[randomIndex].recipe.image);

  cuisineType.textContent = recipes.hits[randomIndex].recipe.cuisineType[0]; // needs to capitalize the first letter of each word.
  calories.textContent =
    recipes.hits[randomIndex].recipe.calories.toFixed(0) + "kJ";

  console.log(recipes.hits[randomIndex]);
}

fetchData();
