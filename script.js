let longitudePosition = document.getElementById("longitudeText");
let latitudePosition = document.getElementById("latitudeText");
let timeOfUpdate = document.getElementById("timeOfUpdate");
let automaticUpdateButton = document.getElementById("automaticUpdateButton");
let automaticUpdateFrequency = undefined;
let automaticUpdate = true;

//get location and timestamp
function getLocation(){
    fetch("http://api.open-notify.org/iss-now.json").then((response) => response.json()).then((data) => {
        longitudePosition.innerHTML = data.iss_position.longitude;
        latitudePosition.innerHTML = data.iss_position.latitude;
        timeOfUpdate.innerHTML = data.timestamp;
    }).catch((error) => {
        console.log("Error", error);
    });
    automaticUpdate = true;
    automaticUpdateFrequency = setTimeout(getLocation, 3000);
}

getLocation();

//stop update
function stopLocationUpdate(){
    automaticUpdate = false;
    automaticUpdateFrequency = clearTimeout(automaticUpdateFrequency);
}

//stop/start update on button click
automaticUpdateButton.addEventListener("click", function(){
	switch(automaticUpdate){
		case true:
			stopLocationUpdate();
			break;
		case false:
			getLocation();
			break;
	}
});