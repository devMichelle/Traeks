//import { apiUrl } from "./utils/api.js";
//import displayMessage from "./utils/displayMessage.js";
import { getItems, clearCart } from "./utils/storage.js";


const cartDetails = document.querySelector(".cart__details");
const itemsSubtotal = document.querySelector(".subtotal");
const itemsTotal = document.querySelector(".total");
const items = getItems();

console.log(items);
//const products = apiUrl + "/products/";

if (items.length === 0) {
    cartDetails.innerHTML = "There are no items in your shopping cart yet..";
}


items.forEach(item => {

    let itemPrice = parseInt(item.price);
    console.log(itemPrice);
    

    cartDetails.innerHTML += `<div class="cart__item d-flex flex-column flex-md-row mb-4 me-md-5">
                                <img src="${item.img}" class="cart__thumbnail mb-2" alt="${item.altText}">
                                <div>
                                    <h6 class="mb-1">${item.title}</h6>
                                    <p class="cart__description mb-1">${item.description}</p>
                                    <a href="product-details.html?id=${item.id}" class="link mb-5">View item</a>
                                </div>
                                <p class="fw-bold mt-2 mt-md-0 ms-md-auto cart__price">$${itemPrice}</p>
                            </div> `


                            let subTotal = 0;

                            items.forEach(item => {
                                let itemSubTot = parseInt(item.price); 
                                subTotal += parseFloat(itemSubTot);

                                itemsSubtotal.innerHTML = `$${subTotal}`;
                                itemsTotal.innerHTML = `$${subTotal}`;
                            })

                            //console.log(subTotal);

                        


})


// ----------------------------------------------
// Clear cart and redirect to checkout page.
// ----------------------------------------------

const checkoutButton = document.querySelector("#checkout");

checkoutButton.onclick = function() {
    location.href ="checkout.html";
        localStorage.clear();
        cartDetails.innerHTML = "There are no items in your shopping cart yet..";
        itemsSubtotal.innerHTML = "$ 0";
        itemsTotal.innerHTML = "$ 0";
    
}


// ----------------------------------------------
// Clear shopping cart button
// ----------------------------------------------

clearCart();