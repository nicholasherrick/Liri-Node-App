require("dotenv").config();
const axios = require('axios');
const inquirer = require('inquirer');
const fs = require("fs");
const moment = require('moment');
moment().format();
const spotifyAPI = require('node-spotify-api');
const keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

// var inputCommand = process.argv[2];
// var inputParameter = process.argv[3];

const login = inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "Please Enter Username",
        validate: function(input){
            if(input === "username"){
                return true;
            }else if (input === ""){
                return "Please Enter Username"
            }else{
                return "Incorrect Username"
            }
        }
    },
    {
        type: "password",
        name: "password",
        message: "Please Enter Password",
        validate: function(input){
            if(input === "password"){
                return true;
            }else if (input === ""){
                return "Please Enter Password"
            }else{
                return "Incorrect Password"
            }
        }
    }
]);
login

axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
    function(response){
        console.log("The Movie's rating is: " + response.data.imdbRating);
}).catch(function(error){
    if(error.response){
        console.log("---------------Data---------------");
    console.log(error.response.data);
    console.log("---------------Status---------------");
    console.log(error.response.status);
    console.log("---------------Status---------------");
    console.log(error.response.headers);
    }else if(error.request){
        console.log(error.request);
    }else{
        console.log("Error", error.message);
    }
    console.log(error.config);
});