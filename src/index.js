let XMLHttpRequest = require('xhr2');

const ubication = (geolocation) => {
    let keyapi = "a7c3ef74696d2d16c3bcb41de13b803f";
    let latitud = geolocation.coords.latitude;
    let longitud = geolocation.coords.longitude;
    const API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${keyapi}`;
    Data(API)
}
navigator.geolocation.getCurrentPosition(ubication)

const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', url_api, true);
        xhttp.onreadystatechange = (() => {
            if(xhttp.readyState == 4) {
                (xhttp.status == 200)
                ? resolve(JSON.parse(xhttp.responseText))
                : reject(new Error('Error', url_api))
            }
        });
        xhttp.send();
    })
}

const Data = async (url_api) => {
    // recibe los datos
    try {
        const info = await fetchData(`${url_api}`);
        const temperatura = info.main.temp;
        const temperaturaCelsius = (temperatura - 273).toFixed(1);
        const humidity = info.main.humidity;
        const weather = info.weather[0].icon;
        const weather_description = info.weather[0].description;
        const zone = info.name + ', ' + info.sys.country;

        console.log(info);

        const titleZone = document.getElementById('head-title');
        titleZone.innerHTML = `<h1>EL CLIMA DE HOY EN ${zone}</h1>`

        const textWeather = document.getElementById('description');
        textWeather.innerHTML = `${weather_description}`

        const textTemp = document.getElementById('temp');
        if(temperaturaCelsius < 5) {textTemp.innerHTML = `${temperaturaCelsius}° C <i class="fas fa-thermometer-empty" style='color: #83489E></i>`} else
        if(temperaturaCelsius < 15) {textTemp.innerHTML = `${temperaturaCelsius}° C <i class="fas fa-thermometer-quarter" style='color: #994079></i>`} else
        if(temperaturaCelsius < 20) {textTemp.innerHTML = `${temperaturaCelsius}° C <i class="fas fa-thermometer-half" style='color: #A43C66></i>`} else
        if(temperaturaCelsius < 25) {textTemp.innerHTML = `${temperaturaCelsius}° C <i class="fas fa-thermometer-three-quarters" style='color: #AF3853'></i>`} else
        if(temperaturaCelsius < 30) {textTemp.innerHTML = `${temperaturaCelsius}° C <i class="fas fa-thermometer-full" style='color: #C5302E'></i>`}

        const textHumidity = document.getElementById('humidity');
        textHumidity.innerHTML = `${humidity}%  <i class="fas fa-tint"></i>`

        const image = document.getElementById('wt-img');
        image.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather}@2x.png" alt="${weather_description}" srcset="">`

    // recibe el error si es que hay alguno
    } catch (error) {
        console.log(error);
    }
}