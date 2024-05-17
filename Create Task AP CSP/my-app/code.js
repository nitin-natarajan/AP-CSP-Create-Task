setProperty("appWelcomeText","text","App Loading...");

var gameDateList = getColumn("FIFA World Cup 2022", "date");
var gameHourList = getColumn("FIFA World Cup 2022", "hour");
var gameCategoryList = getColumn("FIFA World Cup 2022", "category");

var teamOneList = getColumn("FIFA World Cup 2022", "team1");
var teamOnePossessionList = getColumn("FIFA World Cup 2022", "possession% team1");
var goalsTeamOneList = getColumn("FIFA World Cup 2022", "number of goals team1");
var goalAttemptsTeamOneList = getColumn("FIFA World Cup 2022", "total attempts team1");
var assistsTeamOneList = getColumn("FIFA World Cup 2022", "assists team1");
var yellowCardsTeamOneList = getColumn("FIFA World Cup 2022", "yellow cards team1");
var redCardsTeamOneList = getColumn("FIFA World Cup 2022", "red cards team1");
var foulsTeamOneList = getColumn("FIFA World Cup 2022", "fouls against team1");
var offsidesTeamOneList = getColumn("FIFA World Cup 2022", "offsides team1");
var passesTeamOneList = getColumn("FIFA World Cup 2022", "passes team1");
var passesCompletedTeamOneList = getColumn("FIFA World Cup 2022", "passes completed team1");
var cornersTeamOneList = getColumn("FIFA World Cup 2022", "corners team1");
var freekicksTeamOneList = getColumn("FIFA World Cup 2022", "free kicks team1");
var penaltiesTeamOneList = getColumn("FIFA World Cup 2022", "penalties scored team1");

var teamTwoList = getColumn("FIFA World Cup 2022", "team2");
var teamTwoPossessionList = getColumn("FIFA World Cup 2022", "possession% team2");
var goalsTeamTwoList = getColumn("FIFA World Cup 2022", "number of goals team2");
var goalAttemptsTeamTwoList= getColumn("FIFA World Cup 2022", "total attempts team2");
var assistsTeamTwoList = getColumn("FIFA World Cup 2022", "assists team2");
var yellowCardsTeamTwoList = getColumn("FIFA World Cup 2022", "yellow cards team2");
var redCardsTeamTwoList = getColumn("FIFA World Cup 2022", "red cards team2");
var foulsTeamTwoList = getColumn("FIFA World Cup 2022", "fouls against team2");
var offsidesTeamTwoList = getColumn("FIFA World Cup 2022", "offsides team2");
var passesTeamTwoList = getColumn("FIFA World Cup 2022", "passes team2");
var passesCompletedTeamTwoList = getColumn("FIFA World Cup 2022", "passes completed team2");
var cornersTeamTwoList = getColumn("FIFA World Cup 2022", "corners team2");
var freekicksTeamTwoList = getColumn("FIFA World Cup 2022", "free kicks team2");
var penaltiesTeamTwoList = getColumn("FIFA World Cup 2022", "penalties scored team2");

var rand;
var winner;

onEvent("startGameButton1", "click", function( ) {
  setScreen("screen2");
  showElement("startGameButton2");
  setProperty("teamOneLabel", "text","");
  setProperty("teamTwoLabel", "text","");
  setProperty("userGuessInput", "text","");
  setProperty("winnerDecisionLabel", "text","");
  hideElement("restartButton");
  hideElement("decideWinnerButton");
  hideElement("checkFactsButton1");
});

onEvent("startGameButton2", "click", function( ) {
  showElement("decideWinnerButton");
  hideElement("startGameButton2");
  updateGame();
});

onEvent("checkFactsButton1", "click", function( ) {
  setScreen("screen3");
  var labelNameOne = getText("teamOneLabel");
  var labelNameTwo = getText("teamTwoLabel");
  hideElement("teamDropdown1");
  hideElement("teamDropdown2");
  showElement("statsteamOneLabel");
  showElement("statsteamTwoLabel");
  setProperty("statsteamOneLabel","text",labelNameOne);
  setProperty("statsteamTwoLabel","text",labelNameTwo);
  dropdownUpdate(getText("statsteamOneLabel"),getText("statsteamTwoLabel"));
  hideElement("checkFactsButton2");
  showElement("checkFactsButton3");
  showElement("backButton1");
  hideElement("homeButton2");
});

