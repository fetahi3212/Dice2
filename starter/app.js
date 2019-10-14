/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


/**

  Really important to adhere to the principles of DRY, which is a standard
  for JS.
*/
var scores, roundScore, activePlayer, dice, gamePlaying;
init();

document.querySelector('.btn-roll').addEventListener('click', function() {

  if (gamePlaying) {
    // 1. random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    // Display the result

    var diceDom = document.querySelector('.dice');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';

    var diceDom2 = document.querySelector('.dice2');
    diceDom2.style.display = 'block';
    diceDom2.src = 'dice-' + dice + '.png';

    if (dice !== 1) {
      roundScore += dice + dice2;
      pastScore = dice + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
    // next player
    nextPlayer();
    }
  }
    // Update the round score if the rolled number was not a 1.
    /*
    var pastScore;
    if ((pastScore === 6) && (dice === 6)) {
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = '0';
      nextPlayer();
    } else if (dice !== 1) {
      roundScore += dice + dice2;
      pastScore = dice + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
  } else {
    // next player
    nextPlayer();
    */

    //document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    //document.querySelector('.player-'+ activePlayer + '-panel').classList.add('active');

});

document.querySelector('.btn-hold').addEventListener('click', function() {

  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    var score = document.querySelector('#score-' + activePlayer);
    score.textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    console.log(input);

    var winningScore;
    // undefined, 0, null or "" are coerced to false
    // anything else is coerced to true
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }

});

function nextPlayer() {

  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  // this function below calls remove which takes out the css formate winner.
  // so the color of text can be the same.
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  // in case active class 0 is rehighlihted in case it won, that is why remove and then make active
  // always re-starting with first panel
  document.querySelector('.player-0-panel').classList.add('active');

}


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
(Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of
 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.
 (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
