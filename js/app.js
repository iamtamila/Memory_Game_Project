/* Create a list that holds all of your cards*/
var cards = ['fa-diamond', 'fa-diamond',
             'fa-paper-plane-o', 'fa-paper-plane-o',
             'fa-anchor', 'fa-anchor',
             'fa-bolt', 'fa-bolt',
             'fa-cube', 'fa-cube',
             'fa-leaf', 'fa-leaf',
             'fa-bicycle', 'fa-bicycle',
             'fa-bomb', 'fa-bomb'
            ];

function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



/*GAMEPLAY*/
function myGame(){
  var deck = document.querySelector('.deck');
  var cardHTML = shuffle(cards).map(function(card){
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join('')
}
myGame()

var allCards = document.querySelectorAll('.card');
var openCards =[];

/*GAME RULES */
allCards.forEach(function(card) {
   card.addEventListener('click', function(e) {
          if (!card.classList.contains('open')&& !card.classList.contains('show') && !card.classList.contains('match')) {
            openCards.push(card);
            card.classList.add('open', 'show');
            if (openCards.length == 2) {
              moveCount()

              /*DO MATCH*/
              if (openCards[0].dataset.card == openCards[1].dataset.card) {
                  openCards[0].classList.add('match');
                  openCards[0].classList.add('open');
                  openCards[0].classList.add('show');
                  openCards[1].classList.add('match');
                  openCards[1].classList.add('open');
                  openCards[1].classList.add('show');
                  openCards = [];
                  winGame();
              }
              /*DO NOT MATCH*/
              else {
                setTimeout(function(){
                  openCards.forEach(function(card){
                    card.classList.remove ('open','show');
                  });
                  openCards = [];
                },500);
              }
            }
          }
  });
});

/*COUNT MOVES and REMOVE STARS*/
var moves = 0;
var moveCounter = document.querySelector('.moves');
var stars = document.querySelector('.stars');

function moveCount() {
  moves++;
  moveCounter.innerHTML = moves;
  if (moves == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }
  if (moves >= 14) {
    stars.removeChild(stars.childNodes[1]);
  }
}

/*TIMER*/
var second = 0,
    minute = 0;
    hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + " min " + second + " sec";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 800);
}

/*STOP TIMER*/
function stopTimer() {
  clearInterval(interval);
  startTimer ();
}

/*RESTART MYGAME*/
const restart = document.querySelector('.restart');
restart.addEventListener('click',function(){
  moves = 0;
  moveCounter.textContent = '0';
stopTimer ();
  myGame();
});

/*GAME END*/

var modal = document.querySelector('.modal');
function winGame() {
  if (openCards.length == 16) {
    stopTimer();
    modal.style.display = "block";

  }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
