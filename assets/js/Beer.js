//selection = get local storage data attribute
recipeEl = document.querySelector("#recipeSearch")
selection = localStorage.getItem("beer")

fetch(
    "https://api.punkapi.com/v2/beers/" + selection
).then((response) => {
return response.json()
})
.then(data => {
    console.log(data)
    displayBeer(data)
})

function displayBeer(data) {
    const name = data[0].name
    const tagline = data[0].tagline
    const image = data[0].image_url
    const description = data[0].description
    const firstBrewed =  data[0].first_brewed
    const mealPairing1 = data[0].food_pairing[0]
    const mealPairing2 = data[0].food_pairing[1]
    const mealPairing3 = data[0].food_pairing[2]

    console.log(name)
    console.log(tagline)
    console.log(image)
    console.log(description)
    console.log(firstBrewed)
    console.log(mealPairing1)
    console.log(mealPairing2)
    console.log(mealPairing3)

}



recipeEl.addEventListener("submit", function(){
    event.preventDefault()
    let recipe = document.querySelector("#recipeInput").value
    console.log(recipe)
    let recipeArr = recipe.split(" ")
    let q = recipeArr.join("-")
    let queryString = "./Recipe.html?q=" + q
    location.assign(queryString)
})