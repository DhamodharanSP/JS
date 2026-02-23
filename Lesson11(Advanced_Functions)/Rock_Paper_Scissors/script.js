const score = JSON.parse(localStorage.getItem('score')) || {
    win: 0, 
    loss: 0,
    tie: 0
};

updateScore();

// Event listeners

const rock = document.querySelector('.rock-btn');
rock.addEventListener('click', () => {
    playGame('✊');
})

const paper = document.querySelector('.paper-btn');
paper.addEventListener('click', () => {
    playGame('🖐️');
})

const scissors = document.querySelector('.scissors-btn');
scissors.addEventListener('click', () => {
    playGame('✌️');
})

const reset = document.querySelector('.reset-btn');
reset.addEventListener('click', () => {
    askReset(); // ask permission for reset
})

const auto_play = document.querySelector('.auto-play-btn');
auto_play.addEventListener('click', () => {
    autoplay();
})

// Keyboard events
document.body.addEventListener('keydown', (event) => {
    let move;
    if(event.key === 'r') playGame('✊');
    else if(event.key === 'p') playGame('🖐️');
    else if(event.key === 's') playGame('✌️');
    else if(event.key === 'Backspace') {
        askReset();
    }
    console.log(event.key);
});

function pickComputerMove() {
    const random = Math.random();
    let computerMove = '';
    if(random >= 0 && random < 1/3)
        computerMove = '✊';
    else if(random >= 1/3 && random < 2/3)
        computerMove = '🖐️';
    else computerMove = '✌️';
    return computerMove;
}

function playGame(playerMove)
{
    const computerMove = pickComputerMove();
    let result;
    if(playerMove === '✊')
    {
        if(computerMove === '✊')
            result = 'tie';
        else if(computerMove === '🖐️')
            result = 'loss';
        else
            result = 'win';
    }
    else if(playerMove === '🖐️')
    {
        if(computerMove === '✊')
            result = 'win';
        else if(computerMove === '🖐️')
            result = 'tie';
        else
            result = 'loss';
    }
    else
    {
        if(computerMove === '✊')
            result = 'loss';
        else if(computerMove === '🖐️')
            result = 'win';
        else result = 'tie';
    }

    if(result === 'win') score.win++;
    else if(result === 'loss') score.loss++;
    else score.tie++;

    const value = JSON.stringify(score);
    localStorage.setItem('score', value);

    displayMove(playerMove, computerMove);
    displayStatus(result);
    updateScore();
}

function askReset()
{
    const ask = document.querySelector('.ask-reset');
    ask.innerHTML = `
        <span>
            Are you sure, you want to reset the score?
        </span>
        <button class="yes">
            Yes
        </button>
        <button class="no">
            No
        </button>
    `;

    const yesButton = document.querySelector('.yes');
    yesButton.addEventListener('click', () => {
        resetScore();
        if(isAutoPlay) stop_autoplay();
        ask.innerHTML = '';
    });

    const noButton = document.querySelector('.no');
    noButton.addEventListener('click', () => {
        ask.innerHTML = '';
    });
}

function resetScore()
{
    score.win = 0;
    score.loss = 0;
    score.tie = 0;
    localStorage.removeItem('score');

    updateScore();

    alert('Results reset successfully!');
}

// autoPlay() feature

let isAutoPlay = false;
let intervalID;

function autoplay()
{
    if(!isAutoPlay)
    {
        isAutoPlay = true;
        intervalID = setInterval( () => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 2000); // setInterval() performs actions continuously with defined interval breaks and it returns an ID
    }
    else stop_autoplay();
}

function stop_autoplay() // Separated stop_autoplay()
{
    clearInterval(intervalID); 
    isAutoPlay = false;
}

function updateScore()
{
    const scoreCard = document.querySelector('.score');
    scoreCard.innerHTML = `Win: ${score.win}, Loss: ${score.loss}, Tie: ${score.tie}`;
}

function displayMove(playerMove, computerMove)
{
    const move = document.querySelector('.cur-move');
    move.innerHTML = `You <span class="icon">${playerMove}</span> <span class="icon">${computerMove}</span> Computer`;
}

function displayStatus(result)
{
    const status = document.querySelector('.status');
    status.innerHTML = `You ${result}!`;
}