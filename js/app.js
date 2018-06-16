/* Create a list that holds all of your cards*/
const cards = ['fa-diamond', 'fa-diamond',
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
  let deck = document.querySelector('.deck');
  let cardHTML = shuffle(cards).map(function(card){
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join('')



let allCards = document.querySelectorAll('.card');
let openCards =[];

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
}
/*COUNT MOVES and REMOVE STARS*/
let moves = 0;
let moveCounter = document.querySelector('.moves');
let stars = document.querySelector('.stars');
let one = document.querySelector('.one');
let two = document.querySelector('.two');

function moveCount() {
  moves++;
  moveCounter.innerHTML = moves;
  if (moves == 1) {
    startTimer();
    }
  if (moves == 5) {
  one.style.visibility = 'hidden';
}
    if (moves == 10) {
  two.style.visibility = 'hidden';
}
}

/*TIMER*/
let second = 0,
    minute = 0;
    hour = 0;
let timer = document.querySelector(".timer");
let interval;

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
/*RESET STARS*/
function resetStars() {
one.style.visibility = 'visible';
two.style.visibility = 'visible';
}

/*GAME END*/

//When all cards match, change modal css so that modal is shown
let matchedCards = document.getElementsByClassName('match');
let modal = document.querySelector('.modal');
let finalTime = document.querySelector('.finalTime');
let finalRating = document.querySelector('.finalRating');
let finalMoves = document.querySelector('.finalMoves');

function winGame() {
  if (matchedCards.length === 16) {
    modal.style.display = "block";
    finalRating.innerHTML = stars.innerHTML;
    finalMoves.innerHTML = moveCounter.innerHTML;
    finalTime.innerHTML = timer.innerHTML;
    stopTimer ();
  }
}
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
//Play again button will clear modal and reset timer
document.querySelector('.button').addEventListener('click', playAgain);
document.querySelector('.restart').addEventListener('click', playAgain);

function playAgain() {
  modal.style.display = "none";
  moves = 0;
  moveCounter.innerHTML = '0';
  stopTimer ();
  resetTimer ();
  resetStars ();
  myGame();
}

myGame();
