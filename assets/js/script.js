var displayMoon = document.querySelector("#moon-phase");
var displayStars = document.querySelector("#star-chart");
var displayNames = document.querySelector("#planets");
var btnEl = document.getElementById("button");
var cityInput = document.getElementById("cityInput");
var dateEL = document.getElementById("meeting-time");
var errDisplay = document.querySelector(".help");

var currentWthr = document.querySelector("#current");
var weatherIcon = document.querySelector("#weatherIcon");
var weatherDes = document.querySelector("#description");
var wind = document.querySelector("#wind");
var temp = document.querySelector("#temp");
var humidity = document.querySelector("#humidity");

var lat;
var lon;
var apiKey = "e741dcb38a3d668e1bd5bc73c1c15c13";

cityInput.value = localStorage.getItem("city");

function runProgram(e) {
  e.preventDefault();

  if (!(cityInput.value && dateEL.value)) {
    errDisplay.textContent = "Both city and date required!";
    setTimeout(() => {
      errDisplay.textContent = "";
    }, 1000);
    return;
  }

  localStorage.setItem("city", cityInput.value);

  var baseurlNow = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=e741dcb38a3d668e1bd5bc73c1c15c13&units=imperial`;

  fetch(baseurlNow)
    .then((resp) => resp.json())
    .then((data) => {
      localStorage.setItem("lat", data.coord.lat);
      localStorage.setItem("lon", data.coord.lon);

      lat = data.coord.lat;
      lon = data.coord.lon;

      //takes data frome baseurlNow data array and displays weather info - see below:
      currentWthr.textContent = "Current Weather:";
      weatherIcon.src =
        "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
      weatherDes.textContent = "Conditions: " + data.weather[0].description;
      temp.textContent = "Temp: " + data.main.temp + "°F";
      humidity.textContent = "Humidity: " + data.main.humidity + "%";
      wind.textContent = "Wind: " + data.wind.speed + " MPH";
    });

  const baseUrlStarChart =
    "https://api.astronomyapi.com/api/v2/studio/star-chart";

  let mydatafour = {
    style: "red",
    observer: {
      latitude: parseInt(localStorage.getItem("lat")),
      longitude: parseInt(localStorage.getItem("lon")),
      date: `${dateEL.value}`,
    },
    view: {
      type: "area",
      parameters: {
        position: {
          equatorial: {
            rightAscension: 14.83,
            declination: -15.23,
          },
        },
        zoom: 6,
      },
    },
  };

  fetch(baseUrlStarChart, {
    method: "POST",
    body: JSON.stringify(mydatafour),

    headers: {
      Authorization: `Basic ${hash}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      var imageSrc = data.data.imageUrl;
      var imgHolder = document.createElement("img");
      imgHolder.setAttribute("src", imageSrc);
      displayStars.innerHTML = "YOUR CURRENT NIGHT SKY (STAR CHART):";
      displayStars.appendChild(imgHolder);
    });
  const baseUrlmoonPhase =
    "https://api.astronomyapi.com/api/v2/studio/moon-phase";
  let mydata = {
    style: {
      moonStyle: "default",
      backgroundStyle: "stars",
      backgroundColor: "#000000",
      headingColor: "#ffffff",
      textColor: "#ffffff",
    },
    observer: {
      latitude: parseInt(localStorage.getItem("lat")),
      longitude: parseInt(localStorage.getItem("lon")),
      date: `${dateEL.value}`,
    },
    view: { type: "landscape-simple" },
  };

  fetch(baseUrlmoonPhase, {
    method: "POST",
    body: JSON.stringify(mydata),

    headers: {
      Authorization: `Basic ${hash}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      var imageSrc = data.data.imageUrl;
      var imgHolder = document.createElement("img");
      imgHolder.setAttribute("src", imageSrc);
      displayMoon.innerHTML = "";
      displayMoon.appendChild(imgHolder);
    })
    .catch((error) => console.log(error));
}

var applicationId = "530a1429-db0d-4587-adb1-ded19a7d404d";
var applicationSecret =
  "b61037a5c464044d27334b3dd0f410339546c8ff10ab50eebcce8b488b5439217224c87383070db4a719e49e54f3788da3c23a76362f4e57458eb7155538ab58154b897ef27bffefd7aa5f592237c3f43327b5a8b4c82efca177e8a995816f78c8da59077974d86e840c98de251e9c07";
var baseurlPositions =
  "https://api.astronomyapi.com/api/v2/bodies/positions?longitude=122.4194&latitude=37.7749&elevation=1&from_date=2023-02-03&to_date=2023-02-03&time=05%3A51%3A49";

// here in baseurl we are looking Planetary Positions endpoint and  Longitude,Latitude,From Date,To Date,and Time are hardcoded we have to find a way a user to enter or get their location

//the other end points are Star Charts,Moon Phase.search

const hash = btoa(`${applicationId}:${applicationSecret}`);

btnEl.addEventListener("click", runProgram);

//example one using Planetary Positions endpoint

// fetch(baseurlPositions, {
//   headers: {
//     Authorization: `Basic ${hash}`,
//   },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     var PlanetNames = data.data.table.rows;
//     for (let elem of PlanetNames) {
//       var listEL = document.createElement("li");
//       listEL.textContent = elem.entry.name;
//       displayNames.appendChild(listEL);
//     }

//     console.log(PlanetNames);
//   });

//example tow getting moon image  from moon-phase endpoint and  style ,obserever,view query parameters are given as object

//example theree getting moon image  from star-chart endpoint and  style ,obserever,view query parameters are given as object

// //exmaple four using serach ende pont term and match type are hard coded
// let basUrlSearch =
//   "https://api.astronomyapi.com/api/v2/search?term=polaris&ra=&dec=&match_type=fuzzy";

// fetch(basUrlSearch, {
//   headers: {
//     Authorization: `Basic ${hash}`,
//   },
// })
//   .then((response) => response.json())
//   .then((data) => {});

// var openWatherApiKey = "87710827a4c6f11401d8a2d244caad74";

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
