import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import ReviewList from '../Review/ReviewList';
import { useState } from 'react';
import ReviewModal from '../Review/ReviewModal';
import { createReview } from '../../service/reviewService';


const LocationInfoBox = ({ selectedLocation }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);

    const openImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };

    const handleReviewSubmit = async (review) => {
        try {
            const userData = JSON.parse(localStorage.getItem("user") ?? "{}");
            const userID = userData ? userData.id : null;

            if (!userID) {
                throw new Error("Usuário não autenticado");
            }

            const newReview = await createReview({
                rating: review.rating,
                comment: review.comment,
                userID: userID,
                touristPlaceID: selectedLocation.id
            });
            console.log("Avaliação salva com sucesso:", newReview);
        } catch (error) {
            console.error("Erro ao salvar avaliação:", error.message);
        }
    };

    return (
        <div className="box-info p-4 max-h-[90%] overflow-y-auto">
            {selectedLocation ? (
                <>
                    <CardHeader>
                        <div className="flex flex-col items-center">
                            <CardTitle className="text-xl font-semibold">{selectedLocation.name}</CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <p className="text-sm text-gray-600">{selectedLocation.description}</p>
                    </CardContent>

                    <Separator className="my-6" />

                    <CardContent>
                        <h3 className="font-semibold text-lg mb-6">Informações</h3>
                        <div className="text-sm text-gray-800">
                            <strong>Telefone:</strong> {selectedLocation.phone}
                        </div>
                    </CardContent>

                    <Separator className="my-6" />

                    {selectedLocation.images && selectedLocation.images.length > 0 && (
                        <CardContent>
                            <h3 className="font-semibold text-lg mb-6">Imagens</h3>
                            <div className="flex gap-4 mt-4">
                                {selectedLocation.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Imagem ${index + 1}`}
                                        className="h-24 w-24 object-cover cursor-pointer rounded-md"
                                        onClick={() => openImageModal(image)}
                                    />
                                ))}
                            </div>

                            <Separator className="my-6" />
                        </CardContent>
                    )}

                    <CardContent>
                        <h3 className="font-semibold text-lg mb-6">Avaliações</h3>
                        <ReviewList locationId={selectedLocation.id} />
                        <div className="flex justify-center mt-4">
                            <Button variant="default" onClick={() => setReviewModalOpen(true)}>
                                Adicionar Avaliação
                            </Button>
                        </div>

                        <ReviewModal
                            open={reviewModalOpen}
                            onOpenChange={setReviewModalOpen}
                            onSubmit={handleReviewSubmit}
                        />
                    </CardContent>
                </>
            ) : (
                <div className="flex flex-col justify-center items-center p-8 text-center">
                    <h2 className="text-2xl font-semibold">Seja bem-vindo ao nosso site de turismo!</h2>
                    <p className="text-gray-500 mt-2">Explore os melhores locais turísticos ao redor do mundo.</p>
                </div>
            )}

            {selectedImage && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50" onClick={closeImageModal}>
                    <img
                        src={selectedImage}
                        alt="Imagem em tela cheia"
                        className="max-w-full max-h-full"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
};


export default LocationInfoBox;