onEvent("checkFactsButton3", "click", function( ) {
  getMatchFacts(getText("statsteamOneLabel"), getText("statsteamTwoLabel"));
});

onEvent("restartButton", "click", function( ) {
  setProperty("teamOneLabel", "text", "");
  setProperty("teamTwoLabel", "text", "");
  setProperty("userGuessInput", "text", "");
  setProperty("winnerDecisionLabel", "text", "");
  updateGame();
  showElement("decideWinnerButton");
  hideElement("checkFactsButton1");
  hideElement("restartButton");
});

onEvent("matchFactsButton", "click", function( ) {
  setScreen("screen3");
  hideElement("statsteamOneLabel");
  hideElement("statsteamTwoLabel");
  showElement("teamDropdown1");
  showElement("teamDropdown2");
  showElement("checkFactsButton2");
  hideElement("checkFactsButton3");
  hideElement("backButton1");
  setProperty("factsText", "text","");
  showElement("homeButton2");
});

onEvent("teamDropdown1", "change", function( ) {
  dropdownUpdate(getText("teamDropdown1"), getText("teamDropdown2"));
});

onEvent("teamDropdown2", "change", function( ) {
  dropdownUpdate(getText("teamDropdown1"), getText("teamDropdown2"));
});

onEvent("checkFactsButton2", "click", function( ) {
    getMatchFacts(getText("teamDropdown1"),getText("teamDropdown2"));
    var dd1 = getText("teamDropdown1");
    var dd2 = getText("teamDropdown2");
    var dd3 = getText("chooseTeamDropdown");
    if ((dd1 == "Team 1")||(dd2 == "Team 2") || (dd3 == "Choose Team")) {
      setProperty("factsText", "text", "Please select all fields!");
      }

});

onEvent("homeButton1", "click", function( ) {
  setScreen("screen1");
});

onEvent("homeButton2", "click", function( ) {
  setScreen("screen1");
  setProperty("factsText", "text","");
});

onEvent("backButton1", "click", function( ) {
  setScreen("screen2"); 
  setProperty("factsText", "text","");
});

  
function updateGame() {
  rand = randomNumber(0, teamOneList.length-1);
  setProperty("teamOneLabel", "text", teamOneList[rand]);
  setProperty("teamTwoLabel", "text", teamTwoList[rand]);

  onEvent("decideWinnerButton", "click", function( ) {
  var userWinner = getText("userGuessInput").toUpperCase();
  var teamOne = teamOneList[rand];
  var teamTwo = teamTwoList[rand];
  var goalsOne = goalsTeamOneList[rand];
  var goalsTwo = goalsTeamTwoList[rand];
  
  showElement("checkFactsButton1");

  if ((goalsOne > goalsTwo) & (userWinner == teamOneList[rand])) {
    winner = teamOne;
    setProperty("winnerDecisionLabel","text", "Correct! The winner of the game was " + winner);
  } if ((goalsOne > goalsTwo) & (userWinner != teamOneList[rand])) {
    winner = teamOne;
    setProperty("winnerDecisionLabel","text", "Wrong! The winner of the game was " + winner);
  } if ((goalsOne < goalsTwo) & (userWinner == teamTwoList[rand])){
    winner = teamTwo; 
    setProperty("winnerDecisionLabel","text", "Correct! The winner of the game was " + winner);
  } if ((goalsOne < goalsTwo) & (userWinner != teamTwoList[rand])){
    winner = teamTwo;
    setProperty("winnerDecisionLabel","text", "Wrong! The winner of the game was " + winner);
  } if ((goalsOne == goalsTwo) & (userWinner == "DRAW")){
    winner = "Draw";
    setProperty("winnerDecisionLabel","text","Correct! This game resulted in a " + winner);
  } if (goalsOne == goalsTwo){
    winner = "Draw";
    setProperty("winnerDecisionLabel","text","This game resulted in a DRAW");
  }
  showElement("restartButton");
  hideElement("decideWinnerButton");
});
}

