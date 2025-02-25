import React, { useState, useEffect } from 'react';
import { getReviews } from '../../service/reviewService';
import { IUser, getUserById } from '../../service/userService';
import "./ReviewList.css"


interface IReview {
    _id: string;
    comment: string;
    rating: number;
    userID: string;
    locationId: string;
}

const ReviewList: React.FC<{ locationId: string }> = ({ locationId }) => {
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [users, setUsers] = useState<{ [key: string]: IUser }>({});

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getReviews(locationId);
                setReviews(data);

                const userIds = data.map((review: IReview) => review.userID);
                const uniqueUserIds = [...new Set(userIds)];
                const usersData: { [key: string]: IUser } = {};

                for (const userId of uniqueUserIds) {
                    if (typeof userId === 'string') {
                        const user = await getUserById(userId);
                        if (user) {
                            usersData[userId] = user;
                        }
                    }
                }
                
                setUsers(usersData);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }

                console.log("Erro ao buscar reviews");
            }
        };

        fetchReviews();
    }, [locationId]);

    return (
        <div>
            <h3>Avaliações</h3>
            {reviews.length > 0 ? (
                <ul className="review-list">
                    {reviews.map((review) => (
                        <li className="review-item" key={review._id}>
                            { /*<img src={users[review.userID]?.image || 'default-profile.png'} alt={users[review.userID]?.name || 'Usuário'} /> */}
                            <div className="review-content">
                                <div className="review-author"></div>
                            </div>
                            <strong>{users[review.userID]?.name || 'Usuário desconhecido'}</strong>: {review.comment} ({review.rating}/5)
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Sem avaliações ainda</p>
            )}
        </div>
    );
};

export default ReviewList;
