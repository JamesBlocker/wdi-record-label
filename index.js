const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  port = process.env.port || 3000,
  Album = require('./models/Album.js'),
  Artist = require('./models/Artist.js')

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
app.get('/albums', (req, res) => {
  Album.find({}, (err, allDemAlbums) => {
    res.json(allDemAlbums)
  })
})

// post a new album
app.post('/albums', (req, res) => {
  Album.create(req.body, (err, brandNewAlbum) => {
    res.json({ success: true, message: "Album created 🎺", album: brandNewAlbum })
  })
})

// get a specific album
app.get('/albums/:id', (req, res) => {
  Album.findById(req.params.id, (err, thatAlbum) => {
    res.json(thatAlbum)
  })
})

// delete an album


// 2. SONG ROUTES:
///////////////////////////////////////////////

// get all songs in an album

// post a new song to a specific album
app.post('/albums/:id/songs', (req, res) => {
  Album.findById(req.params.id, (err, thatAlbum) => {
    thatAlbum.songs.push(req.body)
    thatAlbum.save((err, savedAlbum) => {
      res.json({ success: true, message: "Song added 🎷", album: savedAlbum })
    })
  })
})

// get a specific song from a specific album
app.get('/albums/:albumId/songs/:songId', (req, res) => {
  Album.findById(req.params.albumId, (err, thatAlbum) => {
    const thatSong = thatAlbum.songs.id(req.params.songId)
    res.json({song: thatSong, album: thatAlbum.title})
  })
})

// delete a song from an album
app.delete('/albums/:albumId/songs/:songId', (req, res) => {
  Album.findById(req.params.albumId, (err, thatAlbum) => {
    // remove song from the album's songs array
    thatAlbum.songs.id(req.params.songId).remove()
    thatAlbum.save((err, savedAlbum) => {
      res.json({ success: true, message: "Song deleted 🎸", album: savedAlbum })
    })
  })
})

// ARTIST ROUTES
///////////////////////////////////////////////

// index all artists
app.get('/artists', (req, res) => {
  Artist.find({}, (err, allDemArtists) => {
    res.json(allDemArtists)
  })
})

// create an artist
app.post('/artists', (req, res) => {
  Artist.create(req.body, (err, brandNewArtist) => {
    res.json({ success: true, message: "artist created.", artist: brandNewArtist})
  })
})

// get a specific artist

// create an album belonging to a specific artist

// delete an artist and all of their albums

app.listen(port, (err) => {
  console.log(err || `Server running on ${port}`)
})
