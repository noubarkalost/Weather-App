const key = "4Ag4piIkOI1nbRupDYpvQNnqNQs22BGo"

// First we have to get city information and specifically we need the key returned inside the object
const getCity = async function (city) {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search"
  const query = `?apikey=${key}&q=${city}` // adding ? means that after the question mark is a query
  const responce = await fetch(base + query)
  const data = await responce.json()
  return data[0]
}
// Second we needd to pass the key returned from the getCity() into another function and make another request to get the city information
// the second function returns everything we need to know about the weather and the time in that specific location
const getWeather = async function (id) {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/"
  const query = `${id}?apikey=${key}`
  const responce = await fetch(base + query)
  const data = await responce.json()
  return data[0]
}

getCity("damascus")
  .then((data) => {
    return getWeather(data.Key)
  })
  .then((data) => console.log(data))
  .catch((error) => console.log(error))
