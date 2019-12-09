require("dotenv").config();
const axios = require('axios');
const inquirer = require('inquirer');
const fs = require("fs");
const moment = require('moment');
moment().format();
const spotifyAPI = require('node-spotify-api');
const keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
function begin(){
    inquirer.prompt([
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
]).then(function getName(){
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Welcome! What's Your Name?",
        }
    ]).then(function welcome(input){
        inquirer.prompt([
            {
                type: "confirm",
                name: "continue",
                message: "Welcome " + input.name + "! I'm Liri Bot. You can ask me to search for data about concerts, songs and movies. Would You Like to Continue?"
            }
    ]).then(function getCommand(){
    inquirer.prompt([
    {
        type: "input",
        name: "command",
        message: "Please Enter a Valid Input Command, or type 'help' for a list of commands"
    }
]).then(function(input){
    var userInput = input.command;
    var inputArray = userInput.split(" ");
    var command = inputArray[0]
    var searchTerm = inputArray.slice(1).join("+");
    if(command === "movie-this"){
        axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(
    function(response){
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("imdb Rating: " + response.data.imdbRating);
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot Summary: " + response.data.Plot);
        console.log("Actors/Actresses: " + response.data.Actors);
        return getCommand();
}).catch(function(error){
    if(error.response){
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
        return
    }else if(error.request){
        console.log(error.request);
        return
    }else{
        console.log("Error", error.message);
        return
    }
    console.log(error.config);
    return
});
    }
    return
});
});
});
});
}
begin();
