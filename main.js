console.log("YAY!");

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML += domString;
};

let planetBios;

const buildDomString = (planetsArray) => {
    let stringToPrint = "";
    planetsArray.forEach( (item, index) => {
        stringToPrint += `<div id="${index}" class="planet-card">`;
        stringToPrint +=  `<h2 class="h2s">${item.name}</h2>`;
        stringToPrint +=  `<img id="earth" src="${item.imageUrl}" alt="${item.name}">`;
        stringToPrint += `</div>`;
    });
    printToDom(stringToPrint, "planets-container")
    addCardEvents();
}

const hideStuff = () => {
    let cardsToHide = document.getElementsByClassName('planet-card');
    for(let i = 0; i < cardsToHide.length; i++){
        cardsToHide[i].classList.add("hidden");
    }
}

const closeWithX = () => {
    allMyHidden = document.getElementsByClassName('hidden');
    console.log("Allmyhidden: ", allMyHidden);
    // for(let i = 0; i < allMyHidden.length; i++){
    //     allMyHidden[i].classList.remove('hidden');
    //     console.log(i);
    // }
    while (allMyHidden.length > 0) { 
        allMyHidden[0].classList.remove("hidden"); 
    };
    removeBigCard = document.getElementById('the-big-card');
    removeBigCard.remove();
}

const addEventToX = () => {
    eventToX = document.getElementById('exit');
    eventToX.addEventListener("click", closeWithX);
}

const planetBioBuilder = (e, bios) => {
    let stringToPrint = "";
    let targetID = e.target.parentNode.id;
    console.log("Target ID: ", targetID);
    bios.forEach((item, index) => {
        if(targetID == index){
            stringToPrint += `<div id="the-big-card" class="big-card">`;
            stringToPrint += `<button id="exit" class="exit">X</button>`;
            stringToPrint += `<h2 id="big-h2">${item.name}</h2>`;
            stringToPrint += `<img id="big-image" src="${item.imageUrl}">`;
            if(item.isGasPlanet){
                stringToPrint += `<h4>This is a Gaseous Planet...gross!</h4>`;
            } else {
                stringToPrint += `<h4>This planet is not Gaseous</h4>`;
            }
            stringToPrint += `<h4>Number of Moons: ${item.numberOfMoons}</h4>`;
            stringToPrint += `<p>${item.description}</p>`;
            stringToPrint += `</div>`;
        }
    })
    hideStuff();
    printToDom(stringToPrint, "planets-container");
    addEventToX();
}

const addCardEvents = () => {
    const allPlanetCards = document.getElementsByClassName('planet-card');
    console.log("my planets: ", allPlanetCards);
    for(let i = 0; i < allPlanetCards.length; i++){
        allPlanetCards[i].addEventListener('click', (e) => {
            planetBioBuilder(e, planetBios);
            console.log("click event object: ", e); 
        });
    }
}

function stuffWithJSON () {
    const data = JSON.parse(this.responseText);
    planetBios = data.planets;
    buildDomString(data.planets);
    // addEventListeners();
}

function WTF () {
    console.log("OMG AN ERROR!");
}



const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", stuffWithJSON);
    myRequest.addEventListener("error", WTF);
    myRequest.open("GET", "planets.json");
    myRequest.send();
}





startApplication();

console.log("PlanetBios: ", planetBios);



