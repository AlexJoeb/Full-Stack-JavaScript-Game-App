/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js
 */

class Phrase {
  constructor(phrase) {
    this._phrase = phrase;
  }

  addPhraseToDisplay() {
    let arr = this._phrase.split(" ");
    const phraseList = $('#phrase ul');
    phraseList.empty();
    this._phrase.split("").forEach(l => {
      let li = null;
      if (new RegExp(/\S/g).test(l)) {
        li = $(`<li class='letter ${l.toLowerCase()}'>${l}</li>`)
      } else {
        li = $(`<li class='space'>${l}</li>`)
      }
      phraseList.append(li);
    });
  }

  checkLetter(letter) {
    return this._phrase.split("").includes(letter.toLowerCase()) || this._phrase.split("").includes(letter.toUpperCase()) ? true : false;
  }

  showMatchedLetter(letter) {
    const lis = $(`.${letter.toLowerCase()}`);

    lis.addClass('show');
  }
}