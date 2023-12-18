import { Router } from "express";
import validation from "../validation.js";
const router = Router();
import { userData } from "../data/index.js";
import { portfolioData } from "../data/index.js";

//ensure the user is logged in first

//routes
router.route("/").get(async (req, res) => {
  //get the current users feed
  if (req.session.user.Following.length == 0)
    res.render("./users/feed", { title: "Feed" });
  else {
    let user;
    let ports = [];
    for (let i = 0; i < req.session.user.Following.length; i++) {
      user = await userData.getById(req.session.user.Following[i]);
      let portids = user.portfolioIDs;
      for (let j = 0; j < portids.length; j++) {
        ports.push(await portfolioData.getPortfolioById(portids[j]));
        ports[ports.length - 1].Username = user.Username;
      }
    }

    res.render("./users/feed", { title: "Feed", Feed: ports });
  }
});

router
  .route("/user/:Username")
  .get(async (req, res) => {
    req.params.Username = validation.checkUsername(req.params.Username);
    //console.log(req.params.Username)
    let user;
    try {
      user = await userData.getByUsername(req.params.Username);
    } catch (e) {
      return res.render("./users/viewuser", {
        title: "User Profile",
        error: e,
      });
    }
    console.log(user);
    let portids = user.portfolioIDs;
    let ports = [];
    for (let i = 0; i < portids.length; i++) {
      ports.push(await portfolioData.getPortfolioById(portids[i]));
    }
    console.log("portfolios: ", ports);

    res.render("./users/viewuser", {
      title: "User Profile",
      User: user,
      Portfolio: ports,
    });
  })
  .post(async (req, res) => {
    req.params.Username = validation.checkUsername(req.params.Username);
    let userFollowed;

    let user;
    try {
      user = await userData.getByUsername(req.params.Username);
    } catch (e) {
      return res.render("./users/viewuser", {
        title: "User Profile",
        error: e,
      });
    }
    console.log(user);
    let portids = user.portfolioIDs;
    let ports = [];
    for (let i = 0; i < portids.length; i++) {
      ports.push(await portfolioData.getPortfolioById(portids[i]));
    }

    try {
      userFollowed = await userData.addFollow(
        req.session.user.Username,
        req.params.Username
      );
      req.session.user.Following = userFollowed[1].Following;
      return res.render("./users/viewuser", {
        title: "User Profile",
        User: user,
        Portfolio: ports,
        followed: userFollowed[0],
      });
    } catch (e) {
      return res.render("./users/viewuser", {
        title: "User Profile",
        User: user,
        Portfolio: ports,
        error: e,
      });
    }
  });

router
  .route("/search")
  .get(async (req, res) => {
    res.render("./users/search", { title: "Search" });
  })
  .post(async (req, res) => {
    //search
    //don't validate because string can be an empty string
    //and it will return all
    //req.body.searchInput = validation.checkStr(req.body.searchInput)
    try {
      let searchResults;
      if (req.body.searchType == "username")
        searchResults = await userData.searchByUser(req.body.searchInput);
      else if (req.body.searchType == "subject")
        searchResults = await portfolioData.searchBySubject(
          req.body.searchInput
        );

      let Query =
        "Searched for " + req.body.searchType + ": " + req.body.searchInput;
      res.render("./users/search", {
        title: "Search",
        Query: Query,
        searchResults: searchResults,
      });
    } catch (e) {
      return res.status(400).render("./users/search", {
        title: "Search",
        error: e,
      });
    }
  });

export default router;
