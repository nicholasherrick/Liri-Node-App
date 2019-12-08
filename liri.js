require("dotenv").config();
const axios = require('axios');
var inquirer = require('inquirer');
var fs = require("fs");
var moment = require('moment');
moment().format();
var spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotifyKeys = new Spotify(keys.spotify);

// var omdbURL = "http://www.omdbapi.com/?apikey[d81871c0]&"

// var inputCommand = process.argv[2];
// var inputParameter = process.argv[3];
