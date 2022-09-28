 


function beerSelect(){
    let selectedBeerId = document.getElementById("#beer").data-attribute
    localStorage.setItem("beer", selectedBeerId)
}

document.querySelector("#beer").addEventListener("click", function(){
    let selectedBeerId = document.getElementById("beerSelection").value
    console.log(selectedBeerId)
    localStorage.setItem("beer", selectedBeerId)

    let queryString = "./beer.html"

    location.assign(queryString)
})
