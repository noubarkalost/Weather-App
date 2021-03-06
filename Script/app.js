const cityForm = document.querySelector("form")
const card = document.querySelector(".card")
const details = document.querySelector(".details")
const time = document.querySelector("img.time")
const icon = document.querySelector(".icon img")
// To write the data inside the UI
const updateUI = function (data) {
  //   const cityDets = data.cityDets
  //   const weather = data.weather
  // using destructuring instead of the above syntax
  const { cityDets, weather } = data
  details.innerHTML = `
  <h5 class="my-3">${cityDets.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
  </div>
</div>
 
  `
  // update the day-night and the icons
  const iconSrc = `img/icon/${weather.WeatherIcon}.svg`
  icon.setAttribute("src", iconSrc)
  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg"
  time.setAttribute("src", timeSrc)
  // remove the d-none if presents
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none")
  }
}
const updateCity = async function (city) {
  const cityDets = await getCity(city)
  const weather = await getWeather(cityDets.Key)
  // if the key and the value inside an object have the same name we can use the "object shorthand notation"
  // which means we can write only the value and it will automatically name the key as the value name
  return { cityDets, weather }
}

cityForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const city = cityForm.city.value.trim()
  cityForm.reset()
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((error) => console.log(error))
  localStorage.setItem("city", city)
})
if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((city) => updateUI(city))
    .catch((error) => alert(error))
}
