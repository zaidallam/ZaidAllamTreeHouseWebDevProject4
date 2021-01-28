/* This class provides the template for Game objects, which hold any relevant variables and functions that are 
 * relevant specifically to the current instance of the game. The class does not hold functions or data
 * that is immediately relevant to the current instance of the phrase, which are handled by objects from the
 * Phrase class.
 */
class Game {
    /* this.missed: the number of missed guesses that the player currently has.
     * this.phrases: the phrase pool from which random phrases can be chosen for each instance of the game.
     * this.activePhrase: the phrase that is currently being used.
     */
    constructor() {
        this.missed = 0;
        this.phrases = ['Coding is fun', 'Learning JavaScript', 'We love HTML', 'Beautiful CSS', 'Full Stack'];
        this.activePhrase = null;
    }
    /* This method starts the game by disabling the starting overlay, calling getRandomPhrase to select the
     * phrase that will be used that round, creating a new instance of the phrase object, and calling
     * that new phrase object's addPhraseToDisplay method to put the current phrase on screen.
     */
    startGame () {
        let overlay = document.getElementById('overlay');
        overlay.style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        window.currentPhrase = new Phrase(this.activePhrase);
        currentPhrase.addPhraseToDisplay();
    }
    // This method returns a random phrase from the this.phrases array. 
    getRandomPhrase () {
        return this.phrases[Math.floor(Math.random()*this.phrases.length)];
    }
    /* This method handles the interactions with clicked keyboard buttons by disabling the selected buttons, 
     * updating them with either the .chosen or the .wrong classes, and calling other functions to check for 
     * the win, stop the game if it has been won, and remove lives if the wrong key is chosen.
     */
    handleInteraction (eventTarget) {
        eventTarget.disabled = true;
        let chosenLetter = eventTarget.innerText
        if (currentPhrase.checkLetter(chosenLetter)) {
            eventTarget.classList.add('chosen');
            currentPhrase.showMatchedLetter(chosenLetter);
            if (this.checkForWin()) {
                this.gameOver(true);
            }
        } else {
            eventTarget.classList.add('wrong');
            this.removeLife();
        }
    }
    /* This method removes a life from the lives display and updates the amount of missed guesses stored in this.missed.
     * it also ends the game as a loss if all lives are used up.
     */
    removeLife () {
        let scoreboard = document.getElementById('scoreboard');
        let imgElements = scoreboard.querySelectorAll('img');
        if (this.missed < 4) {
            let lastLiveHeart = imgElements[imgElements.length - (1 + this.missed)];
            lastLiveHeart.src = 'images/lostHeart.png';
            this.missed += 1;
        } else {
            this.gameOver(false);
        }
    }
    // This method checks if the game has been won.
    checkForWin () {
        return document.getElementsByClassName('hide').length === 0 ? true : false;
    }
    /* This method ends the game. If it is a win, then the overlay is shown with the win class and a winning message.
     * If it is a loss, then the overlay is shown with the lose class and a loss message.
     */
    gameOver (isWin) {
        let overlay = document.getElementById('overlay');
        overlay.style.display = '';
        let gameOverH1 = document.getElementById('game-over-message');
        if (isWin) {
            gameOverH1.innerText = "Congratulations, You Win!";
            overlay.className = 'win';
        } else {
            gameOverH1.innerText = "Better Luck Next Time!";
            overlay.className = 'lose';
        }
    }
}