const cityForm = document.querySelector("form")
const updateCity = async function (city) {
  const cityDets = await getCity(city)
  const weather = await getWeather(cityDets.Key)
  return {
    cityDets: cityDets,
    weather: weather,
  }
}

cityForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const city = cityForm.city.value.trim()
  cityForm.reset()
  updateCity(city)
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
})
