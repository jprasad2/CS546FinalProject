import { portfolios } from "../config/mongoCollections.js"
import {users} from '../config/mongoCollections.js'

/*
Portfolio Schema
    Subject,
    lastUpdate,
    createDate,
    Posts,
    cumulativeRating

createPortfolio will create a portfolio with subject, createDate
    *lastUpdate gets set to createDate, cumulativeRating gets a default value
deletePortfolio will delete a portfolio and all related posts
cumulativeRating will be automatically calculated when posts are added/updated
*/

const createPortfolio = async (
    Subject,
    createDate,
    Email //Email is supplied so that we can get the user from the user database and add the portfolioID to that user
) => {
    //input validation
    

    //create portfolio and add to database
    let newPortfolio = {
        Subject: Subject,
        lastUpdate: createDate,
        createDate: createDate,
        Posts: [],
        cumulativeRating: ""
    }

    const portfolioCollection = await portfolios()
    //do we want to check if a portfolio with that subject already exists?


    const insertInfo = await portfolioCollection.insertOne(newPortfolio)
    if(!insertInfo.acknowledged || !insertInfo.insertedId)
        throw 'Could not create portfolio'


    //add portfolioID to the user's field
    const userCollection = await users()
    const user = await userCollection.findOneAndUpdate(
        {Email: Email},
        {$set: {PortfolioIDs: portfolioIDs.append(insertInfo.insertedId)}},
        {returnDocument: 'after'}
        )
    if(!user) throw [500, "Could not add portfolio to user"]

    return {insertedPortfolio: true}
}

const deletePortfolio = async () => {

}

export default {
    createPortfolio,
    deletePortfolio
}