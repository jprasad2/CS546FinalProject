import {Router} from "express"
import validation from "../validation.js"
const router = Router()
import { userData } from "../data/index.js"

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
        req.body.searchInput = validation.checkStr(req.body.searchInput)
        try {
            let searchResults
            if (req.body.searchType == 'username')
                searchResults = await userData.searchByUser(req.body.searchInput)
            res.render("./users/search", {title: "Search", searchResults: searchResults})

        } catch (e)
        {
            return res.status(400).render("./users/search", {
                title: "Search",
                error: e
              })
        }
    })

export default router