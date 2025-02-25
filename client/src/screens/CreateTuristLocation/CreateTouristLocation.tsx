import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import locationService, { Country, State } from "../../service/locationService";
import touristServices from "../../service/touristLocation";
import "./createTouristLocation.css";
import Header from "../../components/Header/Header";
import { useFetchOnce } from "../../hooks/useFetchOnce";

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

function CreateTouristLocation() {
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

    useFetchOnce(async() => {
        try {
            const countryList = await locationService.getCountries();
            setCountries(countryList.sort((a, b) => a.name.localeCompare(b.name)));
        } catch (error) {
            setError("Erro ao carregar a lista de países." + (error as Error).message);
        }
    });

    const handleCountryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const country = event.target.value;
        setFormData((prevState) => ({
            ...prevState,
            address: { ...prevState.address, country },
        }));

        if (country === "Brazil") {
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

    const handleStateChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const state = event.target.value;
        setFormData((prevState) => ({
            ...prevState,
            address: { ...prevState.address, state },
        }));

        try {
            const cityList = await locationService.getCities(state);
            setCities(cityList.sort((a, b) => a.localeCompare(b)));
        } catch (error) {
            setError("Erro ao carregar as cidades." + (error as Error).message);
        }
    };

    const handleSave = async () => {
        const stateAddress = (
            formData.address.street 
            && formData.address.number 
            && formData.address.city 
            && formData.address.state
            && formData.address.country 
            && formData.address.postalcode 
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

    return (
        <div className="container-create-turist-place">
            <Header />
            <div className="container-form">
                <form className="form-modal" onSubmit={(event) => event.preventDefault()}>
                    <div className="data-event">
                        <h2>Cadastrar Local Turístico</h2>
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <div className="element-modal">
                        <label htmlFor="name">Nome</label>
                        <input
                            id="name-input"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                            placeholder="Nome"
                            required
                        />
                    </div>

                    <div className="element-modal">
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            id="description-input"
                            name="description"
                            value={formData.description}
                            onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                            placeholder="Descrição"
                            required
                        />
                    </div>

                    <div className="element-modal">
                        <label htmlFor="category">Categoria</label>
                        <input
                            id="category-input"
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={(event) => setFormData({ ...formData, category: event.target.value })}
                            placeholder="Categoria"
                            required
                        />
                    </div>

                    <div className="element-modal">
                        <label htmlFor="phone">Telefone</label>
                        <input
                            id="phone-input"
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                            placeholder="Telefone"
                            required
                        />
                    </div>

                    <div className="element-modal">
                        <label htmlFor="country">País</label>
                        <select
                            id="country-select"
                            name="address.country"
                            value={formData.address.country}
                            onChange={handleCountryChange}
                            required
                        >
                            <option value="">Selecione um país</option>
                            {countries.map((country) => (
                                <option key={country.code} value={country.name}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {states.length > 0 && (
                        <div className="element-modal">
                            <label htmlFor="state">Estado</label>
                            <select
                                id="state-select"
                                name="address.state"
                                value={formData.address.state}
                                onChange={handleStateChange}
                                required
                            >
                                <option value="">Selecione um estado</option>
                                {states.map((state) => (
                                    <option key={state.code} value={state.code}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {cities.length > 0 && (
                        <div className="element-modal">
                            <label htmlFor="city">Cidade</label>
                            <select
                                id="city-select"
                                name="address.city"
                                value={formData.address.city}
                                onChange={(event) => setFormData({ 
                                    ...formData, 
                                    address: { ...formData.address, city: event.target.value } 
                                })}
                                required
                            >
                                <option value="">Selecione uma cidade</option>
                                {cities.map((city, index) => (
                                    <option key={index} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="element-modal">
                        <label htmlFor="cep">CEP</label>
                        <input
                            id="cep-input"
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

                    <div className="element-modal">
                        <label htmlFor="street">Endereço</label>
                        <input
                            id="street-input"
                            type="text"
                            name="street"
                            value={formData.address.street}
                            onChange={(event) => setFormData({ 
                                ...formData,
                                address: { ...formData.address, street: event.target.value }
                            })}
                            placeholder="Endereço"
                            required
                        />
                    </div>

                    <div className="element-modal">
                        <label htmlFor="number">Número</label>
                        <input
                            id="number-input"
                            type="text"
                            name="phone"
                            value={formData.address.number}
                            onChange={(event) => setFormData({ 
                                ...formData,
                                address: { ...formData.address, number: event.target.value }
                            })}
                            placeholder="S/N"
                            required
                        />
                    </div>

                    <div className="element-submit-modal">
                        <input
                            type="button"
                            value={loading ? "Salvando..." : "Salvar"}
                            disabled={loading}
                            onClick={handleSave}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateTouristLocation;
