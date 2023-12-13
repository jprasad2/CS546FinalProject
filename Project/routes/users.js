import {Router} from "express"
const router = Router()

import validation from "../validation.js"
import {userData} from "../data/index.js"

router
    .route('/profile')
    .get(async (req, res) => {
        res.render("./users/profile", {title: "Profile"})
    })

router
    .route('/signup')
    .get(async (req, res) => {
        res.render("./users/signup", {title: "Signup"})
    })
    .post(async(req, res) => {
        /*
        request body:
        {
            firstName: "first name"
            lastName: "last name"
            email: "email address"
            age: "age"
            username: "username"
            password: "password"
        }
        */
       try {
        let firstName = validation.checkName(req.body.username)
        let lastName = validation.checkName(req.body.password)
        let email = validation.checkEmail(req.body.email)
        let username = validation.checkUsername(req.body.username)
        let password =  validation.checkPassword(req.body.password)

        let newUser = await userData.createUser(firstName, lastName, email, username, password)
        return res.status(200).json(newUser)
       } catch (e) {
        console.log(e)
        res.status(400).json({error: e})
       }
    })

router
    .route('/login')
    .get((req, res) => {
        res.render("./users/login", {title: "Login"})
    })
    .post(async(req, res) => {
        req.body.emailAddressInput = validation.checkEmail(req.body.emailAddressInput)
        req.body.passwordInput = validation.checkPassword(req.body.passwordInput)  
        try {
            let userInfo = await userData.loginUser(req.body.emailAddressInput, req.body.passwordInput)
            req.session.name = "AuthState"
            req.session.user = userInfo
            res.redirect("../feed") 
        } catch (e) {
          console.log(e)
          return res.status(400).render("./users/login", {
            title: "Login",
            error: e
          })
        }
    })

router
    .route('/logout')
    .get(async(req, res) => {
        res.render("./users/logout", {title: "Logout"})
    })

export default router