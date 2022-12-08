import { apiUrl } from "./utils/api.js";
import displayMessage from "./utils/displayMessage.js";

const productsContainer = document.querySelector(".products");
const productsUrl = apiUrl + "/products";
//console.log (productsUrl);



// ----------------------------------------------
// Get all items on products-page..    
// ----------------------------------------------

(async function() {

        try {
                const response = await fetch(productsUrl);
                const products = await response.json();
                //console.log(products);

                //throw "manual error test";

                productsContainer.innerHTML = "";

                for (let i = 0; i < products.length; i++) {
                    //console.log(products[i].id);

                    let productImg = apiUrl + products[i].image.url;
                    let imgAltText = products[i].image.alternativeText;
                    let price = parseInt(products[i].price);
                    //console.log(featuredAltText);


                        productsContainer.innerHTML += `<div class="products__card col-xs-12 col-sm-6 col-md-3 shadow-sm">
                                                            <a href="product-details.html?id=${products[i].id}">
                                                                <img class="products__img" src="${productImg}" alt="${imgAltText}">
                                                                <div class="products__details">
                                                                    <h4>${products[i].title}</h4>
                                                                    <p>$ ${price}</p>
                                                                </div>
                                                            </a>
                                                        </div>
                                                        `;



                        // ----------------------------------------------
                        // Filter the products  
                        // ----------------------------------------------

                        const search = document.querySelector(".search__products");
                        let newProductList = products;

                        search.onkeyup = function() {
                                const searchValue = event.target.value.trim().toLowerCase();

                                const filteredProducts = products.filter(function (product) {
                                    if (product.title.toLowerCase().includes(searchValue) || product.description.toLowerCase().includes(searchValue)) {
                                        return true;
                                    }
                                });

                            //console.log(filteredProducts);


                            function createProductList() {

                                    let price = parseInt(products[i].price);

                                    productsContainer.innerHTML = "";

                                    newProductList.forEach((products) => {
                                        productsContainer.innerHTML += `<div class="products__card col-xs-12 col-sm-6 col-md-3 shadow-sm">
                                                                            <a href="product-details.html?id=${products.id}">
                                                                                <img class="products__img" src="${apiUrl + products.image.url}" alt="${products.image.alternativeText}">
                                                                                <div class="products__details">
                                                                                    <h4>${products.title}</h4>
                                                                                    <p>$ ${price}</p>
                                                                                </div>
                                                                            </a>
                                                                        </div> `;   


                                    }); 


                            }

                            //console.log(newProductList);
                            
                            function filteredProductList() {

                                newProductList = filteredProducts;
                                createProductList(newProductList);

                                // if (newProductList.length === 0) {
                                //     displayMessage("warning", "No matches", ".main__content");
                                // } else {
                                //       createProductList(newProductList);
                                // };

                            }
                        
                            filteredProductList();


                        }

                        
                }

        } catch (error) {
            console.log(error);
            displayMessage("error", error, ".main__content");
        }

})();