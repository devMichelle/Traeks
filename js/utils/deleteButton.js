import { apiUrl } from "./api.js";
import { getToken } from "./storage.js";

export default function deleteButton(id) {
    const button = document.querySelector("#deleteButton");

    button.onclick = async function () {
        console.log(id);

        const deleteItem = confirm("Are you sure you want to delete this item?");
        console.log(deleteItem);

        if (deleteItem) {
            const url = apiUrl + "/products/" + id;

            const token = getToken();

            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await fetch(url, options);
                const json = await response.json();
                console.log(json);

                location.href = "admin-products.html";

            } catch(error) {
                console.log(error);
            }
        }

    };
}