$(document).ready(function () {

    // Global object array for each character
    var characters = {
        "Darth Sidious": {
            name: "Darth Sidious",
            health: 80,
            attack: 5,
            imageURL: "assets/images/darth-sidious.png",
            enemyAttackBack: 10
        },
        "Luke Skywalker": {
            name: "Luke Skywalker",
            health: 100,
            attack: 10,
            imageURL: "assets/images/luke-skywalker.jpg",
            enemyAttackBack: 15
        },
        "Darth Maul": {
            name: "Darth Maul",
            health: 130,
            attack: 15,
            imageURL: "assets/images/darth-maul.jpg",
            enemyAttackBack: 20
        },
        "Obi-Wan Kenobi": {
            name: "Obi-Wan Kenobi",
            health: 150,
            attack: 20,
            imageURL: "assets/images/obi-wan.jpg",
            enemyAttackBack: 25
        }
    };

    // Variable that holds character selected by user to play
    var player;
    // Array that holds the remaining characters users selects to fight
    var enemiesLeft = [];

    // Variable to hold the character that user selected to play against
    var opponent;

    // Variable to keep track of turns and calculate player damage
    var turnCounter = 1;
    // Variable to track number of defeated opponents
    var killCount = 0;

    // FUNCTIONS
    // Function to render list of characters available
    var renderCharacter = function (character, renderArea) {
        // Variables that build the character card w/ jquery & renders to the page
        var charDiv = $("<div class='character' data-name='" + character.name + "'>");
        var charName = $("<div class='character-name'>").text(character.name);
        var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageURL);
        var charHealth = $("<div class='character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);
    };

    // Function that loads all the characters into the characters-selection div
    var initializeGame = function() {
        for (var key in characters){
            renderCharacter(characters[key], "#characters-selection");
        }
    }

    // Run the initializeGame function to start game
    initializeGame();

});