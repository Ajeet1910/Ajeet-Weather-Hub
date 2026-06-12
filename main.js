const apiKey='fcc8de7015bbb202209bbf0261babf4c';
const searchBtn=document.querySelector('.search-btn');
const searchBox=document.querySelector('.search-box');

searchBtn.addEventListener('click',()=>getWeather(searchBox.value));
searchBox.addEventListener('keypress',(e)=>{
if(e.key==='Enter') getWeather(searchBox.value);
});

async function getWeather(city){
if(!city){
alert('Please enter a city name');
return;
}

try{
const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
const data=await response.json();

if(data.cod!=200){
alert('City not found');
return;
}

document.querySelector('.city').innerText=`${data.name}, ${data.sys.country}`;
document.querySelector('.temp').innerText=`${Math.round(data.main.temp)}°C`;
document.querySelector('.weather').innerText=data.weather[0].main;
document.querySelector('.humidity').innerText=`${data.main.humidity}%`;
document.querySelector('.wind').innerText=`${data.wind.speed} km/h`;
document.querySelector('.feels-like').innerText=`Feels like: ${Math.round(data.main.feels_like)}°C`;
document.querySelector('.date').innerText=new Date().toDateString();

const condition=data.weather[0].main.toLowerCase();
const icon=document.querySelector('.icon');

if(condition.includes('cloud')) icon.innerText='☁️';
else if(condition.includes('rain')) icon.innerText='🌧️';
else if(condition.includes('clear')) icon.innerText='☀️';
else if(condition.includes('snow')) icon.innerText='❄️';
else icon.innerText='⛅';

}catch(error){
alert('Something went wrong');
}
}