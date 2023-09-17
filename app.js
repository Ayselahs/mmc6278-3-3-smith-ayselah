require('dotenv').config()
const express = require('express')
const app = express()
// TODO: import the getCityInfo and getJobs functions from util.js
const { getCityInfo, getJobs } = require('./util.js')
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

app.get('/api/city/:city', async (req, res) => {
    let cityData = await req.params.city

    try {

        let cityInfo = await getCityInfo(cityData)
        let jobs = await getJobs(cityData)
        const response = { cityInfo, jobs }

        if (cityInfo || jobs) {
            res.status(200).json({ cityInfo, jobs })
        } else {

            res.status(404).json({ error: 'City or job not found' })
        }


    } catch (err) {
        console.log(err)
    }






})

module.exports = app
