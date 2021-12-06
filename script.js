// Write your JavaScript code here!

window.addEventListener("load", function() {
    
    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        response.json().then(function(json) {
            let missionTarget = document.getElementById('missionTarget');
            let index = Math.floor(Math.random() * json.length - 1);
            missionTarget.innerHTML = `
            <ol>
            <li>Name: ${json[index].name} </li>
            <li>Diameter: ${json[index].diameter} </li>
            <li>Star: ${json[index].star}</li>
            <li>Distance from Earth: ${json[index].distance}</li>
            <li>Number of Moons: ${json[index].moons}</li>
            </ol>
            <img src= "${json[index].image}">`
        });
    }); 

    let form = document.querySelector("form");
    form.addEventListener("submit", function(event) {

        let pilotName = document.querySelector("input[name=pilotName]");
        let copilotName = document.querySelector("input[name=copilotName]");
        let fuelLevel = document.querySelector("input[name=fuelLevel]");
        let cargoMass = document.querySelector("input[name=cargoMass]");

        let launchStatus = document.getElementById('launchStatus');
        let faultyItems = document.getElementById('faultyItems');
        let pilotStatus = document.getElementById('pilotStatus');
        let copilotStatus = document.getElementById('copilotStatus');
        let fuelStatus = document.getElementById('fuelStatus');
        let cargoStatus = document.getElementById('cargoStatus');

        if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
            alert("All fields are required");
            event.preventDefault();
        } else if (isNaN(pilotName.value) === false || isNaN(copilotName.value) === false) {
            alert("Make sure to enter valid information for each field! Pilot and Co-Pilot inputs need to be names, not numbers!");
            event.preventDefault();  
        } else if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
            alert("Make sure to enter valid information for each field! Fuel level and cargo mass must be numbers!");
            event.preventDefault();
        } else {
            pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch!`;
            copilotStatus.innerHTML = `Co-Pilot ${copilotName.value} is ready for launch!`;
            if (fuelLevel.value < 10000) {
               faultyItems.style.visibility = 'visible';
               fuelStatus.innerHTML = 'Fuel level too low for launch!';
               launchStatus.innerHTML = 'Shuttle not ready for launch!';
               launchStatus.style.color = 'red';
            } else {
                faultyItems.style.visibility = 'visible';
                fuelStatus.innerHTML = 'Fuel level high enough for launch!';
            }
            if (cargoMass.value > 10000) {
                faultyItems.style.visibility = 'visible';
                cargoStatus.innerHTML = 'Cargo mass too high for launch!';
                launchStatus.innerHTML = 'Shuttle not ready for launch!';
                launchStatus.style.color = 'red';
            } else {
                faultyItems.style.visibility = 'visible';
                cargoStatus.innerHTML = 'Cargo mass low enough for launch!';
            }
            if (fuelLevel.value >= 10000 && cargoMass.value <= 10000) {
                faultyItems.style.visibility = 'visible';
                launchStatus.innerHTML = 'Shuttle is ready for launch!';
                launchStatus.style.color = 'green';
            }
            event.preventDefault();
        };
    });    
});
