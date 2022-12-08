import { apiUrl } from "./utils/api.js";
import displayMessage from "./utils/displayMessage.js";

import { getUsername } from "./utils/storage.js";

const loggedInText = document.querySelector(".loggedIn");
const username = getUsername();

console.log(username);

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
// Add list of existing products
// ----------------------------------------------

const existingProducts = document.querySelector(".products__container");
const productsUrl = apiUrl + "/products";

(async function() {

    try {
            const response = await fetch(productsUrl);
            const products = await response.json();
            //console.log(products);

            //throw "manual error test";

            existingProducts.innerHTML = "";

            for (let i = 0; i < products.length; i++) {
                console.log(products[i]);

                let productImg = apiUrl + products[i].image.url;
                let imgAltText = products[i].image.alternativeText;
                let price = parseInt(products[i].price);
                let id = products[i].id;
                console.log(id);


                existingProducts.innerHTML += `<div class="item d-flex flex-column flex-md-row mb-4 me-md-5 justify-content-md-between">
                                                    <div class="d-flex">
                                                        <img src="${productImg}" class="item__thumbnail mb-2" alt="${imgAltText}">
                                                        <div class="item__details">
                                                            <h6 class="mb-1">${products[i].title}</h6>
                                                            <p class="item__description mb-1">${products[i].description}</p>
                                                            <p class="fw-bold mt-2 mt-md-0 ms-md-auto item__price">$${price}</p>
                                                        </div>
                                                    </div>
                                                        <a href="admin-editproduct.html?id=${products[i].id}"><button id="edit__button" type="button" class="cta me-3">Edit item</button></a>
                                                </div> `;

            }

    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".message__container");
    }

})();