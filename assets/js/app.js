// write cool JS hwere!!

// this is just a name we are making so we can make a function:
getLocation();

function getLocation() {
  if (navigator.geolocation) {
//  navigator.geolocation.getCurrentPosition requires a success function name as first param and a error function name as second param.

    navigator.geolocation.getCurrentPosition(PositionReceived, geoError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Geo location success function receives a data object
function PositionReceived(position) {
  //console.log(position);
  console.log(position.coords.longitude);
  console.log(position.coords.latitude);
//   console.log("test");
  getHumanReadableLocation(position.coords.latitude, position.coords.longitude);
  getPollenData(position.coords.latitude, position.coords.longitude);
  
}

//geo error function receives a data object
function geoError(error) {
console.log(error.message);
}

function getHumanReadableLocation(lat, long) {

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

    // if I change "&forecast_days=1" days to 3, then I get data for 3 days

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





// ------------------ CONTROLLER --------------------

function pollenDataStructure(data) {

    let myViewData=[]

    myViewData.push(data.current)

    console.log(data.current.alder_pollen);



// -------------------- GENERATE HOUR DATA -----------------------------------

// let myMasterArray = data.hourly.time

let myHourlyData = []

// index indicates the number of array
// myTime is a value
data.hourly.time.map((myTime, index) => {
    let myHourData = {}

    myHourData.time = myTime
    myHourData.alder_pollen = data.hourly.alder_pollen[index]
    myHourData.birch_pollen = data.hourly.birch_pollen[index]
    myHourData.grass_pollen = data.hourly.grass_pollen[index]
    myHourData.mugwort_pollen = data.hourly.mugwort_pollen[index]
    myHourData.olive_pollen = data.hourly.olive_pollen[index]
    myHourData.ragweed_pollen = data.hourly.ragweed_pollen[index]

    // push that myHourData into the empty variable that we made a bit up (let myHourlyData = [])
    myHourlyData.push(myHourData)
})

    // then push all data inside "let myHourlyData = []" into myViewData
myViewData.push(myHourlyData)
//console.log(HourData);




    buildPollenView(myViewData)

}




// another way for hourly ---------
// function buildHourlyData(hourData) {
//   let hourlyDataElement = document.getElementById('hourlyData')

//   let hourlyDataHTML = '<ul>';
//   hourData.forEach((hourData) => {
//     let time = new Date(hourData.time * 1000); // Convert Unix timestamp to milliseconds
//     let formattedTime = `${time.getDate()}/${time.getMonth() + 1}-${time.getFullYear()} ${('0' + time.getHours()).slice(-2)}:${('0' + time.getMinutes()).slice(-2)}`;
//     hourlyDataHTML += `
//       <li>
//           <h2>${formattedTime}</h2>
//           <ul>
//               <li>Alder: ${hourData.alder_pollen}</li>
//               <li>Birch: ${hourData.birch_pollen}</li>
//               <li>Grass: ${hourData.grass_pollen}</li>
//               <li>Mugwort: ${hourData.mugwort_pollen}</li>
//               <li>Olive: ${hourData.olive_pollen}</li>
//               <li>Ragweed: ${hourData.ragweed_pollen}</li>
//           </ul>
//       </li>`;
// });
// hourlyDataHTML += '</ul>';

// hourlyDataElement.innerHTML = hourlyDataHTML
// }







// --------------- VIEW ------------------------

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
    <li>Ragweed ${myCurrentData.alder_pollen}</li></ul></section>`


    // the variable myDisplayElement
    myDisplayElement.innerHTML = myCurrentHTML




    // build hours from HourData viewData[1]

    let myHourdata = viewData[1]
    
    let myHourViewHTML = '<section id="hours"><h2>By the hour</h2>'

    myHourdata.map((myHour) => {
        let myCurrentHTML = `<section class="hourcard"><h3>${myHour.time}</h3><ul>
                <li>El ${myHour.alder_pollen}</li>
                <li>Birk ${myHour.birch_pollen}</li>
                <li>Græs ${myHour.grass_pollen}</li>
                <li>Bynke ${myHour.mugwort_pollen}</li>
                 <li>Oliven ${myHour.olive_pollen}</li>
                   <li>Ambrosia ${myHour.ragweed_pollen}</li>
            </ul>
        </section>`

        // "+" is very important here as otherwise "myHourViewHTML" is the same as "myCurrentHTML" so it shows only cures time data
        myHourViewHTML += myCurrentHTML
    })

    // "+" same important here
    myHourViewHTML += '</section>'
    myDisplayElement.innerHTML += myHourViewHTML
}








// temp viewCode
// 