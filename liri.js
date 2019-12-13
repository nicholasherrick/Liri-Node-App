// Listed our NPM package requirements
require("dotenv").config();
const axios = require('axios');
const inquirer = require('inquirer');
const fs = require("fs");
const moment = require('moment');
// Sets up the current moment for moment.js use
moment().format();
const Spotify = require('node-spotify-api');
// So our app knows it needs the keys.js file
const keys = require("./keys.js");
// Takes the api keys from the keys.js file
const spotify = new Spotify(keys.spotify);
// Runs the app
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
    ]).then(function(input){
        logText(input.password);
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "Hi! I'm Liri Bot, What's Your Name?",
            }
    ]).then(function(input){
        logText(input.name);
        inquirer.prompt([
            {
                type: "confirm",
                name: "continue",
                message: "Welcome " + input.name + "! You can ask me to search for data about concerts, songs and movies. Would You Like to Continue?"
            }
    ]).then(function getCommand(){
        // This is where the app will take in commands
    inquirer.prompt([
    {
        type: "input",
        name: "command",
        message: "Please Enter a valid Command input. Type 'concert-this', 'spotify-this-song', 'movie-this', or 'do-what-it-says', followed by your search query so that I can help you find what you're looking for. Or, type 'exit' to exit the program"
    }
    ]).then(function readCommand(input){
        // sends the input to the function that logs the command to a .txt file
        logText(input.command);
        // Takes in the command and formats it for our functions to use
        var userInput = input.command;
        var inputArray = userInput.split(" ");
        var command = inputArray[0]
        var searchTerm = inputArray.slice(1).join("+");
        if(command === "movie-this"){
            axios.get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy").then(function(response){
                // After we have the data, it will log it for the user to see
                console.log("========Movie=Info========")
                console.log("Title: " + response.data.Title + "\nYear: " + response.data.Year + "\nimdb Rating: " + response.data.imdbRating + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot Summary: " + response.data.Plot + "\nActors/Actresses: " + response.data.Actors);
                console.log("==========================");
                // Here we are sending the data to the function that will log said data to a .txt file
                logData("\n========Movie=Info========\nTitle: " + response.data.Title + "\nYear: " + response.data.Year + "\nimdb Rating: " + response.data.imdbRating + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot Summary: " + response.data.Plot + "\nActors/Actresses: " + response.data.Actors + "\n==========================\n");
                // sends the user back to the inquirer prompt that waits for a new command
                return getCommand();
            });
        }else if(command === "concert-this"){
            axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp").then(
                function(response){
                    var events = response.data;
                    if(events.length>0){
                        for(var i=0; i<events.length; i++){
                            console.log("==========Events==========");
                            console.log("Name of Venue: " + events[i].venue.name + "\nLocation: " + events[i].venue.city + ", " + events[i].venue.country + "\nDate: " + moment(events[i].venue.datetime).format("MM/DD/YYYY"));
                            console.log("==========================");
                            logData("\n==========Events==========\nName of Venue: " + events[i].venue.name + "\nLocation: " + events[i].venue.city + ", " + events[i].venue.country + "\nDate: " + moment(events[i].venue.datetime).format("MM/DD/YYYY") + "\n==========================\n");
                            return getCommand();
                        }
                    }else{
                        console.log("=========================");
                        console.log("There are no upcoming events for this artist");
                        console.log("=========================");
                        logData("\n=========================\nThere are no upcoming events for this artist\n=========================\n");
                        return getCommand();
                    }
                });
        }else if (command === "spotify-this-song"){
            spotify.search({
                type: "track",
                query: searchTerm,
                limit: 1
            },function(err, data){
                if(err){
                    console.log("Error occurred: " + err);
                    return getCommand();
                }else{
                    var song = data.tracks.items
                    for(var i=0; i<song.length; i++){
                        console.log("===========Song===========");
                        process.stdout.write("Artist(s): ");
                        logData("\n===========Song===========\nArtist(s): ");
                        var artistsData = song[i].artists[0].name;
                        console.log(artistsData);
                        logData(artistsData);
                        // Commented out because data wont display consistantly
                        // for(var j=0; j<artistsData.length; j++){
                        //     if (artistsData.length>1){
                        //         var artistsList = artistsData[j].name;
                        //         var convertedArray = [];
                        //         convertedArray.push(artistsList);
                        //         var artistsListString = convertedArray;
                        //         console.log(artistsListString.toString());
                        //         logData(artistsListString.join(" \n"));
                        //     }else{
                        //         console.log(artistsData[j].name);
                        //         logData(artistsData[j].name);
                        //     }
                        // }
                        console.log("Title: " + song[i].name + "\nLink: " + song[i].preview_url + "\nAlbum: " + song[i].album.name + "\n=========================");
                        logData("\nTitle: " + song[i].name + "\nLink: " + song[i].preview_url + "\nAlbum: " + song[i].album.name + "\n=========================\n");
                        return getCommand();
                    }
                }
            })
        }else if(command === "do-what-it-says"){
            fs.readFile("random.txt", "utf8", function(error, data){
                var dataArr = data.split(",").join(" ");
                if (error){
                    console.log(error);
                    return getCommand();
                }else{
                    
                    readCommand({
                            command: dataArr
                        });
                }
            });
        }else if (command === "exit"){
            return;
        }else{
            console.log("Sorry, I don't understand, Please Enter a Valid Command Input");
            return getCommand();
        }
    }).catch(function(error){
        // catches any errors and logs them to the console
        if(error.response){
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
            return getCommand();
        }else if(error.request){
            console.log(error.request);
            return getCommand();
        }else{
            console.log("Error", error.message);
        }
        console.log(error.config);
        return getCommand();
    });
    });
    });
    });
}

// functions that log information to the .txt files
function logData(input){
    var text= input
    fs.appendFile("log-data.txt", text, function(err){
        if(err){
            console.log("Error logging input: " + err);
        }
    })
}

function logText(input){
    var text= input.split(" ").join(",");
    text += ",";
    fs.appendFile("log-commands.txt", text, function(err){
        if(err){
            console.log("Error logging input: " + err);
        }
    })
}
// Runs the app after user inputs "node liri.js"
begin();
