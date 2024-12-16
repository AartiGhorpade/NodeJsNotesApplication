const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, "public")))

app.get('/', (req, resp) => {
    fs.readdir("./files", (err, files) => {
        resp.render("index", { files: files })
    })
})

app.get('/file/:filename', (req, resp) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
        resp.render("show", { filename: req.params.filename, filedata: filedata })
    })
})

app.get('/edit/:filename', (req, resp) => {
    resp.render("edit", { filename: req.params.filename })
})
app.post('/editFileName', (req, resp) => {
    fs.rename(`./files/${req.body.prevtitle}`, `./files/${req.body.newtitle}`, (err) => {
        resp.redirect('/')
    })
})

app.post('/create', (req, resp) => {
    const fileName = `./files/${req.body.title.split(' ').join('')}.txt`
    fs.writeFile(fileName, req.body.details, () => {
        resp.redirect('/')
    })
})

app.listen(3002, () => {
    console.log("app is listening on 3002 port")
})