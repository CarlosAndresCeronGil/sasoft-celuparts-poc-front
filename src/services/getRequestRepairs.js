import { API_URL } from './settings'

export default function getRequestRepairs({page}) {
    const apiURL = `${API_URL}/Request/Repairs/${page}`;

    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            console.log(response)
            return response;
        })
        .catch(error => {
            console.log(error)
            return error;
        })
}
