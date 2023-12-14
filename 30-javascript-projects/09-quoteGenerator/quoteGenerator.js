
const api_url = 'https://api.quotable.io/random';
const quote = document.getElementById('quote');
const author = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote-button');
const tweetButton = document.getElementById('tweet-button');

async function getQuote(url){
  const response = await fetch(url);
  const data = await response.json();
  quote.innerHTML = data.content;
  author.innerHTML = data.author;
  return data;
}
getQuote(api_url);

function tweet() {
const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
window.open(twitterUrl, "Tweet Window", 'width=500, height=400, left=500, top=300', "_blank");
}

newQuoteButton.addEventListener('click', () => {
  getQuote(api_url);
});

tweetButton.addEventListener('click', tweet);