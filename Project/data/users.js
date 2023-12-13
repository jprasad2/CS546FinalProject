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
    Username,
    Password
) => {
    //input validation
    if (!firstName) throw 'Error: first name must be a string'
    if (typeof firstName != 'string') throw 'Error: first name must be a string'
    firstName = firstName.trim()
    if (firstName.length < 2 || firstName.length > 25)
      throw 'Error: first name must be 2-25 characters'
    if (!lastName) throw 'Error: last name must be a string'
    if (typeof lastName != 'string') throw 'Error: last name must be a string'
    lastName = lastName.trim()
    if (lastName.length < 2 || lastName.length > 25)
      throw 'Error: first name must be 2-25 characters'

    if (!Email) throw 'Error: email address must be supplied'
    Email = Email.trim()
    if (typeof Email != 'string') 'Error: email address must be as string'

    if (!Age) throw 'Error: age must be supplied'
    if (!Username) throw 'Error: username must be supplied'
    //Finish error checking for email age, username, and password

    Password = Password.trim()

    //create user and add to database
    let newUser = {
        firstName: firstName,
        lastName: lastName,
        Email: Email,
        Age: Age,
        Username: Username,
        hashedPassword: await bcrypt.hash(Password, saltRounds),
        Followers: [],
        Following: [],
        portfolioIDs: [],
        Bio: "",
        profilePicture: "" //start by putting a path to default profile picture here
    }

    const userCollection = await users()

    const user = await userCollection.findOne({Email: Email})
    if (user) throw "Error: Email is already in use"

    const insertInfo = await userCollection.insertOne(newUser)
    if(!insertInfo.acknowledged || !insertInfo.insertedId)
        throw 'Could not insert user into database'

    return {insertedUser: true}
}

const updateUser = async () => {
    //input validation


    //update user
}

const loginUser = async (Email, password) => {
    const userCollection = await users()
    const user = await userCollection.findOne({Email: Email})

    if (!user) throw 'Either the email address or password is invalid'
    let comparePassword = false
    try {
        comparePassword = await bcrypt.compare(password, user.hashedPassword)
    } catch (e) {}
    if (comparePassword == true)
        return {firstName: user.firstName, 
            lastName: user.lastName,
            Email: user.Email,
            Age: user.Age,
            Username: user.Username,
            Followers: user.Followers,
            Following: user.Following,
            portfolioIDs: user.portfolioIDs,
            Bio: user.Bio,
            profilePicture: user.profilePicture}
    else
        throw 'Either the email address or password is invalid'
}

const getAllUsers = async(Username) => {
    const userCollection = await user()
    let userList = await userCollection.find({}).toArray()

    userList = userList.map((item) => {
        item._id = item._id.toString()
    })

    return userList
}

const searchByUser = async(Username) => {
    const userCollection = await users()
    let usersMatch
    usersMatch = await userCollection.find(
        {Username: {'$in': Username}}
    ).toArray()

    if (!usersMatch) throw "Unable to find users"
    return usersMatch
}

export default {
    registerUser,
    updateUser,
    loginUser,
    searchByUser
}