import { apiUrl } from "./utils/api.js";
import displayMessage from "./utils/displayMessage.js";


const heroContainer = document.querySelector(".hero__banner");
const heroUrl = apiUrl + "/home";
const featuredContainer = document.querySelector(".featured__products");
const featuredUrl = apiUrl + "/products";
//console.log (featuredUrl);


// ----------------------------------------------
// Get hero-banner on Homepage..    
// ----------------------------------------------


(async function() {

        try {
                const response = await fetch(heroUrl);
                const heroBanner = await response.json();
                //console.log(heroBanner);

                //throw "manual error test";

                let heroImg = apiUrl + heroBanner.hero_banner.url;
                let altText = heroBanner.hero_banner_alt_text;

                console.log(heroImg);


                heroContainer.innerHTML += `<img src="${heroImg}" alt="${altText}">`

        } catch (error) {
            console.log(error);
            displayMessage("error", error, ".hero__banner");
        }

})();



// ----------------------------------------------
// Get Featured Items on Homepage..    
// ----------------------------------------------

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
                                                            <a href="product-details.html?id=${products[i].id}">
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