function getMatchFacts(userTeamOne,userTeamTwo){
  var userTeam = getText("chooseTeamDropdown");
  
  var FgameDateList = [];
  var FgameHourList = []; 
  var FgameCategoryList = [];

  var FteamOneList = [];
  var FteamOnePossessionList = [];
  var FgoalsTeamOneList = [];
  var FgoalAttemptsTeamOneList  = [];
  var FassistsTeamOneList  = [];
  var FyellowCardsTeamOneList  = [];
  var FredCardsTeamOneList = [];
  var FfoulsTeamOneList  = [];
  var FoffsidesTeamOneList  = [];
  var FpassesTeamOneList  = [];
  var FpassesCompletedTeamOneList  = [];
  var FcornersTeamOneList  = [];
  var FfreekicksTeamOneList  = [];
  var FpenaltiesTeamOneList  = [];

  var FteamTwoList = [];
  var FteamTwoPossessionList = [];
  var FgoalsTeamTwoList = [];
  var FgoalAttemptsTeamTwoList  = [];
  var FassistsTeamTwoList  = [];
  var FyellowCardsTeamTwoList  = [];
  var FredCardsTeamTwoList = [];
  var FfoulsTeamTwoList  = [];
  var FoffsidesTeamTwoList  = []  ;
  var FpassesTeamTwoList  = [];
  var FpassesCompletedTeamTwoList  = [];
  var FcornersTeamTwoList  = [];
  var FfreekicksTeamTwoList  = [];
  var FpenaltiesTeamTwoList  = [];
  
  rand = randomNumber(0, FteamOneList.length-1);
  
  for (var i = 0; i < teamOneList.length; i++) {
      if (((teamOneList[i] == userTeamOne) && (teamTwoList[i] == userTeamTwo)) || ((teamOneList[i] == userTeamTwo) && (teamTwoList[i] == userTeamOne))) {
        if (userTeam == teamOneList[i]){
        appendItem(FgameDateList, gameDateList[i]);
        appendItem(FgameHourList, gameHourList[i]);
        appendItem(FgameCategoryList, gameCategoryList[i]);
        appendItem(FteamOneList, teamOneList[i]);
        appendItem(FteamOnePossessionList, teamOnePossessionList[i]);
        appendItem(FgoalsTeamOneList, goalsTeamOneList[i]);
        appendItem(FgoalAttemptsTeamOneList, goalAttemptsTeamOneList[i]);
        appendItem(FassistsTeamOneList, assistsTeamOneList[i]);
        appendItem(FyellowCardsTeamOneList, yellowCardsTeamOneList[i]);
        appendItem(FredCardsTeamOneList, redCardsTeamOneList[i]);
        appendItem(FfoulsTeamOneList, foulsTeamOneList[i]);
        appendItem(FoffsidesTeamOneList, offsidesTeamOneList[i]);
        appendItem(FpassesTeamOneList, passesTeamOneList[i]);
        appendItem(FpassesCompletedTeamOneList, passesCompletedTeamOneList[i]);
        appendItem(FcornersTeamOneList, cornersTeamOneList[i]);
        appendItem(FfreekicksTeamOneList, freekicksTeamOneList[i]);
        appendItem(FpenaltiesTeamOneList, penaltiesTeamOneList[i]);
        } if (userTeam == teamTwoList[i]){
        appendItem(FgameDateList, gameDateList[i]);
        appendItem(FgameHourList, gameHourList[i]);
        appendItem(FgameCategoryList, gameCategoryList[i]);
        appendItem(FteamTwoList, teamTwoList[i]);
        appendItem(FteamTwoPossessionList, teamTwoPossessionList[i]);
        appendItem(FgoalsTeamTwoList, goalsTeamTwoList[i]);
        appendItem(FgoalAttemptsTeamTwoList, goalAttemptsTeamTwoList[i]);
        appendItem(FassistsTeamTwoList, assistsTeamTwoList[i]);
        appendItem(FyellowCardsTeamTwoList, yellowCardsTeamTwoList[i]);
        appendItem(FredCardsTeamTwoList, redCardsTeamTwoList[i]);
        appendItem(FfoulsTeamTwoList, foulsTeamTwoList[i]);
        appendItem(FoffsidesTeamTwoList, offsidesTeamTwoList[i]);
        appendItem(FpassesTeamTwoList, passesTeamTwoList[i]);
        appendItem(FpassesCompletedTeamTwoList, passesCompletedTeamTwoList[i]);
        appendItem(FcornersTeamTwoList, cornersTeamTwoList[i]);
        appendItem(FfreekicksTeamTwoList, freekicksTeamTwoList[i]);
        appendItem(FpenaltiesTeamTwoList, penaltiesTeamTwoList[i]);
      }
      } 
    } 
    
    if ((FteamOneList.length == 0) || (FteamTwoList.length == 0)){
        setProperty("factsText", "text", "Please choose different teams as the selected teams didn't play against each other at the WC");
      }
      
        if (userTeam == FteamOneList[rand]){
      setProperty("factsText", "text", "Date: " + FgameDateList[rand] + "\n" + "Hour: " + FgameHourList[rand] + "\n" + "Category: " + FgameCategoryList[rand] + "\n" + "\n" + "Team 1: " + FteamOneList[rand] + "\n" + "Possession: " + FteamOnePossessionList[rand] + "\n" + "Goals: " + FgoalsTeamOneList[rand] + "\n" + "Goal Attempts: " + FgoalAttemptsTeamOneList[rand] + "\n" + "Assists: " + FassistsTeamOneList[rand] + "\n" + "Yellow Cards: " + FyellowCardsTeamOneList[rand] + "\n" + "Red Cards: " + FredCardsTeamOneList[rand] + "\n" + "Fouls: " + FfoulsTeamOneList[rand] + "\n" + "Offsides: " + FoffsidesTeamOneList[rand] + "\n" + "Passes: " + FpassesTeamOneList[rand] + "\n" + "Passes Completed: " + FpassesCompletedTeamOneList[rand] + "\n" + "Corners: " + FcornersTeamOneList[rand] + "\n" + "Free Kicks: " + FfreekicksTeamOneList[rand] + "\n" + "Penalties: " +  FpenaltiesTeamOneList[rand]);
      } if (userTeam == FteamTwoList[rand]){
      setProperty("factsText", "text", "Date: " + FgameDateList[rand] + "\n" + "Hour: " + FgameHourList[rand] + "\n" + "Category: " + FgameCategoryList[rand] + "\n" + "\n" +  "Team 2: " + FteamTwoList[rand] + "\n" + "Possession: " + FteamTwoPossessionList[rand] + "\n" + "Goals: " + FgoalsTeamTwoList[rand] + "\n" + "Goal Attempts: " + FgoalAttemptsTeamTwoList[rand] + "\n" + "Assists: " + FassistsTeamTwoList[rand] + "\n" + "Yellow Cards: " + FyellowCardsTeamTwoList[rand] + "\n" + "Red Cards: " + FredCardsTeamTwoList[rand] + "\n" + "Fouls: " + FfoulsTeamTwoList[rand] + "\n" + "Offsides: " + FoffsidesTeamTwoList[rand] + "\n" + "Passes: " + FpassesTeamTwoList[rand] + "\n" + "Passes Completed: " + FpassesCompletedTeamTwoList[rand] + "\n" + "Corners: " + FcornersTeamTwoList[rand] + "\n" + "Free Kicks: " + FfreekicksTeamTwoList[rand] + "\n" + "Penalties: " +  FpenaltiesTeamTwoList[rand]);
      } 
  } 

// The algorithm for updating the dropdown based on the user's choices was taken from
// https://youtu.be/K39InX8FNO4?si=LpjfKqf2crJ7fOCb
function dropdownUpdate(userChoice1, userChoice2) {
  var dropdownList = ["Choose Team"];
  
  appendItem(dropdownList, userChoice1);
  appendItem(dropdownList, userChoice2);
  
  setProperty("chooseTeamDropdown", "options", dropdownList);
}

setProperty("appWelcomeText","text","Welcome to the FIFA Madness: 2022 World Cup App! This app has two primary features for you to enjoy. First, you can try to guess the winner of a World Cup game in 2022. You'll also be able to see the statistics of the teams who played the game. Second, you can select any two teams who played against each other during the World Cup and check their match statistics. I hope you have a great time using my app!");

// The images used in this app came from:
// [1]fifaWCImage1,fifaWCImage2,fifaWCImage3 - https://www.fifplay.com/img/public/2022-fifa-world-cup-logo.jpg

