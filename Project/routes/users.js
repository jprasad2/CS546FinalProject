import { Router } from "express";
const router = Router();

import validation from "../validation.js";
import { userData } from "../data/index.js";
import { portfolioData } from "../data/index.js";

router.route("/").get(async (req, res) => {
  res.status(404).render("./error/error", {
    type: "error-not-found",
    error: "Not found",
    title: "Error Page",
  });
});

router
  .route("/editportfolio/:id")
  .get(async (req, res) => {
    console.log("made it to route");
    try {
      let posts = [
        { PostId: "657e6d9b72110fe95ed8f041", postTitle: "myfirstpost" },
        { PostId: "657e6d9b72110fe95ed8f042", postTitle: "mysecondpost" },
        { PostId: "657e6d9b72110fe95ed8f043", postTitle: "mythirdpost" },
      ];
      let portfolio = await portfolioData.getPortfolioById(req.params.id);
      console.log(portfolio);
      if (portfolio.Posts.length !== 0) {
        posts = portfolio.Posts;
      }
      res.render("./users/editport", {
        title: `${portfolio.Subject}`,
        posts: posts,
        id: portfolio._id,
      });
    } catch (e) {
      console.log(e);
    }
  })
  .post(async (req, res) => {
    portfolioData.updatePortfolio(
      req.body.portId,
      req.body.subject,
      req.body.postId
    );
    res.redirect("/user/profile");
  });

router.route("/profile").get(async (req, res) => {
  //console.log(req.session.user)
  let portids = req.session.user.portfolioIDs;
  let ports = [];
  for (let i = 0; i < portids.length; i++) {
    ports.push(await portfolioData.getPortfolioById(portids[i]));
  }
  //console.log(ports)
  /*
  using a function getPostsById, add ports.Posts = [getPostsById(postids)]
  then in the frotend it can be displayed using {{#each Post}}
  */
  res.render("./users/profile", {
    title: "Profile",
    User: req.session.user,
    Portfolio: ports,
  });
});

router
  .route("/editprofile")
  .get(async (req, res) => {
    res.render("./users/editprofile", { title: "Edit Profile" });
  })
  .post(async (req, res) => {
    //console.log("edit profile")
    let toUpdate = [];
    try {
      if (req.body.updateBio && req.body.updatePic) {
        //console.log("update bio and pic")
        //console.log(req.session.user.Email)
        //console.log(req.body.radioPic)
        toUpdate = [
          0,
          req.session.user.Email,
          { updateBio: req.body.bioInput, updatePic: req.body.radioPic },
        ];
        let updatedUser = await userData.updateUser(toUpdate);
        if (updatedUser) {
          req.session.user.Bio = updatedUser.Bio;
          //console.log(req.session.user.Bio)
          req.session.user.profilePicture = updatedUser.profilePicture;
          res.render("./users/editprofile", {
            title: "Edit Profile",
            updated: "PROFILE HAS BEEN UPDATED",
          });
        }
      } else if (req.body.updateBio) {
        //console.log("update bio")
        toUpdate = [1, req.session.user.Email, { updateBio: req.body.bio }];
        let updatedUser = await userData.updateUser(toUpdate);
        if (updatedUser) {
          req.session.user.Bio = updatedUser.Bio;
          //console.log(req.session.user.Bio)
          res.render("./users/editprofile", {
            title: "Edit Profile",
            updated: "PROFILE HAS BEEN UPDATED",
          });
        }
      } else if (req.body.updatePic) {
        //console.log("update pic")
        toUpdate = [
          2,
          req.session.user.Email,
          { updatePic: req.body.radioPic },
        ];
        let updatedUser = await userData.updateUser(toUpdate);
        if (updatedUser) {
          req.session.user.profilePicture = updatedUser.profilePicture;
          res.render("./users/editprofile", {
            title: "Edit Profile",
            updated: "PROFILE HAS BEEN UPDATED",
          });
        }
      }
    } catch (e) {
      res.render("./users/editprofile", { title: "Edit Profile", error: e });
    }
  });

router
  .route("/signup")
  .get(async (req, res) => {
    res.render("./users/signup", { title: "Signup" });
  })
  .post(async (req, res) => {
    /*
        request body:
        {
            firstName: "first name"
            lastName: "last name"
            email: "email address"
            age: "age"
            username: "username"
            password: "password"
        }
        */

    try {
      let firstName = validation.checkName(req.body.firstNameInput);
      let lastName = validation.checkName(req.body.lastNameInput);
      let email = validation.checkEmail(req.body.createEmailAddressInput);
      let username = validation.checkUsername(req.body.usernameInput);
      let password = validation.checkPassword(req.body.createPasswordInput);
      let age = validation.getAge(req.body.date);

      let newUser = await userData.registerUser(
        firstName,
        lastName,
        email,
        age,
        username,
        password
      );
      console.log(newUser);
      return res.redirect("login");
      return res.status(200).json(newUser);
    } catch (e) {
      console.log(e);
      res.status(400).render("./users/signup", { title: "Signup", error: e });
    }
  });

router
  .route("/login")
  .get((req, res) => {
    res.render("./users/login", { title: "Login" });
  })
  .post(async (req, res) => {
    req.body.emailAddressInput = validation.checkEmail(
      req.body.emailAddressInput
    );
    req.body.passwordInput = validation.checkPassword(req.body.passwordInput);
    try {
      let userInfo = await userData.loginUser(
        req.body.emailAddressInput,
        req.body.passwordInput
      );
      req.session.name = "AuthState";
      req.session.user = userInfo;
      res.redirect("../feed");
    } catch (e) {
      console.log(e);
      return res.status(400).render("./users/login", {
        title: "Login",
        error: e,
      });
    }
  });

router.route("/createport")
    .get(async (req, res) => {
      res.render("./users/createport", { title: "Create Portfolio" });
    })
    .post(async (req, res) => {
      console.log("here")
      req.body.subjectInput = validation.checkStr(req.body.subjectInput)
      console.log(req.body.subjectInput)
      if (!req.body.subjectInput.length)
          throw "Must name the portfolio"
      try {
        if (req.body.subjectInput.length == 0)
          throw "Must name the portfolio"
        let portInfo = await portfolioData.createPortfolio(req.body.subjectInput, new Date(), req.session.user.Email)
        if (portInfo)
        {
          let userInfo = await userData.getByUsername(req.session.user.Username)
          if (userInfo) {
            req.session.user.portfolioIDs = userInfo.portfolioIDs;
            return res.render("./users/createport", {title: "Create Portfolio", Created: "Portfolio created"})
          }
        }
      } catch (e) {
        return res.status(400).render("./users/createport", {title: "Create Portfolio", error: e})
      }
    })

router.route("/logout").get(async (req, res) => {
  req.session.destroy()
  res.render("./users/logout", { title: "Logout" });
});

export default router;
