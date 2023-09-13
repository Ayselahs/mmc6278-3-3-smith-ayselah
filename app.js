require('dotenv').config()
const express = require('express')
const app = express()
// TODO: import the getCityInfo and getJobs functions from util.js
async function getJobs(location) {
    try {
        const { data } = await axios.get(
            `${JOBS_URL}?location=${location}`,
            {
                headers: {
                    Authorization: `Token ${JOBS_KEY}`
                }
            }
        )
        if (data.results.length > 0) return data.results
        else throw new Error('Jobs not found')
    } catch (err) {
        //console.log(err.data || err.message)
        return false
    }
}

async function getCityInfo(location) {
    try {
        const { data } = await axios.get(STATS_URL + location)
        const searchResults = data._embedded && data._embedded["city:search-results"]
        const city = searchResults.length > 0 && searchResults[0]._embedded["city:item"]
        if (!city) throw new Error('City not found')
        const scores = city?._embedded?.["city:urban_area"]?._embedded?.["ua:scores"]
        if (!scores) throw new Error('No scores for this city')
        return scores
    } catch (err) {
        // console.log(err.data || err.message)
        return false
    }
}
// TODO: Statically serve the public folder
app.use(express.static('public'))
// TODO: declare the GET route /api/city/:city
// This endpoint should call getCityInfo and getJobs and return
// the result as JSON.
// The returned JSON object should have two keys:
// cityInfo (with value of the getCityInfo function)
// jobs (with value of the getJobs function)
// If no city info or jobs are found,
// the endpoint should return a 404 status
app.get('/api/city/:city', (req, res) => {
    const { cityInfo, jobs } = req.query
    if (!cityInfo && !jobs) {
        res.status(404).end()
    } else {
        res.json({ cityInfo, jobs })
    }
})

module.exports = app
