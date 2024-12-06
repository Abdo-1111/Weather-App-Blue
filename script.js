const search = document.getElementById("search");
const cityname = document.getElementById("city_name");
const weathertype = document.getElementById("weathertype");
const apiKey = 'c6cbc8139f6b7ae95b803cb95cad6240';
const today = document.querySelector(".today");

let cityinput;

let longlitude;
let latitude;
let temprature = document.getElementById("temprature");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");

search.addEventListener("click", function(){
    cityinput = document.getElementById("city_input").value;
    find_city();
})

async function find_city(){
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityinput}&limit=1&appid=${apiKey}`;
    const response = await fetch(url);

    var data = await response.json();

    if (data.length == 0) {
        document.querySelector(".error").style.display = "block";
        today.style.display = "none";
    }else
    {
        console.log(data);
        latitude = data[0].lat;
        longlitude = data[0].lon;
        cityname.innerHTML = data[0].name;

        find_weather();
    }
}


async function find_weather(){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longlitude}&appid=${apiKey}&units=metric`
    const response = await fetch(url);
    var data = await response.json();

    var weather = data.weather[0].main;

    if (weather == "Clear"){
        weathertype.src = "weathers/clear.png";
    }
    else if (weather == "Clouds"){
        weathertype.src = "weathers/cloudy.png";
    }
    else if (weather == "Mist"){
        weathertype.src = "weathers/mist.png";
    }
    else if (weather == "Rain"){
        weathertype.src = "weathers/rain.png";
    }
    else if (weather == "Drizzle"){
        weathertype.src = "weathers/drizzle.png";
    }

    temprature.innerHTML = Math.round(data.main.temp)+"°C"
    humidity.innerHTML = data.main.humidity+" %"
    wind.innerHTML = data.wind.speed+" km/h"
    today.style.display = "block";
    document.querySelector(".error").style.display = "none";
    console.log(data);
}