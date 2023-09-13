const axios = require('axios')

const JOBS_URL = 'https://findwork.dev/api/jobs/'
const JOBS_KEY = process.env.JOBS_KEY

const STATS_URL = 'https://api.teleport.org/api/cities/?embed=city:search-results/city:item/city:urban_area/ua:scores&search='

async function getJobs(location) {
  try {
    const {data} = await axios.get(
      `${JOBS_URL}?location=${location}`,
      {
        headers: {
          Authorization: `Token ${JOBS_KEY}`
        }
      }
    )
    if (data.results.length > 0) return data.results
    else throw new Error('Jobs not found')
  } catch(err) {
    //console.log(err.data || err.message)
    return false
  }
}

async function getCityInfo(location) {
  try {
    const {data} = await axios.get(STATS_URL + location)
    const searchResults = data._embedded && data._embedded["city:search-results"]
    const city = searchResults.length > 0 && searchResults[0]._embedded["city:item"]
    if (!city) throw new Error('City not found')
    const scores = city?._embedded?.["city:urban_area"]?._embedded?.["ua:scores"]
    if (!scores) throw new Error('No scores for this city')
    return scores
  } catch(err) {
    // console.log(err.data || err.message)
    return false
  }
}

module.exports = {getJobs, getCityInfo}
