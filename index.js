const express = require('express')
var cors = require('cors')
const api_helper = require('./API_helper')
const app = express()
const port = 3000
const key = "41b766d0cd0542d1b34a4ab70409abdf";

app.use(cors())
app.options('*', cors())

app.get('/', (req, res) => res.send('Welcome to Make REST API Calls In Express!'))

app.get('/getAPIResponse/topHeadlines', (req, res) => {
	api_helper.make_API_call(`https://newsapi.org/v2/top-headlines?country=us&page=pageSize=40&category=&apiKey=${key}`)
		.then(response => {
			res.json(response)
		})
		.catch(error => {
			res.send(error)
		})
})

app.get('/getAPIResponse/category', (req, res) => {
	const { category } = req.query;
	console.log({ category })

	api_helper.make_API_call(`https://newsapi.org/v2/top-headlines?country=us&pageSize=30&category=${category}&apiKey=${key}`)
		.then(response => {
			res.json(response)
		})
		.catch(error => {
			res.send(error)
		})
})

app.get('/getAPIResponse/topic', (req, res) => {
	const { topic } = req.query;
	console.log({ topic })

	api_helper.make_API_call(`https://newsapi.org/v2/everything?q=${topic}&pageSize=100&apiKey=${key}`)
		.then(response => {
			res.json(response)
		})
		.catch(error => {
			res.send(error)
		})
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app
