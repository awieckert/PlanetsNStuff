console.log("YAY!");

const printToDom = (domString, divId) => {
    document.getElementById(divId).innerHTML += domString;
};

const stuffWithJSON = () => {
    const data = JSON.parse(this.responseText);
    buildDomString(data.planets);
    addEventListeners();
}

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", stuffWithJSON);
    myRequest.addEventListener("error", WTF);
    myRequest.open("GET", "planets.json");
    myRequest.send();
}

startApplication();




