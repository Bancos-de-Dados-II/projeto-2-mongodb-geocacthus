import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { PhotoIcon } from "@heroicons/react/24/solid";

interface ModalUploadImageProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (imageUrls: string[]) => void;
}

const ModalUploadImage: React.FC<ModalUploadImageProps> = ({ isOpen, onClose, onUpload }) => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length > 0) {
            setSelectedImages((prev) => [...prev, ...files]);

            const newPreviews = files.map((file) => URL.createObjectURL(file));
            setPreviewUrls((prev) => [...prev, ...newPreviews]);
        }
    };

    const handleNext = () => {
        onUpload(previewUrls);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[60%] p-6">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">Upload de Imagens</DialogTitle>
                </DialogHeader>

                <div className="border-t-2 border-gray-300 my-4"></div>

                <div className="flex w-full">
                    <div className="flex flex-col items-center space-y-4 w-1/2">
                        <h2 className="text-2xl font-semibold text-center">Selecione imagens para começar</h2>
                        <p className="text-lg text-center text-gray-600">
                            Compartilhe imagens do seu lugar turístico para deixar a experiência ainda mais completa.
                        </p>

                        <Button
                            type="button"
                            onClick={() => document.getElementById("file-upload")?.click()}
                            className="flex items-center space-x-2"
                        >
                            <PhotoIcon className="h-5 w-5" />
                            <span>Carregar a partir do computador</span>
                        </Button>

                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    {previewUrls.length > 0 && (
                        <div className="w-1/2 flex flex-wrap gap-3 overflow-y-auto max-h-72 p-2">
                            {previewUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Preview ${index + 1}`}
                                    className="h-24 w-24 object-cover shadow"
                                />
                            ))}
                        </div>
                    )}
                </div>

                <DialogFooter className="flex justify-between w-full mt-4">
                    <Button onClick={onClose} className="bg-gray-500 text-white">
                        Voltar
                    </Button>
                    <Button onClick={handleNext} className="bg-blue-500 text-white" disabled={previewUrls.length === 0}>
                        Avançar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ModalUploadImage;
