import { portfolios } from "../config/mongoCollections.js";
import { users } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";

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
    cumulativeRating: "",
  };

  const portfolioCollection = await portfolios();
  //do we want to check if a portfolio with that subject already exists?

  const insertInfo = await portfolioCollection.insertOne(newPortfolio);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Could not create portfolio";

  //add portfolioID to the user's field
  const userCollection = await users();
  const user = await userCollection.findOne({ Email: Email });
  //console.log(user)
  console.log(insertInfo.insertedId.toString());
  user.portfolioIDs.push(insertInfo.insertedId.toString());
  const updateuser = await userCollection.findOneAndUpdate(
    { Email: Email },
    { $set: { portfolioIDs: user.portfolioIDs } },
    { returnDocument: "after" }
  );
  if (!updateuser) throw [500, "Could not add portfolio to user"];

  return { insertedPortfolio: true };
};

const updatePortfolio = async (id, Subject, PostIds, cumulativeRating) => {
  try {
    const portfolioCollection = await portfolios();
    let portfolioObjectId = new ObjectId(id);
    let today = new Date("2023-12-17T03:45:10.670Z");
    today.setDate(today.getDate() + 1);
    const formattedDate = today.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "numeric",
      day: "numeric",
    });

    let updatedPort = await portfolioCollection.findOneAndUpdate(
      { _id: portfolioObjectId },
      {
        $set: {
          Subject: Subject,
          lastUpdate: formattedDate,
          Posts: PostIds.map((postId) => ({ _id: new ObjectId(postId) })),
        },
      },
      {
        returnDocument: "after",
      }
    );
    if (!updatedPort) {
      throw "error: update Portfolio not successful";
    }
    return updatedPort;
  } catch (e) {
    throw e;
  }
};

const deletePortfolio = async () => {};

const searchBySubject = async (Subject) => {
  const portfolioCollection = await portfolios();
  let portfolioMatch = await portfolioCollection
    .find({ Subject: { $regex: Subject, $options: "i" } })
    .toArray();
  //https://dev.to/sagnikbanerjeesb/partial-text-search-on-mongo-46j3
  if (!portfolioMatch) throw "Unable to find portfolios";
  console.log(portfolioMatch);

  const userCollection = await users();
  let userList = [];
  for (let i = 0; i < portfolioMatch.length; i++) {
    userList.push(
      await userCollection.findOne({
        portfolioIDs: portfolioMatch[i]._id.toString(),
      })
    );
  }
  console.log(userList);
  return userList;
};

const getPortfolioById = async (id) => {
  const portfolioCollection = await portfolios();
  try {
    let port = await portfolioCollection.findOne({ _id: new ObjectId(id) });
    //console.log(port)
    return port;
  } catch (e) {
    throw e;
  }
};

export default {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  searchBySubject,
  getPortfolioById,
};
