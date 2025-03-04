const API_URL = "https://dragonball-api.com/api";

let pages = {
    current: `${API_URL}/characters?limit=10`,
    prev: "",
    next: "",
};

showCharacters();

function showCharacters(){
    fetch(pages.current)
    .then((response) => response.json())
    .then((data) => {
        pages.prev = data.links.previous;
        pages.next = data.links.next;

        disablePageButtons();
        upPage();

        charactersGrid.innerHTML = "";
        data.items.forEach(character => {
            createCharac(character);
        });
    })

    .catch((error) => {
        console.error("Error en la solicitud:", error);
    });
}

async function createCharac(character) {
    const boxChar = document.createElement("article");
    boxChar.setAttribute("class", "dbCharacter");

    const boxNameImg = document.createElement("section");
    boxNameImg.setAttribute("class", "boximginfo");

    const charImg = document.createElement("img");
    charImg.setAttribute("class", "imgCharacter");
    charImg.src = character.image;
    const charName = document.createElement("p");
    charName.setAttribute("id", character.id);
    charName.setAttribute("class", "characterName");
    charName.innerText = character.name;
    charName.addEventListener("mouseover", showDescription);
    charName.addEventListener("mouseout", hideDescription);

    boxNameImg.append(charName, charImg);

    const moreInfo = document.createElement("section");
    moreInfo.setAttribute("class", "moreinfoBox");
    
    const charRace = document.createElement("p");
    charRace.innerText = character.race;
    const charAffiliation = document.createElement("p")
    charAffiliation.innerText = character.affiliation;
    const charKi = document.createElement("p");
    charKi.innerText = "KI: " + character.ki;
    const charmaxKi = document.createElement("p");
    charmaxKi.innerText = "maxKI: " + character.maxKi;

    let planetInfo = document.createElement("section");
    planetInfo.setAttribute("class", "planetInfo");

    await characterOriginPlanet(character, planetInfo);

    moreInfo.append(charRace, charAffiliation, charKi, charmaxKi, planetInfo);
    boxChar.append(boxNameImg, moreInfo);
    charactersGrid.append(boxChar);
}

function characterOriginPlanet(character, planetInfo){
    return fetch("https://dragonball-api.com/api/characters/" + character.id)
        .then((response) => response.json())
        .then((data) => {
            let planetName = document.createElement("p");
            planetName.innerText = data.originPlanet.name;
            planetName.setAttribute("class", "planetName");
            let planetImage = document.createElement("img");
            planetImage.setAttribute("class", "imgplanet");
            planetImage.src = data.originPlanet.image;
            
            planetInfo.append(planetName, planetImage);
        });
}


const charactersGrid = document.getElementById("dbList");

const searchInput = document.getElementById("inputDB");
searchInput.addEventListener("input", searchCharacters);

const nextPageButton = document.getElementById("nextB")
nextPageButton.addEventListener("click", toNextPage);
const prevPageButton = document.getElementById("prevB")
prevPageButton.addEventListener("click", toPrevPage);

function toNextPage(){
    pages.current = pages.next;

    showCharacters();
}

function toPrevPage(){
    pages.current = pages.prev;

    showCharacters();
}

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

function searchCharacters(){
    const searchString = document.getElementById("inputDB").value.toLowerCase();

    if (searchString == ""){
        showCharacters();
    }
    else{
        fetch("https://dragonball-api.com/api/characters?name=" + searchString)
        .then((response) => response.json())
        .then((data) => {
            charactersGrid.innerHTML = "";
            upPage();
            
            data.forEach(character => {
                createCharac(character);
        });
        });

        document.getElementById("paginationButtons").style.visibility = "collapse";
    }
}


let filterRace = [];
let filterGen = [];
let filterAffi = [];

function saveFilters(){
    fetch("https://dragonball-api.com/api/characters?limit=1000")
    .then((response) => response.json())
    .then((data) => {
        
        data.items.forEach(character => {
            if ((filterRace.includes(character.race) == false)){
                filterRace.push(character.race);
            }

            if ((filterGen.includes(character.gender) == false)){
                filterGen.push(character.gender);
            }

            if ((filterAffi.includes(character.affiliation) == false)){
                filterAffi.push(character.affiliation);
            }
        });
        createFilters();
    });
}

saveFilters();

function createFilters(){
    const allRaces = document.getElementById("filterListRace");
    const allGenders = document.getElementById("filterListGen");
    const allAffi = document.getElementById("filterListAffi");

    filterRace.forEach(race => {
        const singleRace = document.createElement("li");
        singleRace.setAttribute("class", "subitemNav");
        singleRace.innerText = race;
        singleRace.addEventListener("click", () => createUrlFilterTail("race=" + race))
        allRaces.appendChild(singleRace);   
    });

    filterGen.forEach(gender => {
        const singleGender = document.createElement("li");
        singleGender.setAttribute("class", "subitemNav");
        singleGender.innerText = gender;
        singleGender.addEventListener("click", () => createUrlFilterTail("gender=" + gender))
        allGenders.appendChild(singleGender);   
    });

    filterAffi.forEach(affiliation => {
        const singleAffi = document.createElement("li");
        singleAffi.setAttribute("class", "subitemNav");
        singleAffi.innerText = affiliation;
        singleAffi.addEventListener("click", () => createUrlFilterTail("affiliation=" + affiliation))
        allAffi.appendChild(singleAffi);   
    });
}

let filtersArray = [];
let urlTail = "";

function createUrlFilterTail(singleFilter){
    filtersArray.push(singleFilter);

    if (filtersArray.indexOf(singleFilter) != (filtersArray.length - 1)){
            urlTail += singleFilter
    }
    else{
        urlTail += saveFilters + "&";
    }

    console.log(filtersArray);
    console.log(urlTail);

    filterCharacters(urlTail)
}

function filterCharacters(urlTail){
    fetch(API_URL + "/characters?" + urlTail)
    .then((response) => response.json())
    .then((data) => {
        charactersGrid.innerHTML = "";
        upPage();
        
        data.forEach(character => {
            createCharac(character);
        });

        document.getElementById("paginationButtons").style.visibility = "collapse";
    });
}

let characterInfo = document.createElement("section");
characterInfo.setAttribute("class", "characterInfo");

function showDescription(event){ 
    const idDescription = event.target.id;
    
    characterInfo.innerHTML = "";
    
    fetch("https://dragonball-api.com/api/characters/" + idDescription)
        .then((response) => response.json())
        .then((data) => {
            let chDescription = document.createElement("p");
            chDescription.setAttribute("class", "characterDescription");


            let planetName = document.createElement("p");
            let planetDescription = document.createElement("p");
            let planetImage = document.createElement("img");
            planetImage.setAttribute("class", "imgplanet");

            chDescription.innerText = data.description
            planetName.innerText = data.originPlanet.name;
            planetDescription.innerText = data.originPlanet.description;
            planetImage.src = data.originPlanet.image;

            let planetInfo = document.createElement("section");
            planetInfo.setAttribute("class", "planetInfo")
            planetInfo.append(planetName, planetDescription, planetImage)

            characterInfo.append(chDescription, planetInfo)
        });

    charactersGrid.append(characterInfo);
    characterInfo.style.visibility = "visible";
}
    
function hideDescription(){
    characterInfo.style.visibility = "hidden";
}

function upPage(){
    window.scrollTo({top:0, behavior:"smooth"});
}