const API_URL = "https://dragonball-api.com/api";

let pages = {
    current: `${API_URL}/planets?limit=10`,
    prev: "",
    next: "",
};

function showPlanets(){
    fetch(pages.current)
    .then((response) => response.json())
    .then((data) => {
        pages.prev = data.links.previous;
        pages.next = data.links.next;

        disablePageButtons();
        upPage();

        planetsGrid.innerHTML = "";
        data.items.forEach(planet => {
            createPlanet(planet);
        });
    })

    .catch((error) => {
        console.error("Error en la solicitud:", error);
    });
}


const planetsGrid = document.getElementById("dbPlanetsList");

async function createPlanet(planet) {
    const boxPlanet = document.createElement("article");
    boxPlanet.setAttribute("class", "dbPlanet");

    const planetImg = document.createElement("img");
    planetImg.setAttribute("class", "imgBackgroundPlanet");
    planetImg.src = planet.image;
    boxPlanet.style.backgroundImage = `url(${planetImg.src})`;
    boxPlanet.style.backgroundSize = "cover";

    const planetNameDescription = document.createElement("section");
    planetNameDescription.setAttribute("class", "planetNameDescription");
    const planetName = document.createElement("p");
    planetName.setAttribute("class", "planetName");
    planetName.innerText = planet.name;
    const planetDescription = document.createElement("p");
    planetDescription.setAttribute("class", "planetDescription");
    planetDescription.innerText = planet.description;
    planetNameDescription.append(planetName, planetDescription);

    const charactersPlanet = document.createElement("section");
    charactersPlanet.setAttribute("class", "charactersPlanet");

    await planetOriginCharacters(planet, charactersPlanet); 

    boxPlanet.append(planetNameDescription);
    planetsGrid.append(boxPlanet);
}

showPlanets();

function planetOriginCharacters(planet, charactersPlanet){
    return fetch("https://dragonball-api.com/api/planets/" + planet.id)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            // data.forEach((data) => {

            //     let singleCharacterPlanet = document.createElement("article");
            //     singleCharacterPlanet.setAttribute("class", "singleCharacterPlanet");

            //     let characterName = document.createElement("p");
            //     characterName.innerText = data.characters.name;
            //     let characterImage = document.createElement("img");
            //     characterImage.src = data.characters.image;
                
            //     singleCharacterPlanet.append(characterName, characterImage);
            
            //     charactersPlanet.append(singleCharacterPlanet);
            // });
            
        });
}

function toNextPage(){
    pages.current = pages.next;

    showPlanets();
}

function toPrevPage(){
    pages.current = pages.prev;

    showPlanets();
}

const nextPageButton = document.getElementById("nextB")
nextPageButton.addEventListener("click", toNextPage);
const prevPageButton = document.getElementById("prevB")
prevPageButton.addEventListener("click", toPrevPage);

function disablePageButtons(){
    if (pages.prev == ""){
        prevPageButton.setAttribute("disabled", true);
    }
    else{
        prevPageButton.removeAttribute("disabled");
    }

    if (pages.next == ""){
        nextPageButton.setAttribute("disabled", true)
    }
    else{
        nextPageButton.removeAttribute("disabled");
    }
}

function upPage(){
    window.scrollTo({top:0, behavior:"smooth"});
}