// Require express and data.json
const express = require('express')
const projects = require('./data.json')
const app = express()

// Setting static route
app.use('/static', express.static('public'))

// View engine set to pug
app.set('view engine', 'pug')

// Route Handlers
app.get('/', (req, res) => {
  res.render('index', projects)
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/project/:id', (req, res) => {
  const projectIndex = global.parseInt(req.params.id) - 1

  res.render('project', projects.projects[projectIndex])
})

// Error Handler
app.use((req, res, next) => {
  const err = new Error()
  err.status = 404
  err.message = 'This page does not exist, try going back!'
  console.log('This page does not exist')
  next(err)
})

// App listener
app.listen(3000, console.log('App is listening to port 3000'))
