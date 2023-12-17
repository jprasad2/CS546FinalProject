//seed script to populate DB
import { dbConnection, closeConnection } from "../config/mongoConnection.js";
import { userData } from "../data/index.js";
import { portfolioData } from "../data/index.js";
import { postData } from "../data/index.js";
import { ObjectId } from "mongodb";

export const seedDatabase = async () => {
  console.log("Dropping Database");
  const db = await dbConnection();
  await db.dropDatabase();

  //add users to database
  console.log("Adding users");
  let firstName, lastName, Email, Age, Username, password;
  let user1 = await userData.registerUser(
    (firstName = "Josh"),
    (lastName = "Prasad"),
    (Email = "email@email.com"),
    (Age = "21"),
    (Username = "jprasad"),
    (password = "Password123!")
  );
  let user2 = await userData.registerUser(
    (firstName = "Patrick"),
    (lastName = "Hill"),
    (Email = "phill@stevens.edu"),
    (Age = "30"),
    (Username = "phill"),
    (password = "Create456!")
  );
  let user3 = await userData.registerUser(
    (firstName = "Tom"),
    (lastName = "Morello"),
    (Email = "tommym@email.com"),
    (Age = "59"),
    (Username = "theTomMorello"),
    (password = "RATMrocks07!")
  );

  //add portfolios to database
  console.log("Creating portfolios");
  let subject, createDate;
  let newPortfolio1 = await portfolioData.createPortfolio(
    (subject = "art"),
    (createDate = "12/12/23"),
    (Email = "email@email.com")
  );
  let newPortfolio2 = await portfolioData.createPortfolio(
    (subject = "music"),
    (createDate = "12/12/23"),
    (Email = "email@email.com")
  );
  let newPortfolio3 = await portfolioData.createPortfolio(
    (subject = "programming"),
    (createDate = "12/12/23"),
    (Email = "phill@stevens.edu")
  );
  let newPortfolio4 = await portfolioData.createPortfolio(
    (subject = "music"),
    (createDate = "12/12/23"),
    (Email = "phill@stevens.edu")
  );
  let newPortfolio5 = await portfolioData.createPortfolio(
    (subject = "art"),
    (createDate = "12/12/23"),
    (Email = "tommym@email.com")
  );
  let newPortfolio6 = await portfolioData.createPortfolio(
    (subject = "programming"),
    (createDate = "12/12/23"),
    (Email = "tommym@email.com")
  );
  let newPortfolio7 = await portfolioData.createPortfolio(
    (subject = "music"),
    (createDate = "12/12/23"),
    (Email = "tommym@email.com")
  );

  console.log("adding posts");
  let portfolioIds = await portfolioData.getAllPortfolios();
  portfolioIds = portfolioIds.map((e) => ({ id: e._id.toString() }));
  //   console.log(portfolioIds);
  //   console.log(portfolioIds[0]);
  //   console.log(typeof portfolioIds[0].id);

  let newPost1 = await postData.createPost(
    "My first post",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "my favorite artist",
    true,
    portfolioIds[0].id
  );
  let newPost2 = await postData.createPost(
    "My first post",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "my favorite artist",
    true,
    portfolioIds[2].id
  );
  let newPost3 = await postData.createPost(
    "My first post",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "my favorite artist",
    true,
    portfolioIds[3].id
  );
};
