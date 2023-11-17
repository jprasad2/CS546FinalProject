import {Router} from "express"
const router = Router()

//ensure the user is logged in first


//routes
router
    .route('/')
    .get(async(req, res) => {

    })

router
    .route('/user')
    .get(async(req, res) => {
        
    })

router
    .route('/user/:portfolioId')
    .get(async(req, res) => {
        
    })

export default router