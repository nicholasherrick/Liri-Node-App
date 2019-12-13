# Liri-Node-App

![Screenshot](/assets/screenshot.png)

## About

This application makes use of Node.js to create a command line interface. The user must install several npm packages before the app will work. After entering a password and name, the user is given the ability to type in commands that the app will take in and run various functions to return specific data. The user can type in "movie-this" followed by a movie name to display data about the movie, "concert-this" followed by a musician/band name, "spotify-this-song" followed by a song name, and "do-what-it-says" will display the data for a song saved in the random.txt file. The app uses the spotify, bandsintown, and omdn APIs to display the data. The  app also records all the data and commands entered into 2 different .txt files. The user is able to continually use the app to make searches without reloading it again. The user can type "exit" as a command to exit the app.

## Demo/Code

![Demo](/assets/video.webm)

![Code](/assets/code.png)

## Requirements

*[Node](https://nodejs.org/en/)

*[Spotify API Key](https://developer.spotify.com/dashboard/)

*[Spotify API](https://www.npmjs.com/package/node-spotify-api)

*[Axios](https://www.npmjs.com/package/axios)

*[Moment NPM](https://www.npmjs.com/package/moment)

*[Dotenv](https://www.npmjs.com/package/dotenv)

*[Inquirer](https://www.npmjs.com/package/inquirer)

*[FS](https://www.npmjs.com/package/file-system)

## Instructions

1. Clone repository

2. Sign up for a Spotify API Key

3. create a .env file and add the spotify api keys like so:
```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```
4. Open the git bash terminal and navigate to the repository

5. Enter ```npm init -y``` into the terminal

6. Enter ```npm i dotenv axios moment inquirer fs node-spotify-api``` and wait for packages to install

7. Enter ```node liri.js``` and follow onscreen prompts to use the app

## Build Tools

*Javascript

*Git Bash Terminal

*Moment.js

*Node

*NPM