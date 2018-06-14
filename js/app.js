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
    startTimer();
    }
  if (moves >= 16 && moves < 20) {
    stars.removeChild(stars.childNodes[1]);
    }
    if (moves>100) {
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
    }, 1000);
}

/*STOP TIMER*/
function stopTimer() {
  clearInterval(interval);
}
/*RESET TIMER*/
function resetTimer (){
  second = 0;
  minute = 0;
  hour = 0;
  timer.innerHTML = minute + " min " + second + " sec";
}

/*RESTART MYGAME*/
const restart = document.querySelector('.restart');
restart.addEventListener('click',function(){
location.reload();
});

/*GAME END*/
//declaring let
let matchedCards = document.getElementsByClassName('match');
let modal = document.querySelector('.modal');
let finalTime = document.querySelector('.finalTime');
let finalRating = document.querySelector('.finalRating');
let finalMoves = document.querySelector('.finalMoves');

// terms of win
function winGame() {
  if (matchedCards.length === 16) {
    modal.style.display = "block";
    finalRating.innerHTML = stars.innerHTML;
    finalMoves.innerHTML = moveCounter.innerHTML;
    finalTime.innerHTML = timer.innerHTML;
    stopTimer ();
  }
}
// <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};
//  click anywhere outside of the modal - close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
// Play again button will reset game
document.querySelector('.button').addEventListener('click', playAgain);
document.querySelector('.restart').addEventListener('click', playAgain);

function playAgain() {
  location.reload();
}
