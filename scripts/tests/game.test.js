/**
 * @jest-environment jsdom
 */

// Accessing our game object from game.js.
const {
    game,
    newGame,
    showScore,
    addTurn,
    lightsOn,
    showTurns,
    playerTurn
} = require("../game");

// This is called a 'spy'. Captures an alert and sends it to an empty function.
jest.spyOn(window, "alert").mockImplementation(() => {});

// This loads our index.html into jests mock DOM, before our tests begin.
beforeAll(() => {
    // fs = File System Module, allows us access to other files in our repository.
    let fs = require("fs");
    // Accessing our index.html file.
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

// Tests for our game object from game.js.
describe("game object contains correct keys", () => {
    // Testing if 'score' exists in our game object.
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    // Testing if 'currentGame' exists in game object.
    test("currentGame exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    // Testing if 'playerMoves' exists in game object.
    test("playerMoves exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    // Testing if 'choices' exists in game object.
    test("choices exists", () => {
        expect("choices" in game).toBe(true);
    });
    // Testing if 'choices' in our game object contains the correct id's.
    test("choices contain correct id's", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    // Testing if 'turnNumber' exists in game object.
    test("turnNumber exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
    // Testing if 'lastButton' exists in game object.
    test("lastButton exists", () => {
        expect("lastButton" in game).toBe(true);
    });
    // Testing if 'turnInProgress' exists in game object.
    test("turnInProgress exists", () => {
        expect("turnInProgress" in game).toBe(true);
    });
    // Testing if 'turnInProgress' key value is false.
    test("turnInProgress key value is false", () => {
        expect("turnInProgress" in game).toBe(true);
    });

});

// Tests for our newGame function.
describe("newGame works correctly", () => {
    beforeAll(() => {
        // Assigning game object fake key id's for testing purposes only.
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    // Testing if the newGame function resets the score to 0.
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    // Testing if the newGame function resets the playerMoves array.
    test("should clear the playerMoves array", () => {
        expect(game.playerMoves.length).toEqual(0);
    });
    // Testing if the newGame function resets the currentGame array.
    test("should be one move in the computer's game array", () => {
        expect(game.currentGame.length).toEqual(1);
    });
    // Testing if the newGame function displays 0 for element with id of "score".
    test("should display 0 for the element with the id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("expect data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        };
    })
});

// Tests for correct gameplay.
describe("gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    // Testing if addTurn function adds a new turn.
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toEqual(2);
    });
    // Testing if the class "light" has been added to an element.
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toEqual(0);
    });
    test("should increment the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    // Testing to see whether an alert has been called when wrong move is made.
    test("should call an alert if the move is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!");
    });
    test("should toggle turnInProgress to true", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test("clicking during computer sequence should fail", () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    })
});