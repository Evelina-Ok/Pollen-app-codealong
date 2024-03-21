// write cool JS hwere!!

getLocation()




function getLocation() {

    if (navigator.geolocation) {

        //  navigator.geolocation.getCurrentPosition requires a succes function name as first param and a error function name as second param.

        navigator.geolocation.getCurrentPosition(PositionRecieved, geoError);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Geo location succes function recieves a data object 
function PositionRecieved(position) {
    //console.log(position);
    console.log(position.coords.longitude);
    console.log(position.coords.latitude);

    getPollenData(position.coords.latitude, position.coords.longitude)
}


//geo error function recievs a data object
function geoError(error) {

    console.log(error.message);
}


function getPollenData(lat, long) {
    // https://geocode.maps.co/reverse?lat=latitude&lon=longitude&api_key=65fb5ea644244903025253axe09afbb

}





