//selection = get local storage data attribute
recipeEl = document.querySelector("#recipeSearch");
selection = localStorage.getItem("beer");
homeButtonEl = document.querySelector(".custom-homebtn")
modalEl = document.querySelector("#modalBtn")

fetch("https://api.punkapi.com/v2/beers/" + selection)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    displayBeer(data);
  });

function displayBeer(data) {
  const name = data[0].name;
  const tagline = data[0].tagline;
  const image = data[0].image_url;
  const description = data[0].description;
  const firstBrewed = data[0].first_brewed;
  const mealPairing1 = data[0].food_pairing[0];
  const mealPairing2 = data[0].food_pairing[1];
  const mealPairing3 = data[0].food_pairing[2];

  document.querySelector("#custom-beername").innerText = name
  document.querySelector("#tagline").innerText = tagline
  document.querySelector("#image").src = image
  document.querySelector("#description").innerText = description
  document.querySelector("#firstBrewed").innerText = "First brewed in: " + firstBrewed
  document.querySelector("#mP1").innerText = mealPairing1
  document.querySelector("#mP2").innerText = mealPairing2
  document.querySelector("#mP3").innerText = mealPairing3
}

recipeEl.addEventListener("submit", function (event) {
  event.preventDefault();
  let recipe = document.querySelector("#recipeInput").value;
  if (recipe === ""){
    $('.tiny.modal')
  .modal('show')
  } else {
  let recipeArr = recipe.split(" ");
  let q = recipeArr.join("-");
  let queryString = "./Recipe.html?q=" + q;
  location.assign(queryString);}
});

homeButtonEl.addEventListener("click", function() {
  homePage = "./Home.html"
  location.assign(homePage)
})

modalEl.addEventListener("click", function (){
  $('.tiny.modal')
  .modal('hide')
})