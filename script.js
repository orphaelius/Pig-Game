'use strict';

// declaring variables that will be used frequently //
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnDiceRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// base variable for scoring //
let currentScore;
// variable to set and switch between current players //
let activePlayer;
// array for storing total scores //
let scores;
// variable to check if game should continue or end //
let playing;
// reset conditions //

// function to switch players //
const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        activePlayer = activePlayer === 0 ? 1 : 0;
        currentScore = 0;
        document.querySelector('.player--1').classList.add('.current');
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');

};

const initialization = function(){
    // starting conditions // 
    score0El.textContent = 0;
    score1El.textContent = 0;
    diceEl.classList.add('hidden');
    // pair values to variables //
    currentScore = 0;
    activePlayer = 0;
    scores = [0,0];
    playing = true;
    // reset classes and values to default //
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.tectContent = 0;
    current1El.textContent = 0;
      
};
initialization();

// rolling dice //
btnDiceRoll.addEventListener('click', function(){

    // 'playing' is a boolean value, so there is no need to check for equality //
    if(playing){
    // random number used to determine which die is displayed //
    let dice = Math.trunc(Math.random() * 6 ) + 1;
    // once game begins, show die, generate random die //
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // if die is not 1, show die and add to current score //
    if(dice !== 1){
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
                        
    // else if die is 1, show 1, //
    } else {
        // switch to player 2 //
        switchPlayer();        
    }
}
});

// storing score //
btnHold.addEventListener('click', function(){
    if(playing){
    // add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = 
    scores[activePlayer];

    // check if score is >= 100
    if(scores[activePlayer] >= 100){
        playing = false;
        alert(`player ${activePlayer + 1} wins!`)
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
        switchPlayer();
    }    
    }
});


btnNew.addEventListener('click', initialization);


