import express from "express";
import routes from "./routes/routes";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import favicon from "serve-favicon";
import db from "./db";
require("./passport");

const app = express();
const staticAssets = __dirname + "/public";
const faviconPath = __dirname + "/public/favicon.ico";

app
  .set( "view engine", "hjs" )
  // .use( express.static( staticAssets ) )
  // .use( favicon( faviconPath ) )
  .use( bodyParser.json() )
  .use( bodyParser.urlencoded({ extended: false }) )
  .use(session({
    secret: "trailblazing for tomorrow",
    resave: false,
    saveUninitialized: false
  }))
  .use( passport.initialize() )
  .use( passport.session() )
  .use( "", routes )
  .listen( 3000 );
;