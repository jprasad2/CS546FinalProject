import { posts } from "../config/mongoCollections.js";
import { portfolios } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
/*
Posts schema
    Title,
    lastUpdate,
    createDate,
    Rating,
    Comments,
    commentsAllowed

createPost will create a post with title, createDate, commentsAllowed
    *lastUpdate gets set to createDate, Rating gets default value, comments gets default value
    *will update the portfolio lastUpdate
deletePost will delete a post and update the portfolio lastUpdate
updatePost will update a post and update the portfolio lastUpdate
*/

const createPost = async (
  title,
  url,
  description,
  commentsAllowed,
  portfolioId
) => {
  //input validation
  //create post and add to database
  //add post to portfolio

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
  });

  let newPost = {
    Title: title,
    Url: url,
    Description: description,
    lastUpdate: formattedDate,
    createDate: formattedDate,
    Comments: [],
    commentsAllowed: commentsAllowed,
  };
  const postCollection = await posts();
  const insertInfo = await postCollection.insertOne(newPost);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Could not insert post into database";
  const portfolioCollection = await portfolios();
  let portfolioObjectId = new ObjectId(portfolioId);
  let updatedPort = await portfolioCollection.findOneAndUpdate(
    {
      _id: portfolioObjectId,
    },
    {
      $set: {
        lastUpdate: formattedDate,
      },
      $push: {
        Posts: { _id: insertInfo.insertedId },
      },
    },
    { returnDocument: "after" }
  );

  return { insertedPost: true };
};

const getPostsById = async (id) => {
  const postCollection = await posts();
  try {
    let post = await postCollection.findOne({ _id: new ObjectId(id) });
    return post;
  } catch (e) {
    throw e;
  }
};

const getAllPosts = async () => {
  const postCollection = await posts();
  let postList = await postCollection.find({}).toArray();
  console.log(postList);
  return postList;

  //   postList = postList.map((item) => {
  //     item._id = item._id;
  //   });
  //   return postList;
};

const addComment = async (id, comment, firstName, lastName) => {
  try {
    let postObjectId = new ObjectId(id);
    let today = new Date("2023-12-17T03:45:10.670Z");
    today.setDate(today.getDate() + 1);
    const formattedDate = today.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "numeric",
      day: "numeric",
    });
    if (typeof comment !== "string") {
      throw "error";
    }
    comment = comment.trim();
    if (comment.length === 0) {
      throw "error";
    }
    let postCollection = await posts();
    let newComment = {
      _id: new ObjectId(),
      name: firstName + " " + lastName,
      comment: comment,
    };
    let updatedPost = await postCollection.findOneAndUpdate(
      { _id: postObjectId },
      {
        $set: {
          lastUpdate: formattedDate,
        },
        $push: {
          Comments: newComment,
        },
      },
      {
        returnDocument: "after",
      }
    );
    if (!updatedPost) {
      throw "error";
    }
  } catch (e) {
    console.log(e);
  }
};

const deletePost = async () => {};

const updatePost = async () => {};

export default {
  createPost,
  addComment,
  getPostsById,
  getAllPosts,
  deletePost,
  updatePost,
};
