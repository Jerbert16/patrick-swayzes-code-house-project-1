// based on the given app id and app Secret we generate a hash for authorization
//refere to https://docs.astronomyapi.com/#sample-curl-request
var applicationId = "530a1429-db0d-4587-adb1-ded19a7d404d";
var applicationSecret =
  "b61037a5c464044d27334b3dd0f410339546c8ff10ab50eebcce8b488b5439217224c87383070db4a719e49e54f3788da3c23a76362f4e57458eb7155538ab58154b897ef27bffefd7aa5f592237c3f43327b5a8b4c82efca177e8a995816f78c8da59077974d86e840c98de251e9c07";
var baseurlPositions =
  "https://api.astronomyapi.com/api/v2/bodies/positions?longitude=-84.39733&latitude=33.775867&elevation=1&from_date=2023-02-03&to_date=2023-02-03&time=05%3A51%3A49";
// here in baseurl we are looking Planetary Positions endpoint and  Longitude,Latitude,From Date,To Date,and Time are hardcoded we have to find a way a user to enter or get their location
//the other end points are Star Charts,Moon Phase.search
const hash = btoa(`${applicationId}:${applicationSecret}`);
//example one using Planetary Positions endpoint
console.log(hash)
fetch(baseurlPositions, {
  headers: {
    Authorization: `Basic ${hash}`,
  },
})
  .then((response) => response.json())
  .then((data) => console.log("position End Point", data.data));

//example tow getting moon image  from moon-phase endpoint and  style ,obserever,view query parameters are given as object
  const baseUrlmoonPhase ="https://api.astronomyapi.com/api/v2/studio/moon-phase";
let mydata = {
  style: {
    moonStyle: "default",
    backgroundStyle: "stars",
    backgroundColor: "#000000",
    headingColor: "#ffffff",
    textColor: "#ffffff",
  },
  observer: { latitude: 33.775867, longitude: -84.39733, date: "2023-02-04" },
  view: { type: "landscape-simple" },
};


fetch(baseUrlmoonPhase,{
    method: 'POST',
    body:JSON.stringify(mydata),
   
   headers: {
    
    Authorization: `Basic ${hash}`,
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data.data));
