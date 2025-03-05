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
    boxNameImg.setAttribute("class", "boxnameimg");

    const iconDescription = document.createElement("img");
    iconDescription.setAttribute("class", "iconDescription");
    iconDescription.src = "descriptionicon.svg";
    const charName = document.createElement("button");
    charName.addEventListener("click", showDescription);
    charName.setAttribute("id", character.id);
    charName.setAttribute("tabindex", "0");
    charName.setAttribute("aria-label", "Descripción de " + character.name);
    charName.setAttribute("class", "characterName");
    charName.innerText = character.name;

    charName.append(iconDescription);

    const charImg = document.createElement("img");
    charImg.setAttribute("class", "imgCharacter");
    charImg.src = character.image;
    
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
            planetName.setAttribute("class", "characterPlanetName");
            let planetImage = document.createElement("img");
            planetImage.setAttribute("class", "characterPlanetImage");
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
const prefixRace = "race=";
const prefixGen = "gender=";
const prefixAffi = "affiliation=";

function createFilters(){
    const allRaces = document.getElementById("filterListRace");
    const allGenders = document.getElementById("filterListGen");
    const allAffi = document.getElementById("filterListAffi");

    filterRace.forEach(race => {
        const singleRace = document.createElement("li");
        singleRace.setAttribute("class", "subitemNav"); 
        singleRace.innerText = race;
        singleRace.addEventListener("click", () => createUrlFilterTail(prefixRace + race))
        allRaces.appendChild(singleRace);   
    });

    filterGen.forEach(gender => {
        const singleGender = document.createElement("li");
        singleGender.setAttribute("class", "subitemNav");  
        singleGender.innerText = gender;
        singleGender.addEventListener("click", () => createUrlFilterTail(prefixGen + gender))
        allGenders.appendChild(singleGender);   
    });

    filterAffi.forEach(affiliation => {
        const singleAffi = document.createElement("li");
        singleAffi.setAttribute("class", "subitemNav");
        singleAffi.innerText = affiliation;
        singleAffi.addEventListener("click", () => createUrlFilterTail(prefixAffi + affiliation))
        allAffi.appendChild(singleAffi);   
    });
}

let filtersArray = [];
let urlTail = "";

function createUrlFilterTail(singleFilter){
    filtersArray.push(singleFilter);

    filtersArray.forEach(filter => {
        if (filter == filtersArray[0]){
            urlTail = filter;
        }
        else {
            urlTail += "&" + filter;
        }
    });

    showFilters();
};

function showFilters(){
    const filtersBox = document.getElementById("filtersBox");
    filtersBox.innerHTML = "";

    filtersArray.forEach(filter => {
        const singleFilter = document.createElement("button");
        singleFilter.setAttribute("class", "singlefilterBox");
        singleFilter.innerText = filter
        filtersBox.appendChild(singleFilter);
    });

    filtersBox.style.visibility = "visible";
    filterCharacters(urlTail);
}

function filterCharacters(urlTail){
    fetch(API_URL + "/characters?" + urlTail)
    .then((response) => response.json())
    .then((data) => {
        charactersGrid.innerHTML = "";
        upPage();

        if (data.length == 0){
            noResults();
        }
        
        data.forEach(character => {
            createCharac(character);
        });

        document.getElementById("paginationButtons").style.visibility = "collapse";
    });
}

function noResults(){
    const noResults = document.createElement("p");
    noResults.style.color = "white";
    noResults.style.textAlign = "center";
    noResults.innerText = "No se han encontrado resultados con esos filtros. Volviendo a la página principal...";
    charactersGrid.appendChild(noResults);

    setTimeout(() => {
        location.reload();
    }, 4000);
}

let characterDescript = document.createElement("section");
characterDescript.setAttribute("class", "characterDescriptionBox");
characterDescript.addEventListener("click", hideDescription);

function showDescription(event){ 
    const idDescription = event.target.id;

    if (characterDescript.style.visibility == "visible"){
        characterDescript.style.visibility = "hidden";
    }
    else{
        characterDescript.innerHTML = "";
    
    fetch(API_URL + "/characters/" + idDescription)
        .then((response) => response.json())
        .then((data) => {
            let chDescription = document.createElement("p");
            chDescription.innerText = data.description;
            let alerttoHide = document.createElement("p");
            alerttoHide.setAttribute("class", "alerttoHide");
            alerttoHide.innerText = "Click to hide";
            chDescription.append(alerttoHide);
            characterDescript.append(alerttoHide, chDescription);
        });

    const inboxDescription = document.getElementById(idDescription);
    inboxDescription.append(characterDescript);

    characterDescript.style.visibility = "visible";
    }
}

function hideDescription(){
    characterDescript.style.visibility = "hidden";
}   

function upPage(){
    window.scrollTo({top:0, behavior:"smooth"});
}