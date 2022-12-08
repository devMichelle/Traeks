import { apiUrl } from "./utils/api.js";
import displayMessage from "./utils/displayMessage.js";

import { getToken, getUser, getUsername, getUserEmail } from "./utils/storage.js";

const loggedInText = document.querySelector(".loggedIn");
const welcomeText = document.querySelector(".admin__welcome");
const userEmail = getUserEmail();
const username = getUsername();

console.log(username);

// ----------------------------------------------
// Logged in text
// ----------------------------------------------

if (username) {
        loggedInText.innerHTML += `<p class="d-inline pe-4">You are now logged in as <span class="ps-1">${username}</span></p>`;
        welcomeText.innerHTML += `<h1> Hi, ${username}</h1>
                                  <p class="mb-5"> Phasellus magna. Suspendisse non nisl sit amet velit hendrerit rutrum. Sed fringilla mauris sit amet nibh. Etiam rhoncus. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. </p>
                                  <h4>Monthly updates</h4>
                                  <p class="mb-5 pb-5"> Phasellus magna. Suspendisse non nisl sit amet velit hendrerit rutrum. Sed fringilla mauris sit amet nibh. Etiam rhoncus. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede.
                                  <br>
                                  In consectetuer turpis ut velit. Pellentesque ut neque. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Sed libero. Quisque ut nisi.</p>`;
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
// Get currently featured items    
// ----------------------------------------------

const featuredUrl = apiUrl + "/products";
const featuredContainer = document.querySelector(".featured__products");

(async function() {

        try {
                const response = await fetch(featuredUrl);
                const products = await response.json();
                //console.log(products);

                //throw "manual error test";

                
                for (let i = 0; i < products.length; i++) {
                    //console.log(products[i].id);

                    let featuredImg = apiUrl + products[i].image.url;
                    let featuredAltText = products[i].image.alternativeText;
                    let price = parseInt(products[i].price);

                    console.log(featuredImg);

                    if (products[i].featured === true) {
                        //console.log("featured");

                        featuredContainer.innerHTML += `<div class="featured__card col-xs-12 col-sm-6 col-md-4 shadow-sm">
                                                            <a href="admin-editproduct.html?id=${products[i].id}">
                                                                <img class="featured__img" src="${featuredImg}" alt="${featuredAltText}">
                                                                <div class="featured__details">
                                                                    <h4>${products[i].title}</h4>
                                                                    <p>$ ${price}</p>
                                                                </div>
                                                            </a>
                                                        </div>
                                                        `;

                        
                    }
                }

            } catch (error) {
                console.log(error);
                displayMessage("error", error, ".main__content");
            }

    })();

// // ----------------------------------------------
// // Add list of existing products
// // ----------------------------------------------

// const existingProducts = document.querySelector(".editProducts__container");
// const productsUrl = apiUrl + "/products";

// (async function() {

//     try {
//             const response = await fetch(productsUrl);
//             const products = await response.json();
//             //console.log(products);

//             //throw "manual error test";

//             existingProducts.innerHTML = "";

//             for (let i = 0; i < products.length; i++) {
//                 //console.log(products[i]);

//                 let productImg = apiUrl + products[i].image.url;
//                 let imgAltText = products[i].image.alternativeText;
//                 let price = parseInt(products[i].price);
//                 let id = products[i].id;
//                 console.log(id);


//                 existingProducts.innerHTML += `<div class="item d-flex flex-column flex-md-row mb-4 me-md-5 justify-content-md-between">
//                                                     <div class="d-flex">
//                                                         <img src="${productImg}" class="item__thumbnail mb-2" alt="${imgAltText}">
//                                                         <div class="item__details">
//                                                             <h6 class="mb-1">${products[i].title}</h6>
//                                                             <p class="item__description mb-1">${products[i].description}</p>
//                                                             <p class="fw-bold mt-2 mt-md-0 ms-md-auto item__price">$${price}</p>
//                                                         </div>
//                                                     </div>
//                                                     <div class="button__container d-flex flex-md-column w-25">
//                                                         <a href="edit.html?id=${products[i].id}"><button id="edit__button" type="button" class="cta cta__small me-3">Edit</button></a>
//                                                         <button id="delete__button" type="button" class="cta cta__clear cta__small" data-id="${products[i].id}">Delete</button>
//                                                     </div>
//                                                 </div> `;

//             }

//     } catch (error) {
//         console.log(error);
//         displayMessage("error", error, ".editProducts__container");
//     }

// })();
