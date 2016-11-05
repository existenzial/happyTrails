import db from "./db";
import bcrypt from "bcrypt-nodejs";
import passport from "passport";
const LocalStrategy = require("passport-local").Strategy;

passport
  .use( new LocalStrategy( authenticate ) )
  .use( "local-register", new LocalStrategy({ passReqToCallback: true }, register ))
;

function authenticate (email, password, done) {
  db( "users" )
    .where( "email", email )
    .first()
    .then( (user) => {
      if (!user || !bcrypt.compareSync( password, user.password )) {
        return done( null, false, { message: "Login failed. Please check username and/or password." } )
      }
      done( null, user );
    }, done)
}

function register(req, email, password, done) {
  db( "users" )
    .where( "email", email )
    .first()
    .then( (user) => {
      if (user) {
        return done( null, false, { message: "user account already exists." });
      }
      if (password !== req.body.password2) {
        return done( null, false, { message: "passwords don't match." } )
      }

      const { first_name, last_name } = req.body;
      const newUser = {
        first_name,
        last_name,
        email,
        password: bcrypt.hashSync( password )
      };

      db( "users" )
        .insert( newUser )
        .then( ids => {
          newUser.id = ids[0];
          done( null, newUser );
        })
    })
}

passport.serializeUser( (user, done) => {
  done( null, user.id );
});

passport.deserializeUser( (id, done) => {
  db( "users" )
    .where( "id", id )
    .first()
    .then( (user) => {
      done( null, user );
    }, done)
});