const apikey = "";

const url = (location) => 
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;


async function getWeatherByLocation(location){
    const response = await fetch(url(location));
    const responseData = await response.json();

    console.log(responseData);
}

getWeatherByLocation("New York");