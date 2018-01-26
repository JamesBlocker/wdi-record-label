const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  port = process.env.port || 3000

mongoose.connect('mongodb://localhost/record-label', (err) => {
  console.log(err || "Connected to MongoDB.")
})

app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({message: "Record Label API root."})
})

// THE COMPLETE API:

// 1. ALBUM ROUTES
///////////////////////////////////////////////

// get all albums

// post a new album

// get a specific album

// delete an album


// 2. SONG ROUTES:
///////////////////////////////////////////////

// get all songs in an album

// post a new song to a specific album

// get a specific song from a specific album

// delete a song from an album


// ARTIST ROUTES
///////////////////////////////////////////////

// index all artists

// create an artist

// get a specific artist

// create an album belonging to a specific artist

// delete an artist and all of their albums

app.listen(port, (err) => {
  console.log(err || `Server running on ${port}`)
})
