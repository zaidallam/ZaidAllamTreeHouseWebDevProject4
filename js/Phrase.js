/* This class provides a template for phrase objects, which has the general purpose of
 * building the on-screen phrase display, checking if a letter exists in the phrase,
 * and displaying any letters chosen by the user that exist in the phrase.
 */ 
class Phrase {
    // this.phrase represents the phrase that will be used.
    constructor (phrase) {
        this.phrase = phrase.toLowerCase();
    }
    /* This method displays the phrase properly on screen by building the required HTML
     * and inserting it.
     */
    addPhraseToDisplay() {
        let ulPhraseLetterHolder = document.getElementById('phrase').firstElementChild;
        let phraseLettersArr = this.phrase.split('');
        
        for (let letter of phraseLettersArr) {
            let li;
            if (/[a-z]/.test(letter)) {
                li = `<li class="hide letter ${letter}">${letter}</li>`;
            } else {
                li = `<li class="space"> </li>`;
            }
            ulPhraseLetterHolder.insertAdjacentHTML('beforeend', li);
        }
    }
    // This method checks if the chosenLetter input is included within the current phrase.
    checkLetter(chosenLetter) {
        let phraseLettersArr = this.phrase.split('');

        if (phraseLettersArr.includes(chosenLetter)) {
            return true;
        }
        return false;
    }
    /* This method reveals any letters within the phrase that match the inputted letter.
     */
    showMatchedLetter(letter) {
        let ulPhraseLetterHolder = document.getElementById('phrase').firstElementChild;
        let matchingLiElements = ulPhraseLetterHolder.getElementsByClassName(letter);

        for (let i = 0; i < matchingLiElements.length; i++) {
            matchingLiElements[i].classList.remove('hide');
            matchingLiElements[i].classList.add('show');
        }
    }
}