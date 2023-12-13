import {Router} from "express"
const router = Router()

router
    .route('/')
    .get(async (req, res) => {
    //get some example portfolios to display for the landing page
    res.render("./users/landing", {title: "Landing"})
})

export default router