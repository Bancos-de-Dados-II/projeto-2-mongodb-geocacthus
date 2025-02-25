import axios from "axios";
import { LatLngTuple } from "leaflet";

export interface IApiResponse {
    id: string;
    name: string;
    description: string;
    category: string;
    image: string;
    phone: string;
    location: {
        crs: {
            type: string;
            properties: {
                name: string;
            };
        };
        type: string;
        coordinates: LatLngTuple;
    };
}

interface ITouristCreate {
    name: string;
    description: string;
    category: string;
    image: string;
    phone: string;
    address: {
        street: string;
        number: string;
        city: string;
        state: string;
        country: string;
        postalcode: string;
    };
}

export interface ITouristUpdate {
    name: string;
    description: string;
    category: string;
    phone: string;
    address: {
        street: string;
        number: string;
        city: string;
        state: string;
        country: string;
        postalcode: string;
    };
}

export interface ITouristLocationBase {
    id: string;
    name: string;
    description: string;
    category: string;
    image: string;
    phone: string;
    position: LatLngTuple;
}

const dataTouristLocations: ITouristLocationBase[] = [];
const API_URL = "http://localhost:3000/api";


const fetchTouristLocations = async () => {
    try {
        const response = await axios.get<IApiResponse[]>(`${API_URL}/tourist-place/`);
        const data = response.data;

        dataTouristLocations.length = 0;

        const formattedData = data.map(instance => ({
            id: instance.id,
            name: instance.name,
            description: instance.description,
            category: instance.category,
            image: instance.image,
            phone: instance.phone,
            position: [instance.location.coordinates[1], instance.location.coordinates[0]] as LatLngTuple, // Conversão para o formato Latitude e Longitude
        }));

        dataTouristLocations.push(...formattedData);
        return dataTouristLocations;
    } catch (error) {
        console.log("Erro na busca de dados do endpoint: ", (error as Error).message);
        return null;
    }
}

const createTouristLocation = async (touristPlace: ITouristCreate, my_token: string) => {
    const endpoint = `${API_URL}/tourist-place`;

    const body = {
        name: touristPlace.name,                        //"Cristo Redentor"
        description: touristPlace.description,          //"Monumento famoso no Rio de Janeiro"
        category: touristPlace.category,                //"Monumento"
        image: touristPlace.image,                      //"https://exemplo.com/imagem.jpg"
        phone: touristPlace.phone,                      //"83996108613"
        address: {
            street: touristPlace.address.street,        // "Av. Paulista"
            number: touristPlace.address.number,        //"1000"
            city: touristPlace.address.city,            //"São Paulo"
            state: touristPlace.address.state,          //"SP"
            country: touristPlace.address.country,      //"Brasil"
            postalcode: touristPlace.address.postalcode //"01310-000"
        }
    };
    
    try {
        const response = await axios.post(endpoint, body, { 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${my_token}`,
            }
        });

        console.log("Novo local turístico cadastrado com sucesso: ", response.data);
    } catch (error) {
        console.log("Erro ao cadastrar novo local turístico: ", (error as Error).message);
    }
}

const updateTouristLocation = async (touristID: string, touristPlace: ITouristUpdate, my_token: string) => {
    const endpoint = `${API_URL}/tourist-place/${touristID}`;

    const body = {
        name: touristPlace.name,                        //"Cristo Redentor"
        description: touristPlace.description,          //"Monumento famoso no Rio de Janeiro"
        category: touristPlace.category,                //"Monumento"
        phone: touristPlace.phone,                      //"83996108613"
        address: {
            street: touristPlace.address.street,        // "Av. Paulista"
            number: touristPlace.address.number,        //"1000"
            city: touristPlace.address.city,            //"São Paulo"
            state: touristPlace.address.state,          //"SP"
            country: touristPlace.address.country,      //"Brasil"
            postalcode: touristPlace.address.postalcode //"01310-000"
        }
    };
    
    try {
        const response = await axios.put(endpoint, body, { 
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${my_token}`,
            },
        });

        console.log("Novo local turístico editado com sucesso: ", response.data);
    } catch (error) {
        console.log("Erro ao editar local turístico: ", (error as Error).message);
    }
}

const deleteTouristLocation = async (id: string) => {
    const endpoint = `${API_URL}/tourist-place/${id}`;

    try {
        const response = await axios.delete(endpoint);

        console.log("Local turístico deletado com sucesso: ", response.data);
    } catch (error) {
        console.log("Erro ao deletar local turístico: ", (error as Error).message);
    }
}

const fetchTouristLocationsByUser = async (token: string | null) => {
    if (!token) throw new Error("Token não fornecido.");
    const response = await axios.get(`${API_URL}/users/tourist-places/my-places`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};


export default { fetchTouristLocations, fetchTouristLocationsByUser, createTouristLocation, deleteTouristLocation, updateTouristLocation };