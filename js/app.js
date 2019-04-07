/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js
 */

let instance = null;

const startButton = $('#btn__reset');
const keys = $('#qwerty');

startButton.click((e) => {
    let game = new Game();
    instance = game;
    instance.startGame();
});

keys.click((e) => {
    if(instance){
        instance.handleInteraction(e);
    }
});

document.addEventListener('keypress', (e) => {
    // instance.handleInteraction(e);
    if(instance){
        instance.handleInteraction(e);
    }
});

$(document).on("DOMContentLoaded", (e) => {
});