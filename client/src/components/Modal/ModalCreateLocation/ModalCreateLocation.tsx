import "../CreateTouristPlace.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import locationService, { Country, State } from "../../../service/locationService";
import touristServices from "../../../service/touristPlaceService";
import { useFetchOnce } from "../../../hooks/useFetchOnce";
import FormField from "../../FormField/FormField";
import FormSelect from "../../FormSelect/FormSelect";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { PhotoIcon } from "@heroicons/react/24/solid";
import ModalUploadImage from "../ModalUploadImage/ModalUploadImage";


interface Address {
    street: string;
    number: string;
    city: string;
    state: string;
    country: string;
    postalcode: string;
}

interface FormData {
    name: string;
    description: string;
    category: string;
    image: string;
    phone: string;
    address: Address;
}

interface ModalCreateLocationProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalCreateLocation: React.FC<ModalCreateLocationProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        description: "",
        category: "",
        image: "",
        phone: "",
        address: {
            street: "",
            number: "",
            city: "",
            state: "",
            country: "",
            postalcode: "",
        },
    });

    const [error, setError] = useState<string | null>(null);
    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);

    useFetchOnce(async () => {
        try {
            const countryList = await locationService.getCountries();
            setCountries(countryList.sort((a, b) => a.name.localeCompare(b.name)));
        } catch (error) {
            setError("Erro ao carregar a lista de países." + (error as Error).message);
        }
    });

    const handleCountryChange = async (event: string) => {
        setFormData((prevState) => ({
            ...prevState,
            address: { ...prevState.address, country: event },
        }));

        if (event === "Brazil") {
            try {
                const stateList = await locationService.getStates();
                setStates(stateList.sort((a, b) => a.name.localeCompare(b.name)));
            } catch (error) {
                setError("Erro ao carregar os estados." + (error as Error).message);
            }
        } else {
            setStates([]);
            setCities([]);
        }
    };

    const handleStateChange = async (event: string) => {
        setFormData((prevState) => ({
            ...prevState,
            address: { ...prevState.address, state: event },
        }));

        try {
            const cityList = await locationService.getCities(event);
            setCities(cityList.sort((a, b) => a.localeCompare(b)));
        } catch (error) {
            setError("Erro ao carregar as cidades." + (error as Error).message);
        }
    };

    const handleSave = async () => {
        const stateAddress = (
            formData.address.street &&
            formData.address.number &&
            formData.address.city &&
            formData.address.state &&
            formData.address.country &&
            formData.address.postalcode
        ) ? true : false;

        if (!formData.name || !formData.description || !formData.category || !formData.phone || !stateAddress) {
            setError("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
            setError("Token inválido ou expirado.");
            return;
        }

        setLoading(true);
        try {
            setError(null);
            await touristServices.createTouristLocation(formData, token);
            alert("Local turístico cadastrado com sucesso!");
            navigate("/home");
        } catch (error) {
            const message = (error as Error).message || "Erro ao salvar o local turístico.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (images: string[]) => {
        setUploadedImages(images);
        setShowUploadModal(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={`sm:w-[30%] sm:max-w-[60%] md:max-h-[95%] ${uploadedImages.length > 0 ? 'sm:w-[60%]' : ''}`}>
                <DialogHeader>
                    <DialogTitle>Create Tourist Location</DialogTitle>
                    <DialogDescription>
                        Adicione detalhes sobre o novo local turístico. Clique em salvar quando terminar.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex gap-6 w-full">
                    <div className="flex flex-col gap-6 `w-${uploadedImages.length > 0 ? '2/3' : '3'}">
                        <FormField
                            id="name-input"
                            label="Nome"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                            placeholder="Nome"
                            required
                        />

                        <FormField
                            id="description-input"
                            label="Descrição"
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                            placeholder="Descrição"
                            required
                        />

                        <FormField
                            id="category-input"
                            label="Categoria"
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={(event) => setFormData({ ...formData, category: event.target.value })}
                            placeholder="Categoria"
                            required
                        />

                        <FormField
                            id="phone-input"
                            label="Telefone"
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                            placeholder="Telefone"
                            required
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
                            <FormSelect
                                id="country-select"
                                label="País"
                                name="address.country"
                                value={formData.address.country}
                                placeholder="Selecione um país"
                                options={countries.map((country) => ({ value: country.name, label: country.name }))}
                                onChange={handleCountryChange}
                                required
                            />

                            {states.length > 0 && (
                                <FormSelect
                                    id="state-select"
                                    label="Estado"
                                    name="address.state"
                                    value={formData.address.state}
                                    placeholder="Selecione um estado"
                                    options={states.map((state) => ({ value: state.code, label: state.name }))}
                                    onChange={handleStateChange}
                                    required
                                />
                            )}

                            {cities.length > 0 && (
                                <FormSelect
                                    id="city-select"
                                    label="Cidade"
                                    name="address.city"
                                    value={formData.address.city}
                                    placeholder="Selecione uma cidade"
                                    options={cities.map((city) => ({ value: city, label: city }))}
                                    onChange={(event) => setFormData({
                                        ...formData,
                                        address: { ...formData.address, city: event }
                                    })}
                                    required
                                />
                            )}

                            <FormField
                                id="cep-input"
                                label="CEP"
                                type="text"
                                name="cep"
                                value={formData.address.postalcode}
                                onChange={(event) => setFormData({
                                    ...formData,
                                    address: { ...formData.address, postalcode: event.target.value }
                                })}
                                placeholder="00000-000"
                                required
                            />
                        </div>
                    </div>

                    {uploadedImages.length > 0 && (
                        <div className="flex flex-wrap gap-3 overflow-y-auto max-h-72 p-2 rounded-lg">
                            {uploadedImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Preview ${index + 1}`}
                                    className="h-24 w-auto max-w-full object-cover shadow rounded-md"
                                />
                            ))}
                        </div>
                    )}

                </div>
                <DialogFooter className="flex justify-between w-full">
                    <Button
                        type="button"
                        className="ml-auto flex items-center space-x-2"
                        onClick={() => setShowUploadModal(true)}
                    >
                        <PhotoIcon className="h-5 w-5" />
                        <span>Upload Imagens</span>
                    </Button>
                    <Button type="submit" className="ml-auto">Save</Button>
                </DialogFooter>
            </DialogContent>

            <ModalUploadImage
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onUpload={handleImageUpload}
            />
        </Dialog>
    );
};

export default ModalCreateLocation;
