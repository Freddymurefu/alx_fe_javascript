const quotes = [{
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

    myQuote.textContent = randomQuote.text

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

newQuoteButton.textContent = "Add Quote"

form.appendChild(input)
form.appendChild(categoryInput)
form.appendChild(newQuoteButton)


newQuoteButton.addEventListener("click", function(event){
    event.preventDefault()
    const newQuote = {
        text: input.value,
        category: categoryInput.value
    }
quotes.push(newQuote)

console.log(quotes)
})
}

createAddQuoteForm()