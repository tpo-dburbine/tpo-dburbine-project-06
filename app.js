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

app.get('/project/:id', (req, res, next) => {
  const projectIndex = global.parseInt(req.params.id) - 1

  // Conditional to check if project route exists; presents 404 error if not
  if (projects.projects[projectIndex] !== undefined) {
    res.render('project', projects.projects[projectIndex])
  } else {
    const err = new Error()
    err.status = 404
    err.message = 'The page you are looking for does not exist'
    console.log('404 error handler called')
    next(err)
  }
})

// Error Handlers
app.use((req, res, next) => {
  const err = new Error()
  err.status = 404
  err.message = 'That page does not exist, please go back'
  console.log('404 error handler called')
  next(err)
})

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.render('not-found', { err })
  } else {
    err.messsage = err.message || 'Looks like something went wrong with the server!'
    res.status(err.status || 500).render('error', { err })
  }
})

// App listener
app.listen(3000, console.log('App is listening to port 3000'))
