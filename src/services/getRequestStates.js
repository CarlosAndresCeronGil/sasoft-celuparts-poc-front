import { API_URL } from "./settings"

export default function getRequestStates() {
    const apiURL = `${API_URL}/RequestState`;
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
    )
}
