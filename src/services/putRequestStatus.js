import { API_URL } from "./settings";

export default function putRequestStatus(data) {
    const apiURL = `${API_URL}/RequestStatus`;

    return fetch(apiURL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}