import { apiUrl } from "./utils/api.js";
import displayMessage from "./utils/displayMessage.js";
import { getToken, getUsername } from "./utils/storage.js";
import deleteButton from "./utils/deleteButton.js";

//const editContainer = document.querySelector(".edit__container");


// ----------------------------------------------
// Logged in text
// ----------------------------------------------

const loggedInText = document.querySelector(".loggedIn");

const username = getUsername();
//console.log(username);

if (username) {
    loggedInText.innerHTML += `<p class="d-inline pe-4">You are now logged in as <span class="ps-1">${username}</span></p>`;
}


// ----------------------------------------------
// Sign out and clear login info from local storage.
// ----------------------------------------------

const signOutButton = document.querySelector("#signOut");

signOutButton.onclick = function() {
        location.href ="index.html";
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    
}


// ----------------------------------------------
// Update and delete existing products
// ----------------------------------------------

const token = getToken();
//console.log(token);

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

//console.log(id);

if (!id) {
    document.location.href = "admin-dashboard.html";
}

const productUrl = apiUrl + "/products/" + id;


// --- targeting input fields ---

const submitUpdate = document.querySelector("#update");
const form = document.querySelector("form");
const featured = document.querySelector("#featured");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message__container");
const imgUrl = document.querySelector("#image-url");
//const loading = document.querySelector(".loading");
let option = document.querySelector("#true");


// --- Populate input fields with existing data ---

(async function () {
    
        try {
            const response = await fetch(productUrl);
            const productDetails = await response.json();
            console.log(productDetails);

            title.value = productDetails.title;
            price.value = productDetails.price;
            description.value = productDetails.description;
            idInput.value = productDetails.id;
            featured.value = productDetails.featured;
            imgUrl.value = productDetails.image_url;

            // if (productDetails.featured === true) {
            //     featured.checked = true;
            // }

            featured.innerHTML =    `<optgroup>
                                        <option value="yes" id="true" ${productDetails.featured === true && 'selected'}>Yes</option>
                                        <option value="no" id="false" ${productDetails.featured === false && 'selected'}>No</option>
                                    </optgroup>`;

            deleteButton(productDetails.id);

            
            console.log(featured.value);

        } catch(error) {
            console.log(error);
        }
    
})();



// --- Submit updated product info ---

submitUpdate.onclick = function submitForm(event) {
        event.preventDefault();
        console.log(event);

        message.innerHTML = "";

        const titleValue = title.value.trim();
        const priceValue = parseFloat(price.value);
        const descriptionValue = description.value.trim();
        const idValue = idInput.value;
        // const featuredValue = featured.value;
        const featuredValue = featured.selectedOptions[0].id;
        const imageUrl = imgUrl.value;

        if (titleValue.length === 0 || priceValue.length === 0 || isNaN(priceValue) || descriptionValue.length === 0) {
            return displayMessage("warning", "Please enter proper details", ".message__container");
        }

        updateProduct(titleValue, priceValue, descriptionValue, idValue, featuredValue, imageUrl);
};



async function updateProduct(title, price, description, id, featured, imageUrl) {
   

        const url = apiUrl + "/products/" + id;
        const data = JSON.stringify({   title: title, 
                                        price: price, 
                                        description: description, 
                                        featured: featured, 
                                        image_url: imageUrl });


        const options = {
            method: "PUT",
            body: data, 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const response = await fetch(url, options);
            const json = await response.json();
            console.log(json);

            if (json.updated_at) {
                displayMessage("success", "product updated", ".message__container");
            }
            if (json.error) {
                displayMessage("error", json.message, ".message__container");
            }

        } catch (error) {
            console.log(error);
        }

}






