// Artist model here...
mongoose = require('mongoose'),
artistSchema = new mongoose.Schema({
    name: String
})

const Artist = mongoose.model('Artist', artistSchema)
module.exports = Artist