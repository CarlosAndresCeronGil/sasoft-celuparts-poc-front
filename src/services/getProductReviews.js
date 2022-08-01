import { API_URL } from "./settings";

export default function getProductReviews() {
    const apiURL = `${API_URL}/ProductReview`;
    return fetch(apiURL)
        .then(response => response.json())
        .then((response) => {
            return response;
        }
    )
}
