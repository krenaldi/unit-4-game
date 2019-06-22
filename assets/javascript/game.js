$(document).ready(function () {

    // Global object array for each character
    var characters = {
        "Darth Sidious": {
            name: "Darth Sidious",
            health: 80,
            attack: 15,
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
    var initializeGame = function () {
        for (var key in characters) {
            renderCharacter(characters[key], "#characters-selection");
        }
    }

    // Run the initializeGame function to start game
    initializeGame();

    // Function that clears the characters-selection area and render the character in the player section
    // This function will be called on click event
    var playerSelect = function (charObj, areaRender) {
        $(areaRender).empty();
        renderCharacter(charObj, areaRender);
    };

    // Function that will render the remaining characters in the remainingEnemies section and add to the enemiesLeft array
    // This function will be called after the onclick event to select player and playerSelect function
    var renderEnemies = function (enemyArr) {
        for (var i = 0; i < enemyArr.length; i++) {
            renderCharacter(enemyArr[i], "#remainingEnemies");
        }
    };

    // Function to restart the game after victory or defeat
    var restartGame = function (resultMessage) {
        // When Restart button is clicked, reload the page
        var restart = $("<button>Restart</button>").click(function () {
            location.reload();
        });
        // Build div to display victory or defeat message
        var gameState = $("<div>").text(resultMessage);

        // Render the restart button and victory/defeat message
        $("body").append(gameState);
        $("body").append(restart);
    };

    // Function to clear game message
    // var clearMessage = function () {
    //     var gameMessage = $("#game-message");
    //     gameMessage.text("");
    // };

    // Onclick event to trigger playerSelect function
    $("#characters-selection").on("click", ".character", function () {
        // Variable to save clicked character's name
        var name = $(this).attr("data-name");

        // If player character has not been chosen
        if (!player) {
            // Populate player with the selected character's info
            player = characters[name];
            // Loop through remaining characters and push them to the enemiesLeft array
            for (var key in characters) {
                enemiesLeft.push(characters[key]);
            }
        }
        // Hide the character-selection div
        $("#character-selection").hide();

        // Then update the selected character and render the opponents to the remainingEnemies div
        playerSelect(player, "#player");
        renderEnemies(enemiesLeft);
    });

    // Onclick event to select opponent
    $("#remainingEnemies").on("click", ".character", function() {
        // Variable to save clicked opponent's name
        var name = $(this).attr("data-name");
        // If there is no opponent, the clicked enemy will become the opponent
        if ($("#opponent").children().length === 0) {
            opponent = characters[name];
            playerSelect(opponent, "#opponent");
            // Remove element from the enemiesRemaining section since it will be moved to the opponent div
            $(this).remove();
            // Add attack button
            $("#attack-button").append("<img src='assets/images/Dueling_lightsabers.png' id='lightsabers'>"); 
        }
    });

    // When attack button is clicked, the following game logic is followed
    $("#attack-button").on("click", function() {
        // If there is an opponent, combat will occur
        if ($("#opponent").children().length === 0) {
            
            // Reduce opponent's health by player's attack value which increases by multiple of turnCounter
            opponent.health -= player.attack * turnCounter;

            // If opponent still has health...
            if (opponent.health > 0) {
                // Update the health count of opponent
                playerSelect(opponent, "#opponent");

                // Reduce player's health by opponent's attack value
                player.health -= opponent.enemyAttackBack;

                // Update the player's health count
                playerSelect(player, "#player");

                // If player has zero or less health the game ends
                if (player.health <= 0){
                    // clearMessage();
                    restartGame("Game over. Try again young padwan!");
                    $("attack-button").off("click");
                }
            }
            else {
                // If enemy has less than zero health, they are defeated and their card should be removed
                $("#opponent").empty();
                var gameStateMessage = "You have defeated " + opponent.name + ", you can choose to fight another enemy.";
                renderMessage(gameStateMessage);

                // Increment player's kill count
                killCount++;

                // If you call killed all opponents you win. Call the restartGame function to allow user to restart the game
                if (killCount >= enemiesLeft.length) {
                    // clearMessage();
                    $("attack-button").off("click");
                    restartGame("You've done well young jedi!");
                }
            }
            // Increment turn counter which is used to determine how much damage the player does
            turnCounter++
        }
        else {
            // If there is no opponent, display an error message
            // clearMessage();
            renderMessage("No enemy selected!");
        }
    });
});