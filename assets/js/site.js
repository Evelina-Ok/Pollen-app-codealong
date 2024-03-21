// write cool JS hwere!!

getLocation();

function getLocation() {
  if (navigator.geolocation) {
    //  navigator.geolocation.getCurrentPosition requires a succes function name as first param and a error function name as second param.

    navigator.geolocation.getCurrentPosition(PositionRecieved, geoError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Geo location succes function recieves a data object
function PositionRecieved(position) {
  //console.log(position);
  console.log(position.coords.longitude);
  console.log(position.coords.latitude);
//   console.log("test");
  getHumanReadableLocation(position.coords.latitude, position.coords.longitude);
  getPollenData(position.coords.latitude, position.coords.longitude);
  
}

//geo error function recievs a data object
function geoError(error) {
//   console.log(error.message);
}

function getHumanReadableLocation(lat, long) {
  // https://geocode.maps.co/reverse?lat=latitude&lon=longitude&api_key=65fb5ea644244903025253axe09afbb

//   console.log("getHumanReadableLocation");
  const apiKey = "65fbf7bdcc59c501121077vle268fa2";
  const url = `https://geocode.maps.co/reverse?lat=${lat}&lon=${long}&api_key=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    })
    .then((data) => {
      console.log("data, address, city");
      buildLocationName(data.address.city);
    })
    .catch((error) => {
      console.error("error fetching data", error);
      return null;
    });
}


// temporary view code----------------
function buildLocationName(myCity) {
//   console.log(myCity);

  let myNameElement = document.getElementById("location");

  myNameElement.innerText = myCity;
}



// function to receive pollen data from location using latitude and longitude:
function getPollenData(lat, long) {

    // make 2 variables for time zone and URL of API (open-meteo.com) 
    // change latitude=57.048 to latitude=${lat}, same for longitude
    // change timezone=Europe%2FBerlin to timezone=${timeZone}
    const timeZone = 'Europe%2FBerlin';
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${long}&current=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&hourly=alder_pollen,birch_pollen,grass_pollen,mugwort_pollen,olive_pollen,ragweed_pollen&timezone=${timeZone}&forecast_days=1`;

        // console.log('getPollenData');
        console.log(lat, long);

    // then we are fetching URL data and if it's ok, converting to json format
    fetch(url)
        .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
      }

      return response.json();
    })

    // then we get json format data 
    .then((data) => {

      pollenDataStructure(data)
      console.log(data);
    })
    .catch((error) => {
      console.error("error fetching data", error);
      return null;
    });

}





// controller--------------------

function pollenDataStructure(data) {

    let myViewData=[]

    myViewData.push(data.current)

    console.log(data.current.alder_pollen);

    buildPollenView(myViewData)

}


// view------------------------

// builds pollen data with current data and hourly 24 hour data is received from array:
function buildPollenView(viewData) {

    // build current 
    let myDisplayElement = document.getElementById('pollenData');

    console.log(viewData[0]);

    let myCurrentData = viewData[0]

//    card from HTML doc for current values:
    let myCurrentHTML = `<section><h2>Pollen</h2><ul>
    <li>Alder ${myCurrentData.alder_pollen}</li>
    <li>Birch ${myCurrentData.alder_pollen}</li>
    <li>Grass ${myCurrentData.alder_pollen}</li>
    <li>Mugwort ${myCurrentData.alder_pollen}</li>
    <li>Olive ${myCurrentData.alder_pollen}</li>
    <li>Ragweed ${myCurrentData.alder_pollen}</li></ul>`


    // the variable myDisplayElement
    myDisplayElement.innerHTML = myCurrentHTML
}



