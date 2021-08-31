const apikey = "aca5fdfc64f4e76a596d83c5540f084f";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city) => 
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;


async function getWeatherByLocation(city){
    const response = await fetch(url(city));
    const responseData = await response.json();

    console.log(responseData, KtoF(responseData.main.temp));

    addWeatherToPage(responseData);
}

function addWeatherToPage(data){
    const temp = KtoF(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"/>
        ${temp}°F
        </h2>
        <small>${data.weather[0].main}</small>
    `;

    main.innerHTML = '';
    main.appendChild(weather);
}

function KtoF(K){
    return Math.floor(K - 273.15) * 9/5 + 32;
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevents submission of the form

    const city = search.value;
    if(city){
        getWeatherByLocation(city)
    }
})