let buttonQuote = document.querySelector(".button");
let quoteMessage = document.querySelector(".quote-message");
let quoteAuthor = document.querySelector(".author");

let apiQuotes = [];

async function getQuotes() {
	if (apiQuotes.length == 0) {
		const apiUrl = "https://chux05.github.io/mockdata/quotes.json";
		try {
			const response = await fetch(apiUrl);
			apiQuotes = await response.json();
		} catch (error) {
			var element = document.getElementById("quoteText");
			element.innerHTML = "Error loading quotes. Please try again later.";
			quoteAuthor.innerHTML = "Hopefuly the developer will fix this soon.";
			showPage();
		}
	}
	selectQuote();
}

function selectQuote() {
	const indexQuote = Math.floor(Math.random() * apiQuotes.length);
	const quote = apiQuotes[indexQuote];
	if (!quote.author) {
		quoteAuthor.textContent = "~ Anonymous";
	} else {
		quoteAuthor.textContent = "~ " + quote.author;
	}

	quoteMessage.textContent = formatQuoteText(quote.text);
	apiQuotes.splice(indexQuote, 1); //remove see quote so we never see it again (unless we refresh)
	showPage();
}

function formatQuoteText(quoteText) {
	var element = document.getElementById("quoteText");
	if (quoteText.length > 100) {
		element.classList.add("long-quote");
	} else {
		element.classList.remove("long-quote");
	}
	// var randomColor = Math.floor(Math.random() * 16777215).toString(16);
	// document.getElementById("quoteContainer").style.backgroundColor =
	// 	"#" + randomColor;
	return quoteText;
}

function showPage() {
	document.getElementById("loader").style.display = "none";
	document.getElementById("container").style.display = "flex";
}

buttonQuote.addEventListener("click", () => {
	getQuotes();
});
window.addEventListener("load", getQuotes);
