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

//logging middleware, logs each request, 
//allows nonauthenticated users to /, redirects authenticated users to /feed
app.use(async (req, res, next) => {
    if(req.session.user) {
        console.log("[" + new Date().toUTCString() + "]: " + req.method + " " + req.originalUrl + " (Authenticated User)")
    }
    else {
        console.log("[" + new Date().toUTCString() + "]: " + req.method + " " + req.originalUrl + " (Non-Authenticated User)")
    }
    if (req.originalUrl !== '/')
        return next()
    else {
        if (req.session.user)
            return res.redirect('/feed')
    }
    return next()
});



//end middleware***********************

configRoutes(app)

app.listen(3000, () => {
    console.log("We've now got a server!")
    console.log("Your routes will be running on http://localhost:3000")
})

import {dbConnection, closeConnection} from './config/mongoConnection.js'

//console.log("awaiting db connection")
const db = await dbConnection()
await db.dropDatabase()

import {userData} from "./data/index.js"
let firstName, lastName, Email, Age, Username, password
let newUser
try {
    newUser = await userData.registerUser(firstName = "Josh", lastName = "Prasad",
Email = "email@email.com", Age = "21", Username = "username", password = "password")
} catch (e) {
    console.log(e)
}
console.log(newUser)

import { portfolioData } from './data/index.js'
let subject, createDate
let newPortfolio = await portfolioData.createPortfolio(subject = "art", createDate = "12/12/23", Email = "email@email.com")
console.log(newPortfolio)
import {users} from './config/mongoCollections.js'
const userCollection = await users()
const user = await userCollection.findOne({Email: "email@email.com"})
console.log(user)