startButton = document.getElementById('btn__reset');
keyBoard = document.getElementById('qwerty');
let game;

// Event listener for the start button.
startButton.addEventListener('click', () => {
    game = new Game;
    gameReset();
    game.startGame();
});

// Event listener for the keyboard buttons.
keyBoard.addEventListener('click', (e) => {
    if (e.target.className === 'key') {
        game.handleInteraction(e.target);
    }
});

/* This function resets the game by getting rid of the old phrase,
 * resetting the heart icons, and resetting the keyboard.
 */
function gameReset () {
    let phrase = document.getElementById('phrase').firstElementChild
    let keyBoardButtons = document.getElementsByClassName('key');
    let heartImgs = document.querySelectorAll('img[alt="Heart Icon"]');
    phrase.innerHTML = ``;

    for (let button of keyBoardButtons) {
        button.className = 'key';
        button.disabled = false;
    }
    for (let icon of heartImgs) {
        icon.src = 'images/liveHeart.png';
    }
}
