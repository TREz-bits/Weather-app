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
        const textTemp = document.getElementById('temp');
        textTemp.innerHTML = `La temperatura de hoy es de ${temperaturaCelsius}°`
    // recibe el error si es que hay alguno
    } catch (error) {
        console.log(error);
    }
}
