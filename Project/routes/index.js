//import route files here
import userRoutes from './users.js'
import landingRoutes from './landing.js'
import feedRoutes from './feed.js'

//constructor method
const constructorMethod = (app) => {
    //landing page, has example portfolios for users not logged in
    app.use('/', landingRoutes)
    /*
    userRoutes contains the following
        /profile: the users profile which displays their info, bio, and portfolios
        /signup: the user creates an account
        /login: the user logs into their account
        /logout: the user logs out of their account
    */
    app.use('/user', userRoutes)
    /*
    feedRoutes contains the following
        /: entire feed for a logged in user
        /user: viewing another user's profile
        /user/:portfolioId: viewing another user's portfolio
    */
    app.use('/feed', feedRoutes)

    app.use('*', (req, res) => {
        res.status(404).render('./error', {type: 'error-not-found', error: 'Not found', title: 'Error Page'})
    })
}

export default constructorMethod