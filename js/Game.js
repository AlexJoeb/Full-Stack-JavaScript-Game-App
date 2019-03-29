/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js
 */

class Game {
    constructor() {
        this._missed = 0;
        this._phrases = [
            new Phrase("The early bird gets the worm"),
            new Phrase("May the force be with you"),
            new Phrase("Bears Beets Battlestar Galacatica"),
            new Phrase("One ring to rule them all"),
            new Phrase("Orange is the new black"),
        ];
        this._activePhrase = null;
    }

    startGame() {
        $('#overlay').hide();
        $('#overlay').removeClass('win');
        $('#overlay').removeClass('lose');
        this._activePhrase = this.getRandomPhrase();
        this._activePhrase.addPhraseToDisplay();
        this.resetKeyboard();
    }

    resetKeyboard(){
        const key = $('.key');
        key.removeClass('wrong');
        key.removeClass('chosen');
        key.prop('disabled', false);
        key.each(e => {
            $(key[e]).text(key[e].innerText.toUpperCase());
        });
    }

    getRandomPhrase() {
        // His method randomly retrieves one of the phrases stored in the phrases array and returns it.
        return this._phrases[Math.floor((Math.random() * this._phrases.length))];
    }

    handleInteraction(event) {
        const t = $(event.target);
        const text = event.key ? event.key : t.text();

        // Disable the selected letter's onscreen keyboard button
        const button = this.getButtonByLetter(text);
    
        if (!button) {
            console.log("Can't find that button!");
            return;
        }

        $(button).prop('disabled', true);
        // If the phrase does not include the guessed letter, add the wrong CSS class to the selected letter's keyboard button and call the removeLife() method.
        // If the phrase includes the guessed letter, add the chosen CSS class to the selected letter's keyboard button, call the showMatchedLetter() method on the phrase, and then call the checkForWin() method. If the player has won the game, also call the gameOver() method.

        if (this._activePhrase.checkLetter(text)) {
            $(button).addClass('chosen');
            this._activePhrase.showMatchedLetter(text);
            if(this.checkForWin()){
                this.gameOver(true);
            }
        } else {
            $(button).addClass('wrong');
            this.removeLife();
            if(this._missed == 5){
                this.gameOver(false);
            }
        }
    }

    removeLife() {
        // this method removes a life from the scoreboard, by replacing one of the liveHeart.png images with a lostHeart.png image (found in the images folder) and increments the missed property. If the player has five missed guesses (i.e they're out of lives), then end the game by calling the gameOver() method.
        $('.tries img')[this._missed].setAttribute('src', "images/lostHeart.png");
        this._missed += 1;
    }

    checkForWin() {
        // this method checks to see if the player has revealed all of the letters in the active phrase.
        const letters = $('.letter');
        for(let i = 0; i < letters.length; i++){
            if(!$(letters[i]).hasClass('show')) return false;
            else continue;
        }
        return true;
    }

    gameOver(win) {
        // this method displays the original start screen overlay, and depending on the outcome of the game, updates the overlay h1 element with a friendly win or loss message, and replaces the overlay’s start CSS class with either the win or lose CSS class.
        const overlay = $("#overlay");

        if(win){
            overlay.removeClass('start');
            overlay.addClass('win');
            $(`#game-over-message`).text('You win!');
        } else {
            overlay.removeClass('start');
            overlay.addClass('lose');
            $(`#game-over-message`).text('You lost!');
        }
        overlay.show();
    }

    getButtonByLetter(text) {
        const keys = $('.key');

        for (let i = 0; i < keys.length; i++) {
            if (keys[i].innerText.toLowerCase() == text.toLowerCase()) {
                return keys[i];
            } else continue;
        }

        return null;
    }
}