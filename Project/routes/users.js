import {Router} from "express"
const router = Router()

import validation from "../validation.js"
import {userData} from "../data/index.js"

router
    .route('/profile')
    .get(async (req, res) => {

    })

router
    .route('/signup')
    .get((req, res) => {
        res.status(200).json("get /users/signup")
    })
    .post(async(req, res) => {
        /*
        request body:
        {
            firstName: "first name"
            lastName: "last name"
            email: "email address"
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

    })
    .post(async(req, res) => {

    })

router
    .route('/logout')
    .get(async(req, res) => {

    })

export default router