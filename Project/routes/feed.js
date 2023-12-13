import {Router} from "express"
const router = Router()

//ensure the user is logged in first


//routes
router
    .route('/')
    .get(async(req, res) => {
        //get the current users feed
        res.render("./users/feed", {title: "Feed"})
    })

router
    .route('/user')
    .get(async(req, res) => {
        
    })

router
    .route('/user/:portfolioId')
    .get(async(req, res) => {
        
    })

router
    .route('/search')
    .get(async(req, res) => {
        res.render("./users/search", {title: "Search"})
    })
    .post(async (req, res) => {
        //search
    })

export default router