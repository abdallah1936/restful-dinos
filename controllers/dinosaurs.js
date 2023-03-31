// require express and make and instance of the express router
const express = require('express')
const fs = require('fs')
const router = express.Router()

// helper function to read the dino db
const readDinos = () => {
    // use the filesystem to read the dino json
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    // parse the raw json to js
    const dinoData = JSON.parse(dinosaurs)
    // return the dino data
    return dinoData
}

// mount all of our routes on the router
// GET /dinosaurs -- READ return an array of dinos
router.get('/', (req, res) => {
    let dinos = readDinos()
    console.log(req.query)

    // if the user has searched, filter the dinos array
    if(req.query.dinoFilter) {
        dinos = dinos.filter(dino => {
            // compare lower case strings for case insensitivity
            console.log(dino)
            return dino.name.toLowerCase().includes(req.query.dinoFilter.toLowerCase())
        })
    }

    res.render("dinos/index.ejs", {
        // equal to { dinos: dinos }
        dinos
    })
})

// GET /dinosuars/new -- show route for a form that posts to POST /dinosaurs
router.get('/new', (req, res) => {
    res.render("dinos/new.ejs")
})

// POST /dinosaurs -- CREATE a new dino in the db
router.post('/', (req, res) => {
    console.log(req.body) // POST form data shows up in the req.body
    const dinos = readDinos()
    // push the dino from the req.body into the array json dinos
    dinos.push(req.body)
    // write the json file to save to disk
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos))
    // tell the browser to redirect 
    // do another GET request on a specific url
    res.redirect('/dinosaurs')
    // <a href="/dinosaurs">
})

// GET /dinosaurs/:id -- READ a single dino @ :id
router.get('/:id', (req, res) => {
    // read the dino json data
    const dinos = readDinos()
    // lookup one dino using the req.params
    const foundDino = dinos[req.params.id]
    // render the details template
    res.render("dinos/details.ejs", {
        dino: foundDino,
        id: req.params.id
    })
})

// export the router
module.exports = router