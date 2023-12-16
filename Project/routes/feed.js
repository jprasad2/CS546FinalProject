import {Router} from "express"
import validation from "../validation.js"
const router = Router()
import { userData } from "../data/index.js"
import { portfolioData } from "../data/index.js"

//ensure the user is logged in first


//routes
router
    .route('/')
    .get(async(req, res) => {
        //get the current users feed
        res.render("./users/feed", {title: "Feed"})
    })

router
    .route('/user/:Username')
    .get(async(req, res) => {
        req.params.Username = validation.checkUsername(req.params.Username)
        //console.log(req.params.Username)
        let user
        try {
            user = await userData.getByUsername(req.params.Username)
        } catch (e) {
            return res.render("./users/viewuser", {title: "User Profile", error: e})
        }
        console.log(user)
        let portids = user.portfolioIDs
        let ports = []
        for (let i = 0; i < portids.length; i++) {
            ports.push(await portfolioData.getPortfolioById(portids[i]));
          }

        res.render("./users/viewuser", {title: "User Profile", User: user, Portfolio: ports})
    })

router
    .route('/search')
    .get(async(req, res) => {
        res.render("./users/search", {title: "Search"})
    })
    .post(async (req, res) => {
        //search
        //don't validate because string can be an empty string
        //and it will return all
        //req.body.searchInput = validation.checkStr(req.body.searchInput)
        try {
            let searchResults
            if (req.body.searchType == 'username')
                searchResults = await userData.searchByUser(req.body.searchInput)
            else if (req.body.searchType == 'subject')
                searchResults = await portfolioData.searchBySubject(req.body.searchInput)

            let Query = "Searched for " + req.body.searchType + ": " + req.body.searchInput
            res.render("./users/search", {title: "Search", Query: Query, searchResults: searchResults})

        } catch (e)
        {
            return res.status(400).render("./users/search", {
                title: "Search",
                error: e
              })
        }
    })

export default router