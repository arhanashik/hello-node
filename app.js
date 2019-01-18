const express = require('express')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const path = require('path')
const app = express()

const {getHomePage} = require('./route/index')
const{addPlayerPage, addPlayer, editPlayerPage, editPlayer, deletePlayer} = require('./route/player')

const port = 5050

//db config
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hello_node'
})

//db connection
db.connect((err) => {
    if(err) {
        throw err
    }

    console.log('Connected to database')
})

global.db = db

//middleware config
app.set('port', process.env.port || port)
app.set('views', __dirname + '/view')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(fileUpload())

app.get('/', getHomePage)
app.get('/add', addPlayerPage)
app.get('/edit/:id', editPlayerPage)
app.get('/delete/:id', deletePlayer)
app.post('/add', addPlayer)
app.post('/edit/:id', editPlayer)

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})