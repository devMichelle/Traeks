const tokenKey = "token";
const userKey = "user";


export function saveToken(token) {
        saveToStorage(tokenKey, token);
}

export function getToken() {
        return getFromStorage(tokenKey);
}

export function getUser() {
    return getFromStorage(userKey);
}

export function saveUser(user) {
        saveToStorage(userKey, user);
}

export function getUsername() {
        const username = getFromStorage(userKey)

        if(username) {
            return username.username;
        }

        return null;
}

export function getUserEmail() {
        const user = getFromStorage(userKey)

        if(user) {
            return user.email;
        }

        return null;
}


export function clearCart() {
        const button = document.querySelector("#clearCart");
        const item = document.querySelector(".cart__details");
        const itemsSubtotal = document.querySelector(".subtotal");
        const itemsTotal = document.querySelector(".total");

        button.addEventListener("click", clearItems);

        function clearItems() {
            localStorage.clear();
            item.innerHTML = "There are no items in your shopping cart yet..";
            itemsSubtotal.innerHTML = "$ 0";
            itemsTotal.innerHTML = "$ 0";
        }
}

//Get the item that's already in local storage
export function getItems() {
        const items = localStorage.getItem("item");

        if (items === null) {
            return [];
        } else {
            return JSON.parse(items);
        }
}


//Save the items in local storage
export function saveItems(items) {
        localStorage.setItem("item", JSON.stringify(items));
}



function saveToStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
        const value = localStorage.getItem(key);

        if (!value) {
            return [];
        }

        return JSON.parse(value);
}



