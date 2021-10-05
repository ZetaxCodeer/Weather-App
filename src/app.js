const path = require("path")
const express = require("express")
const hbs = require("hbs")
const { geocode } = require("./utils/geocode")
const { forecast } = require("./utils/forecast")
const app = express()
const log = console.log

// const router = express.Router()
// path for express config
const viewsPath = path.join(__dirname, "../templates/views")
const publicDirectoryPath = path.join(__dirname, "../public")
const partialsPath = path.join(__dirname, "../templates/partials")

// setup hbs views dir and engine
app.set('view engine', 'hbs');
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// start static file to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Yazan"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Page Title",
        name: "Zetax"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help Page Title",
        name: "ZetaxS"
    })
})

app.get("/help/*", (req, res) => {
    res.render("", {
        title: "404 Data Not Found",
        name: "ZetaxS",
        pageNotFount: "We Can't Find What You Looking For"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please Type Your Address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



app.get("*", (req, res) => {
    res.render("404", {
        title: "Page Not Found",
        name: "EXO",
        pageNotFount: "We Can't Find What You Looking For"
    })
})

app.listen(3000, () => {
    log("Sever Is Up On Port 3000")
})