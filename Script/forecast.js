const key = "4Ag4piIkOI1nbRupDYpvQNnqNQs22BGo"

const getCity = async function (city) {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search"
  const query = `?apikey=${key}&q=${city}`
  const responce = await fetch(base + query)
  const data = await responce.json()
  return data[0]
}

getCity("damascus")
  .then((data) => console.log(data))
  .catch((error) => console.log(error))
