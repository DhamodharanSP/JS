const score = JSON.parse(localStorage.getItem('score')) || {
    win: 0, 
    loss: 0,
    tie: 0
};

updateScore();

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

function resetScore()
{
    score.win = 0;
    score.loss = 0;
    score.tie = 0;
    localStorage.removeItem('score');

    updateScore();

    alert('Results reset successfully!');
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