import {Router} from "express"
const router = Router()

router
    .route('/')
    .get(async(req, res) => {
    //get some example portfolios to display for the landing page
})

export default router