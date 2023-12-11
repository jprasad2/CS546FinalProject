import { portfolios } from "../config/mongoCollections"

/*
Portfolio Schema
    Subject,
    lastUpdate,
    createDate,
    Posts,
    cumulativeRating

createPortfolio will create a portfolio with subject, createDate, Posts
    *users need to create a first post for the portfolio when they create the portfolio
    *lastUpdate gets set to createDate, cumulativeRating gets a default value
deletePortfolio will delete a portfolio and all related posts
cumulativeRating will be automatically calculated
*/

const createPortfolio = async (
    subject,
    createDate,
    Posts
) => {
    //input validation
    

    //create portfolio and add to database


    //add portfolioID to the user's field

}

const deletePortfolio = async () => {

}

export default {

}