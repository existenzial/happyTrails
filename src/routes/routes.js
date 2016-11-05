import express from "express";
import passport from "passport";
const router = express.Router();

/*
GET   to  /
GET   to  /login
POST  to  /login
GET   to  /signup
POST  to  /signup
GET   to  /logout
*/

router
  .get( "/", (req, res, next) => {
    const { session, user } = req;
    res.send({
      session,
      user,
      isAuthenticated: req.isAuthenticated()
    });
  })
  .get( "/login", (req, res, next) => {
    res.render( "login" );
  })
  .post( "/login", passport.authenticate( "local", {
    successRedirect: "/",
    failureRedirect: "/login"
  }))
  .get( "/signup", (req, res, next) => {
    res.render( "signup" );
  })
  .post( "/signup", passport.authenticate( "local-register", {
    successRedirect: "/",
    failureRedirect: "/signup"
  }))
  .get( "/logout", (req, res, next) => {
    req.session.destroy( (err) => {
      res.redirect( "/login" );
    })
  })
;

module.exports = router;