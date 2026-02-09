let val = localStorage.getItem('result') || '';

function updateCalculation(arg)
{
    val += arg;
    const value = document.querySelector('.type');
    value.innerHTML = val;
}

function calculateResult()
{
    const value = document.querySelector('.type');
    try {
        val = eval(val)+'';
        localStorage.setItem('result', val);
        value.innerHTML = val;
    }
    catch(error)
    {
        clearResult();
        value.innerHTML = 'Syntax Error!';
    }
}

function deleteOne()
{
    if(val)
    {
        val = val.substring(0, val.length-1);
        const value = document.querySelector('.type');
        value.innerHTML = val;
    }
}

function clearResult()
{
    val = '';
    localStorage.removeItem('result');
    const value = document.querySelector('.type');
    value.innerHTML = val;
}