import { API_URL } from "./settings";
import Swal from 'sweetalert2'

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
            return data;
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Parece que algo falló!',
            })
            console.log(error);
            return error;
        }
        );
}