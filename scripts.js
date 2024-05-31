let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScore();

function updateScore(){
    document.querySelector('.score').innerHTML = 
    `Wins: ${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;
}

function play(playerMove){
const randomNumber = Math.random();
let computerMove;
if (randomNumber < 1/3){
    computerMove = 'Rock';
} else if(randomNumber <2/3){
    computerMove = 'Paper';
} else if(randomNumber < 1){
    computerMove = 'Scissors';
}
let result;
if (computerMove === playerMove){
    result = 'Tie';
    score.ties += 1;
} else if(
    (computerMove === 'Rock' && playerMove === 'Scissors') ||
    (computerMove === 'Paper' && playerMove === 'Rock') ||
    (computerMove === 'Scissors' && playerMove === 'Paper')  
) {
    result = 'You Lose';
    score.losses +=1;
} else {
    result = 'You Win';
    score.wins += 1;
}

localStorage.setItem('score', JSON.stringify(score));

updateScore();

document.querySelector('.result').innerHTML = result;

document.querySelector('.move').innerHTML =
`You <img class="ico" src="assets/${playerMove}.png"> - <img class="ico" src="assets/${computerMove}.png"> Computer`;
}

document.body.addEventListener('keydown', (event)=>{
    if(event.key === 'r'){
        play('Rock');
        document.querySelector('.js-paper').style.color = 'white';
        document.querySelector('.js-scissors').style.color = 'white';
        document.querySelector('.js-rock').style.color = 'green';
    } else if(event.key === 'p'){
        play('Paper');
        document.querySelector('.js-paper').style.color = 'green';
        document.querySelector('.js-scissors').style.color = 'white';
        document.querySelector('.js-rock').style.color = 'white';
    } else if(event.key === 's'){
        play('Scissors');
        document.querySelector('.js-paper').style.color = 'white';
        document.querySelector('.js-scissors').style.color = 'green';
        document.querySelector('.js-rock').style.color = 'white';
    }
});

let reset = document.querySelector('.btn-reset');

reset.addEventListener('click',()=>{
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScore();
    removeColor();
    
});

function removeColor(){
    document.querySelector('.js-paper').style.color = 'white';
    document.querySelector('.js-scissors').style.color = 'white';
    document.querySelector('.js-rock').style.color = 'white';
}

document.querySelector('.rock').addEventListener('click',()=>{
    play('Rock');
    removeColor();
});
document.querySelector('.paper').addEventListener('click',()=>{
    play('Paper');
    removeColor();
});
document.querySelector('.scissors').addEventListener('click',()=>{
    play('Scissors');
    removeColor();
});

