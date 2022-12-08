import { apiUrl } from "./utils/api.js";
import displayMessage from "./utils/displayMessage.js";
import { saveItems, getItems } from "./utils/storage.js";



function signUp(username, email, password) {

    try {

        fetch (url, {
            method: "POST",
        body: {username, email, password},
        headers: {
            "Content-Type": "application/json",
        }
    })

    }catch (error) {
        return displayMessage("warning", "Invalid signup details", ".message__container");

    }
}