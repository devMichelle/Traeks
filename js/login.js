import { apiUrl } from "./utils/api.js";
import displayMessage from "./utils/displayMessage.js";

import { saveToken, saveUser } from "./utils/storage.js";

const loginForm = document.querySelector(".login__form");
const message = document.querySelector(".message__container");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

// const loggedInText = document.querySelector(".header__nav__top");

loginForm.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if (emailValue.length === 0 || passwordValue.length === 0) {
        return displayMessage("warning", "Invalid values <br> Please enter your username/email and password", ".message__container");
    }

    login(emailValue, passwordValue);
}

async function login(email, password) {
    const url = apiUrl + "/auth/local";
    const data = JSON.stringify({ identifier: email, password: password });

    //console.log(data);

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
        }
    };

    //console.log(options);

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        console.log(json);

        if (json.user) {
            //displayMessage("success", "login successful", ".message__container");

            saveToken(json.jwt);
            saveUser(json.user);

            location.href = "admin-dashboard.html";
        }

        if (json.error) {
            return displayMessage("warning", "Invalid login details", ".message__container");
        }

        
    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".message__container");
    }
}