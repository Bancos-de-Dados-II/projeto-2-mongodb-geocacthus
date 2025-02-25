import { apiConfig } from "../config/api";

interface ReviewDTO {
    rating: number;
    comment: string;
    userID: string;
    touristPlaceID: string;
};

const createReview = async (review: ReviewDTO) => {
    const response = await fetch(`${apiConfig.baseUrl}/review`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify(review)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create review");
    }

    const data = await response.json();
    return data;
}

const getReviews = async (touristPlaceID: string) => {
    const response = await fetch(`${apiConfig.baseUrl}/reviews/${touristPlaceID}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch reviews");
    }

    const data = await response.json();
    console.log(data);
    console.log(response);
    return data;
}

export { createReview, getReviews };
export type { ReviewDTO };