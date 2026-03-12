async function loadPage()
{
    console.log('page loaded...');
    return 'async return'; // same as resolve(value)
}

loadPage().then((value) => {
    console.log(value);
    console.log('next step');
});