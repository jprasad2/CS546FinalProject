//setup server
import express from 'express'
const app = express()

//imports and declarations
import configRoutes from './routes/index.js'
import session from 'express-session'
import exphbs from 'express-handlebars'
import {dirname} from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const staticDir = express.static(__dirname + '/public')

//setup
app.use('/public', staticDir)
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//session and middleware***************
app.use(session({
    name: 'AuthState',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: false
}))


//end middleware***********************

configRoutes(app)

app.listen(3000, () => {
    console.log("We've now got a server!")
    console.log("Your routes will be running on http://localhost:3000")
})