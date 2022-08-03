import { API_URL } from "./settings";

export default function postEquipment(data) {
    const apiURL = `${API_URL}/Equipment`;

    return fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
            return error;
        }
        );
}