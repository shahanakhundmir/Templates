let apiQuotes = [];
authorText = document.getElementById('author');
quoteText = document.getElementById('quote');
quoteContainer = document.getElementById('quote-container');
twitterBtn = document.getElementById('twitter');
newQuoteBtn = document.getElementById('new-quote');
loader = document.getElementById('loader');

// Show loader
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote(){
// pick random quote from api
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // If Author text is empty then add 'unknown'
    !quote.author ? authorText.textContent = 'Unknown' : authorText.textContent = quote.author;
    // If quote is long, change the font size by adding a class to the element
    quote.text.length > 120 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote')
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes(){
    console.log('test message')
    // assign the url for the api to a constant
    const apiUrl = 'https://type.fit/api/quotes';

    // try to access the api url, and wait until it returns a response. if a response is returned 'response' is populated with the json, otherwise an error is returned. 

    // the response from the fetch request has to be chained to access the json data recieved.
    try {
        await fetch(apiUrl)
        .then(response => response.json())
        .then(jsonData => {
            apiQuotes = jsonData;
            // Process the JSON data
            newQuote();
        })
        
        // json returned from the api request is changed into a json object
        // apiQuotes = response.json;
        // console.log(apiQuotes)
    } catch (error) {
        // handle error, usually by printing to screen or an alret
        console.log('error')
    }
}

// Tweet Quote
function tweetQuote(){
    // Create a tweet with the wuote when the twitter button is clicked.
    // use a template string so add the quote and author to the text field of tweet which is passed in the url to Twitter
    // variables are separated by space - space

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // opens twitter button using the twitterUrl in a new tab (_blank)
    window.open(twitterUrl, '_blank');
}

// Event Listners, button clicks, pass in the function to execute.
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// runs the function when the JS file is loaded (it loads when the web page loads as it is linked to the html file)
getQuotes();

