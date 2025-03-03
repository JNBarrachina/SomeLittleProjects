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

function createCharac(character) {
    const boxChar = document.createElement("article");
    boxChar.setAttribute("class", "dbCharacter");

    const charImg = document.createElement("img");
    charImg.setAttribute("class", "imgCharacter");
    charImg.src = character.image;

    const charName = document.createElement("p");
    charName.setAttribute("id", character.id);
    charName.setAttribute("class", "characterName");
    charName.innerText = character.name;
    charName.addEventListener("mouseover", showDescription);
    charName.addEventListener("mouseout", hideDescription);

    
    const charKi = document.createElement("p");
    charKi.innerText = character.ki;
    const charRace = document.createElement("p");
    charRace.innerText = character.race;
    const charGen = document.createElement("p");
    charGen.innerText = character.gender;

    boxChar.append(charName, charImg, charKi, charRace, charGen);
    charactersGrid.append(boxChar);
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
    });
}

saveFilters();

function createFilters(){
    filterRace.forEach(race => {
        console.log(race);
        const allRaces = document.getElementById("filterListRace");
        const singleRace = document.createElement("li");
        singleRace.setAttribute("class", "subitemNav");
        singleRace.innerText = race;
        allRaces.appendChild(singleRace);   
    });
}

createFilters();

// function filterCharacters(filter){

//     fetch(API_URL + filter)
//     .then((response) => response.json())
//     .then((data) => {
//         charactersGrid.innerHTML = "";
//         upPage();
        
//         data.forEach(character => {
//             createCharac(character);
//         });
//     });
// }

let characterDescription = document.createElement("p");
characterDescription.setAttribute("class", "pDescription");

function showDescription(event){ 
    const idDescription = event.target.id;
    
    characterDescription.innerText = "";

    fetch("https://dragonball-api.com/api/characters/" + idDescription)
        .then((response) => response.json())
        .then((data) => {
            characterDescription.innerText = data.description;
        });

    charactersGrid.append(characterDescription);
    characterDescription.style.visibility = "visible";
}
    
function hideDescription(){
    characterDescription.style.visibility = "hidden";
}

function upPage(){
    window.scrollTo({top:0, behavior:"smooth"});
}