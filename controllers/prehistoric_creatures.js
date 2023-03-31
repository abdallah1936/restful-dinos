const express = require('express')
const fs = require('fs')

const router = express.Router()

const readCreatures = () => {
    // read in the creatures json
    const creatures = fs.readFileSync("./prehistoric_creatures.json")
    // convert to POJO
    const creatureData = JSON.parse(creatures)
    return creatureData
}

// GET /prehistoric_creatures -- READ all creatures
router.get('/', (req, res) => {
    const creatures = readCreatures()
    res.render('creatures/index.ejs', {
        creatures
    })
})

// GET /prehistoric_creatures/new -- SHOW form to CREATE creature
router.get('/new', (req, res) => {
    res.render("creatures/new.ejs")
})

// POST /prehistoric_creatures -- intake form data from /new and CREATE creature
router.post('/', (req, res) => {
    console.log(req.body)
    const creatures = readCreatures()
    creatures.push(req.body)
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatures))
    res.redirect('/prehistoric_creatures')
})

// GET /prehistoric_creatuers/:id -- READ creature @ :id
router.get('/:id', (req, res) => {
    const creatures = readCreatures()
    res.render("creatures/details.ejs", {
        creature: creatures[req.params.id],
        id: req.params.id
    })
})

module.exports = router