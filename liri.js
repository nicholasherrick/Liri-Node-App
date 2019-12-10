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
        message: "Liri is booting up. Please Enter Password. *Hint: The Password is: password",
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
    ]).then(function(){
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Hi! I'm Liri Bot, What's Your Name?",
            }
    ]).then(function(input){
        inquirer.prompt([
            {
                type: "confirm",
                name: "continue",
                message: "Welcome " + input.name + "! You can ask me to search for data about concerts, songs and movies. Would You Like to Continue?"
            }
    ]).then(function getCommand(){
    inquirer.prompt([
    {
        type: "input",
        name: "command",
        message: "Please Enter a valid Command input. Type 'concert-this', 'spotify-this-song', 'movie-this', or 'do-what-it-says', followed by your search query so that I can help you find what you're looking for."
    }
    ]).then(function(input){
        var userInput = input.command;
        var inputArray = userInput.split(" ");
        var command = inputArray[0]
        var searchTerm = inputArray.slice(1).join("+");
        if(command === "movie-this"){
            axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(function(response){
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("imdb Rating: " + response.data.imdbRating);
                console.log("Country: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot Summary: " + response.data.Plot);
                console.log("Actors/Actresses: " + response.data.Actors);
                return getCommand();
            });
        }else if(command === "concert-this"){
            axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp").then(
                function(response){
                    var events = response.data;
                    if(events.length>0){
                        for(var i=0; i<events.length; i++){
                            console.log("==========Events==========")
                            console.log("Name of Venue: " + events[i].venue.name);
                            console.log("Location: " + events[i].venue.city + ", " + events[i].venue.country);
                            console.log("Date: " + moment(events[i].venue.datetime).format("MM/DD/YYYY"));
                            console.log("==========================")
                            return getCommand();
                        }
                    }else{
                        console.log("=========================")
                        console.log("There are no upcoming events for this artist")
                        console.log("=========================")
                        return getCommand();
                    }
                });
        }
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
    });
    });
    });
}
begin();
