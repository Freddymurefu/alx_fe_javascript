document.addEventListener("DOMContentLoaded", function(){
const serverURL = "https://jsonplaceholder.typicode.com/posts"; 
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(serverURL);
    const serverQuotes = await response.json();
    
    // Simple conflict resolution: overwrite local data
    localStorage.setItem("quotes", JSON.stringify(serverQuotes));
    renderQuotes(serverQuotes); // Re-render quotes
    showNotification("Quotes updated from server.");
  } catch (error) {
    console.error("Error fetching from server:", error);
  }
}

async function syncQuotesToServer() {
  try {
    const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

    await fetch(serverURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(localQuotes)
    });

    showNotification("Quotes synced to server.");
  } catch (error) {
    console.error("Error syncing to server:", error);
  }
}
setInterval(() => {
  fetchQuotesFromServer();
}, 30000);

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = "block";
  setTimeout(() => (notification.style.display = "none"), 5000);
}


function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = [...new Set(quotes.map(q => q.category))];

  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  // Restore saved filter
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categoryFilter.value = savedCategory;
    filterQuotes();
  }
}
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    myQuote.innerHTML = "No quotes in this category.";
  } else {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    myQuote.innerHTML = randomQuote.text;
    sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
  }
}
document.getElementById("categoryFilter").addEventListener("change", filterQuotes);


const quotes = JSON.parse(localStorage.getItem("quotes")) || [{
    text: "All the greatness you need is inside you",
    category: "Inspiration"
},
{   text: "Laughter is the best medicine",
    category: "Humor"
    },

    {
        text: "Dont watch the clock. Do what it does. Keep going!",
        category: "Motivation"
    },
  {
    text: "Why don’t scientists trust atoms? Because they make up everything.",
    category: "Humor"
  }
]

let button = document.getElementById("newQuote")
let myQuote = document.getElementById("quoteDisplay")


function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    
    const randomQuote = quotes[randomIndex]
    
    console.log(randomQuote)

    myQuote.innerHTML = randomQuote.text
    
    sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote))
   }

button.addEventListener ("click", showRandomQuote)

function createAddQuoteForm (){


let form = document.createElement("form")
document.body.appendChild(form)
let input = document.createElement("input")
 input.type = "text"
 input.placeholder ="Enter quote text"

let categoryInput = document.createElement("input")
    categoryInput.type = "text"
    categoryInput.placeholder= "Enter category"


let newQuoteButton = document.createElement("button")  

newQuoteButton.innerHTML = "Add Quote"

form.appendChild(input)
form.appendChild(categoryInput)
form.appendChild(newQuoteButton)


newQuoteButton.addEventListener("click", function(event){
    event.preventDefault()

    if (input.value.trim() === "" || categoryInput.value.trim() === "") {
  alert("Please enter both quote and category.");
  return;
}
    const newQuote = {
        text: input.value,
        category: categoryInput.value
    }
quotes.push(newQuote)
localStorage.setItem("quotes", JSON.stringify(quotes))
input.value = ""
categoryInput.value = ""
populateCategories(); // refresh the dropdown with any new categories



console.log(quotes)
})
}

createAddQuoteForm()

const lastQuote = sessionStorage.getItem("lastQuote")


if (lastQuote) {
    const parsedQuote = JSON.parse(lastQuote)
    document.getElementById("quoteDisplay").innerHTML = parsedQuote.text
} else{
    showRandomQuote()
}

let newButton = document.createElement("button")
document.body.appendChild(newButton)

let exportButton = document.getElementById("exportQuotes");

exportButton.addEventListener("click", function () {
  let quotesArray = JSON.stringify(quotes);
  let blob = new Blob([quotesArray], { type: "application/json" });

  let url = URL.createObjectURL(blob);

  const linkElement = document.createElement("a");
  linkElement.href = url;
  linkElement.download = "quotes.json";
  linkElement.click();

  URL.revokeObjectURL(url);
});

  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      importedQuotes.forEach(imported => {
  if (!quotes.some(q => q.text === imported.text && q.category === imported.category)) {
    quotes.push(imported);
  }
});
saveQuotes();
alert('Quotes imported successfully!');

    };
    fileReader.readAsText(event.target.files[0]);
  }

  let fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = ".json"; // optional: only accept JSON files
document.body.appendChild(fileInput);

// When a file is selected, run the import function
fileInput.addEventListener("change", importFromJsonFile);

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Handle Import Quotes from JSON file
let importInput = document.getElementById("importQuotes");

importInput.addEventListener("change", function (event) {
  let file = event.target.files[0];
  if (!file) return;

  let reader = new FileReader();

  reader.onload = function () {
    try {
      let importedQuotes = JSON.parse(reader.result);

      // Validate: check if it's an array of strings
      if (Array.isArray(importedQuotes) && importedQuotes.every(q => typeof q === "string")) {
        quotes = importedQuotes;
        localStorage.setItem("quotes", JSON.stringify(quotes));
        displayQuotes(); // Re-render on the page
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format. Please upload an array of quotes.");
      }
    } catch (e) {
      alert("Failed to parse JSON file.");
    }
  };

  reader.readAsText(file);
});


populateCategories(); // Make sure the dropdown is filled when the page loads


})
