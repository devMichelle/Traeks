import { apiUrl } from "./utils/api.js";
import displayMessage from "./utils/displayMessage.js";

import { getToken, getUser, getUsername, getUserEmail } from "./utils/storage.js";


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
// add and upload new products
// ----------------------------------------------

//-- Targeting the inputs --

const message = document.querySelector(".message__container");
const productUploadForm = document.querySelector(".product__form");

const title = document.querySelector("#title");
let titleValue = "";

const price = document.querySelector("#price");
let priceValue = "";

const featured = document.querySelector("#featured");
let featuredValue = featured.selectedOptions[0].id;

const description = document.querySelector("#description");
let descriptionValue = "";

const file = document.querySelector("#file");
let fileValue = {};

const imgUrl = document.querySelector("#image-url");
let imgUrlValue = "";



//-- Handle change --

const handleTitleChange = (e) => {
    titleValue = e.target.value;
};
title.addEventListener("change", handleTitleChange);


const handlePriceChange = (e) => {
    priceValue = e.target.value;
};
price.addEventListener("change", handlePriceChange);


const handleFeaturedChange = (e) => {
    featuredValue = e.target.selectedOptions[0].id;
};
featured.addEventListener("change", handleFeaturedChange);


const handleDescriptionChange = (e) => {
    descriptionValue = e.target.value;
};
description.addEventListener("change", handleDescriptionChange);


const handleUrlChange = (e) => {
    imgUrlValue = e.target.value;
};
imgUrl.addEventListener("change", handleUrlChange);


const formData = new FormData();
formData.append("ref", "products");
formData.append("field", "image");

const handleFileChange = (e) => {
    fileValue = e.target.files[0];
    formData.append("files", fileValue);
};
file.addEventListener("change", handleFileChange);


//-- Upload function --

async function upload() {
    const uploadUrl = apiUrl + "/upload";
    const productUrl = apiUrl + "/products";

    const formBody = {
      title: titleValue,
      price: priceValue,
      featured: featuredValue,
      description: descriptionValue,
      image_url: imgUrlValue,
    };

    const token = getToken();


    //-- Uploading the product details (as in formBody) --

    try {
          const prodRes = await fetch(productUrl, {
            method: "POST",
            body: JSON.stringify(formBody),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const prodJson = await prodRes.json();
          console.log(prodJson);


          //-- The image file store and upload --

          formData.append("refId", prodJson.id);

          try {
              const fileRes = await fetch(uploadUrl, {
                method: "POST",
                body: formData,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              const fileJson = await fileRes.json();
              console.log(fileJson);

          } catch (error) {
            console.log(error);
            displayMessage("error", error, ".message__container");
          }
      
    } catch (error) {
      console.log(error);
      displayMessage("error", error, ".message__container");
    }
}

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    if (!productUploadForm) {
      return displayMessage(
        "warning",
        "Invalid values <br> Please attach an image file",
        ".message__container"
      );
    }

    upload();
}

productUploadForm.addEventListener("submit", submitForm);
