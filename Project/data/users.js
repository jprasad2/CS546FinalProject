//users

import {users} from '../config/mongoCollections.js'
import bcrypt from 'bcryptjs'
const saltRounds = 16

/*
User Schema
    firstName,
    lastName,
    Email,
    Age,
    hashedPassword,
    Followers,
    Following,
    portfolioIDs,
    Username,
    Bio,
    profilePicture

registerUser will register a user with first, last, age, email, username, password
updateUser can edit email, username, bio, profile picture
followers/following gets changed automatically when the user follows or is followed
portfolioIDs gets changed automatically by the createPortfolios func in portfolios
loginUser will login the user
*/

const registerUser = async (
    firstName,
    lastName,
    Email,
    Age,
    hashedPassword,
    Followers,
    Following,
    portfolioIDs,
    Username,
    Bio,
    profilePicture
) => {
    //input validation


    //create user and add to database
}

const updateUser = async () => {
    //input validation
}

const loginUser = async (email, password) => {

}

export default {
    registerUser,
    updateUser,
    loginUser
}