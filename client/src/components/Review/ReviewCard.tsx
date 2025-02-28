import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Avatar, AvatarImage } from '../ui/avatar';

interface ReviewCardProps {
    userName: string;
    userImage: string;
    rating: number;
    comment: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ userName, userImage, rating, comment }) => {
    return (
        <Card className="max-w-[100%] mx-auto p-4 shadow-md rounded-lg">
            <CardHeader>
                <div className="flex items-center">
                    <Avatar className="w-12 h-12">
                        <AvatarImage 
                            src={userImage || 'default-profile.png'} 
                            alt={userName || 'Usuário'}
                            className="object-cover w-full h-full rounded-full"
                        />
                    </Avatar>
                    <div className="ml-4">
                        <CardTitle className="text-lg font-semibold">{userName || 'Usuário desconhecido'}</CardTitle>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="text-center">
                <div className="my-2">
                </div>
                <p className="text-sm text-gray-700">{comment}</p>
            </CardContent>
        </Card>
    );
};

export default ReviewCard;
