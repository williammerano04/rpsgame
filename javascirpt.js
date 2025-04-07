document.querySelector('.rps-rock').addEventListener('click', function(){
    rpsGame('Rock');
})
document.querySelector('.rps-paper').addEventListener('click', function(){
    rpsGame('Paper');
})
document.querySelector('.rps-scissors').addEventListener('click', function(){
    rpsGame('Scissors');
})

document.querySelector('.reset-btn').addEventListener('click', function(){
    yesORno()
})

document.querySelector('.N-button').addEventListener('click', function(){
    let yesOrno = document.querySelector('.yes-or-no')
    if(yesOrno.classList.contains('yes-or-no-show')){
        yesOrno.classList.remove('yes-or-no-show')
    } 
})

document.querySelector('.Y-button').addEventListener('click', function(){
    let yesOrno = document.querySelector('.yes-or-no')
    resetBtn()
    if(yesOrno.classList.contains('yes-or-no-show')){
        yesOrno.classList.remove('yes-or-no-show')
    } 
})


document.body.addEventListener('keydown', function(){
    if((event.key) === 'r'){
        rpsGame('Rock');
    } else if ((event.key) === 'p'){
        rpsGame('Paper');
    } else if ((event.key) === 's'){
        rpsGame('Scissors')
    } else if ((event.key) === 'a'){
        autoPlay()
    } else if ((event.key) === 'Backspace'){
        yesORno()
    }
    
})
function yesORno(){
    let yesOrno = document.querySelector('.yes-or-no')
       if(yesOrno.classList.contains('yes-or-no-show')){
            yesOrno.classList.remove('yes-or-no-show')
        } else if (yesOrno.classList.contains('yes-or-no'))
            yesOrno.classList.add('yes-or-no-show')

}

let AutoPlayInterval;
let autoplaying = false
document.querySelector('.auto-play').addEventListener('click', function(){
    let autoplayBtn = document.querySelector('.auto-play')

    if(autoplaying === false){
        autoplayBtn.innerHTML = 'Stop Playing'
        clearInterval(AutoPlayInterval)
        AutoPlayInterval = setInterval(function(){
            autoPlay()
        },1000)
        autoplaying = true;
    } else {
        autoplaying = false
        autoplayBtn.innerHTML = 'Auto Play'
        clearInterval(AutoPlayInterval)
    }
})


let rpsScore = (JSON.parse(localStorage.getItem('rpsScore')));

if (rpsScore === null){
    rpsScore = {
        win: 0,
        lose: 0,
        tie: 0
    }
}
function resetBtn(){
    rpsScore = { win: 0, lose: 0, tie: 0}
    localStorage.removeItem('rpsScore');
    alert(`Score been Reset`)
    showScore();

}
function autoPlay(){
    rpsGame(randomMove())
}

function rpsGame(playerMove){
    let computerMove = randomMove();
    let result =''

    if (playerMove === 'Rock'){
        if (computerMove === 'Rock'){
            result = 'Tie'
        } else if (computerMove === 'Paper'){
            result = 'You Lose'
        } else if (computerMove === 'Scissors'){
            result = 'You Win'
        }
    }else if (playerMove === 'Paper'){
        if (computerMove === 'Rock'){
            result = 'You Win'
        } else if (computerMove === 'Paper'){
            result = 'Tie'
        } else if (computerMove === 'Scissors'){
            result = 'You Lose'
        }
    }else if (playerMove === 'Scissors'){
        if (computerMove === 'Rock'){
            result = 'You Lose'
        } else if (computerMove === 'Paper'){
            result = 'You Win'
        } else if (computerMove === 'Scissors'){
            result = 'Tie'
        }
    } 

    if (result === 'You Win'){
        rpsScore.win = rpsScore.win + 1;
    }else if (result === 'You Lose'){
        rpsScore.lose = rpsScore.lose + 1;
    }else if (result === 'Tie'){
        rpsScore.tie = rpsScore.tie + 1;
    }
    
    localStorage.setItem('rpsScore',JSON.stringify(rpsScore));
    showScore()
    document.querySelector('.js-show-result').innerHTML = `${result}`;
    document.querySelector('.js-moves').innerHTML = 
    `You <img class="show-result-img"src="images/${playerMove}.jpg" alt=""><img class="show-result-img" src="images/${computerMove}.jpg" alt="">  Computer`
    
} 

function randomMove(){
    let randomNumber = Math.random();
    let result = ''

    if (randomNumber >= 0 && randomNumber < 1/3){
        result = 'Rock'
    } else if (randomNumber >= 1/3 && randomNumber < 2/3 ){
        result = 'Paper'
    } else if (randomNumber >= 2/3 && randomNumber < 1){
        result = 'Scissors'
    } return result;
}

function showScore(){
let showScoreElem = document.querySelector('.js-show-score')
    showScoreElem.innerHTML = `Win: ${rpsScore.win} Lose: ${rpsScore.lose} Tie: ${rpsScore.tie}`
}
showScore();