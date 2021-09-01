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
    const currentDate = convTime(data.dt);
    const sunrise = convTime(data.sys.sunrise);
    const sunset = convTime(data.sys.sunset);
    const weather = document.createElement('div');
    weather.classList.add('weather');

    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"/>
        ${temp}°F
        </h2>
        <small>${data.weather[0].main} - ${data.weather[0].description}</small>
        <p>Last Updated: ${currentDate}</p>
        <p>Sunrise: ${sunrise}</p>
        <p>Sunset: ${sunset}</p>
    `;

    main.innerHTML = '';
    main.appendChild(weather);
}

function convTime(T){
    const myDate = new Date(T*1000);
    const hours = myDate.getHours();
    const minutes = myDate.getMinutes();
    const seconds = myDate.getSeconds();
    return formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
}

function formatTime(time){
    return time < 10 ? `0${time}` : time;
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