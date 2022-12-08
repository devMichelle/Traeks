import { apiUrl } from "./utils/api.js";
import displayMessage from "./utils/displayMessage.js";
import { saveItems, getItems } from "./utils/storage.js";

const productDetailsContainer = document.querySelector(".details__container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

//console.log(id);

const productUrl = apiUrl + "/products/" + id;

//console.log(productUrl);


(async function getProduct() {

        try {
                const response = await fetch(productUrl);
                const productDetails = await response.json();
                console.log(productDetails);

                //throw "manual error test";

                let productImg = apiUrl + productDetails.image.formats.small.url;
                let productThumbnail = apiUrl + productDetails.image.formats.thumbnail.url;
                let altText = productDetails.image.alternativeText;
                let price = parseInt(productDetails.price);

                //console.log(productThumbnail);


                document.title = "Træks | " + `${productDetails.title}`;
                
                productDetailsContainer.innerHTML +=    `<div class="product__img">
                                                            <img class="product__img__main" src="${productImg}" alt="${altText}">
                                                            <div class="product__img__thumbnail">
                                                                <img class="thumbnail" src="${productThumbnail}" alt="${altText}">
                                                                <img class="thumbnail" src="${productThumbnail}" alt="${altText}">
                                                                <img class="thumbnail" src="${productThumbnail}" alt="${altText}">
                                                            </div>
                                                        </div>
                                                        <div class="product__specifics">
                                                            <h1>${productDetails.title}</h1>
                                                            <h4>$ ${price}</h4>
                                                            <p>${productDetails.description}</p>
                                                            <button class="cta" id="addToCart" data-title="${productDetails.title}" data-price="${price}" data-img="${productThumbnail}" data-alt="${altText}" data-id="${productDetails.id}" data-description="${productDetails.description}">Add to cart</button>
                                                        </div>`



                                                        // ----------------------------------------------
                                                        // Counter on shopping cart    
                                                        // ----------------------------------------------


                                                        const addToCartButton = document.querySelector("#addToCart");
                                                        const cartCounter = document.querySelector(".cart__counter");
                                                        const cartTotal = document.querySelector(".cart__total");
                                                        const savedItem = productDetails;

                                                        console.log(savedItem); 

                                                        let count = 1;
                                                        let total = 0;


                                                        addToCartButton.onclick = function(){
                                                            total += productDetails.price;

                                                            const title = this.dataset.title;
                                                            const price = this.dataset.price;
                                                            const img = this.dataset.img;
                                                            const altText = this.dataset.alt;
                                                            const id = this.dataset.id;
                                                            const description = this.dataset.description;

                                                            //Checks for existing Items stored in localstorage (using find-method)
                                                            const currentItems = getItems();

                                                            console.log(currentItems);

                                                            const ItemsExists = currentItems.find(function(item) {
                                                                return item.title === title;
                                                            });

                                                            //If Item doesn't exist push the item to the array, if it does exist remove it (using filter-method) 
                                                            if(!ItemsExists) {
                                                                const item = { title: title, price: price, img: img, altText: altText, id: id, description: description};
                                                                currentItems.push(item);
                                                                cartCounter.style.display = "block";
                                                                cartTotal.innerHTML = `${count}`;
                                                                localStorage.setItem("itemCount", count);
                                                                addToCartButton.innerHTML = "Remove from cart";
                                                                count++;
                                                                saveItems(currentItems);
                                                    
                                                            }
                                                            else {
                                                                const newItems = currentItems.filter(item => item.title !== title);
                                                                addToCartButton.innerHTML = "Add to cart";
                                                                saveItems(newItems); 
                                                            }

                                                            console.log(newCount); 

                                                        }

                                            



        } catch (error) {
            console.log(error);
            displayMessage("error", error, ".details__container");
        }

})();



