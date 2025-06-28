"use strict";

// building an array of objects for the interactive productDisplay
// images sourced from myself
const products = [
    {
        name: "Moonbeam Mocha",
        image: "images/moonbeam-mocha.png",
        description: "Velvety, rich, mocha latte with violet galaxy foam and edible star dust"
    },

    {
        name: "Strawberry Stardust",
        image: "images/strawberry-stardust.png",
        description: "Dreamy matcha topped with soft strawberry foam and starlight sweetness"
    },

    {
        name: "Starbit Brownie",
        image: "images/starbit-brownie.png",
        description: "A warm, gooey fudge brownie dusted with sparkly starbits"
    }
]
// grabbing empty div in html where product will be shown
const display = document.getElementById("productDisplay");
// creating a function for when someone clicks a button 
function displayProduct(index) {
    display.innerHTML = `
  <img src="${products[index].image}" alt="${products[index].name}">
  <h3>${products[index].name}</h3>
  <p>${products[index].description}</p>
`;
}
// displaying my image on the webpage!
displayProduct(0);


// grabbing empty productControls div
const buttons = document.getElementById("productControls");
// looping through products array
for (let i = 0; i < products.length; i++) {
//creating a button for each product so when clicked on it will display properly based on its index
    let button = document.createElement("button");
// making label for each button
    button.textContent = products[i].name;
// making the button interactive by adding an event listener
    button.addEventListener("click", function () {
        displayProduct(i);
    });
// placing new button to be added to actual html #productControls section, that way it will show on the webpage
buttons.appendChild(button);
}

// grabbing form gameForm
const form = document.getElementById("gameForm");
// creating an event listener for when submit is clicked, for the random number guessing game, that will be attached to the form
form.addEventListener("submit", function(event) {
    event.preventDefault();
// grab and store guessed number from user, using Number to compare numbers because the input is a string
    let userGuess = Number(document.getElementById("guess").value);
// creating a random number 1-10 and storing it
    let randomNumber = Math.floor(Math.random() * 10) + 1
// using if-else to compare the two variables and placing in empty div gameResult
    if (userGuess === randomNumber) {
// added <br> so it looks clean with the win/lose result underneath the numbers
        document.getElementById("gameResult").innerHTML = `Your guess: ${userGuess} | Winning number: ${randomNumber}<br>You win!`;
    }
    else {
        document.getElementById("gameResult").innerHTML = `Your guess: ${userGuess} | Winning number: ${randomNumber} <br>Sorry, try again.`;
    }
});

// grabbing contact form
const contactForm = document.getElementById("contactForm");
// adding a submit event listener
contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
// getting the values inputted from user
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let comments = document.getElementById("comments").value;
    // getting actual value of email or phone while also making sure its checked
    let contactPreference = document.querySelector('input[name="contactPref"]:checked');
    let contactPrefValue = contactPreference ? contactPreference.value : "";

// checking any errors manually 
    let errors = [];
    // making sure if the field is really empty using .trim
    if (name.trim() === "") {
        errors.push("Name is required.");
    }

    if (comments.trim() === "") {
        errors.push("Comments are required");
    }
    // making sure a contact method is selected
    if (!contactPreference) {
        errors.push("Please select a preferred method of contact.");
    }

    if (contactPrefValue === "email" && email.trim() === "") {
        errors.push("Email is required when email is selected.") 
    }

    if (contactPrefValue === "phone" && phone.trim() === "") {
        errors.push("Phone number is required when phone is selected.")
    }

// using regex to make sure phone and email are properly formatted
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phoneRegex = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
// checking now to make sure they are valid
    if (contactPrefValue === "email" && !emailRegex.test(email)) {
        errors.push("Please enter a valid email address.");
    }

    if (contactPrefValue === "phone" && !phoneRegex.test(phone)) {
        errors.push("Please enter a valid phone number.");
    }

// showing an error or thank you message using my #formErrors and #formThanks div
    const errorDiv = document.getElementById("formErrors");
    const thanksDiv = document.getElementById("formThanks");
// in case there was a mistype, etc. this is to clear any old messages so they don't stay on the screen
    errorDiv.innerHTML = "";
    thanksDiv.innerHTML = "";
// showing all errors as list items
    if (errors.length > 0) {
        errorDiv.innerHTML = "<ul>" + errors.map(error => `<li>${error}</li>`).join("") + "</ul>";
        return;
    }
// creating a customer object for when the form is valid
    let customer = {
        name: name,
        email: email,
        phone: phone,
        comments: comments,
        contactPreference: contactPrefValue
    };
// resetting the form
    contactForm.reset();
// showing the thank you message when form is successfully submitted
    thanksDiv.innerHTML = `<p>Thank you, ${customer.name}! We'll reach out to you by ${customer.contactPreference}.𖥔 ݁ ˖ִ ࣪𖤐<br> Your message: "${customer.comments}"</p>`;
});

// grabbing the toggle button and adding an event listener
const toggleButton = document.getElementById("modeToggle");

toggleButton.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});


