/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    games.forEach(function(game) {

        const element = document.createElement("div");
        element.classList.add("game-card");

        element.innerHTML = `
        <img src="${game.img}" alt = "${game.name}" class="game-img" />
        <h3> ${game.name}<h3/>
        <h5> ${game.description} <h5/>
        `;

        document.getElementById("games-container").append(element);
    });

}
/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
contributionsCard.innerHTML = GAMES_JSON.reduce((sum,game)=>{
    return sum+game.backers
},0).toLocaleString("en-US")

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
raisedCard.innerHTML = "$" + GAMES_JSON.reduce((sum,game)=>{
    return sum + game.pledged
},0).toLocaleString("en-US")


const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const games = GAMES_JSON.filter((song)=>{
       return song.pledged < song.goal;
    })
    addGamesToPage(games)
    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const games = GAMES_JSON.filter((song)=>{
        return song.pledged >= song.goal;
     })
     addGamesToPage(games)
    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON)
    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener('click',filterUnfundedOnly)
const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener('click', filterFundedOnly)
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener('click', showAllGames)


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

const descriptionContainer = document.getElementById("description-container");
    const noOfUnfundedGames = GAMES_JSON.reduce((sum, game)=>{
        return sum + (game.goal > game.pledged ? 1 : 0)
    },0)
    console.log("Hello",noOfUnfundedGames)
    const message = `We have raised a total of ${raisedCard.innerHTML} for ${GAMES_JSON.length > 1 ? GAMES_JSON.length + " games" : GAMES_JSON + " game" }. We still need help funding ${noOfUnfundedGames>1? noOfUnfundedGames +" games" : noOfUnfundedGames + " game"}. We are looking forward for your generosity.`
    const paragraph = document.createElement('p')
    paragraph.innerHTML = message
    descriptionContainer.append(paragraph)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
let [topFundedGame, secondTopFundedGame, ...others] = sortedGames

let topGame = document.createElement('h4')
topGame.innerHTML = topFundedGame.name
let secondGame = document.createElement('h4')
secondGame.innerHTML = secondTopFundedGame.name
firstGameContainer.append(topGame)
secondGameContainer.append(secondGame)