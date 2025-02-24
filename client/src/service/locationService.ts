import axios from "axios";

const API_IBGE = "https://servicodados.ibge.gov.br/api/v1/localidades";
const API_COUNTRIES = "https://restcountries.com/v3.1/all";

export interface Country {
    name: string;
    code: string;
}

export interface State {
    name: string;
    code: string;
}

const locationService = {
    getCountries: async (): Promise<Country[]> => {
        const response = await axios.get(API_COUNTRIES);
        return response.data.map((country: { name: { common: string }; cca2: string }) => ({
            name: country.name.common,
            code: country.cca2,
        }));
    },

    getStates: async (): Promise<State[]> => {
        const response = await axios.get(`${API_IBGE}/estados`);
        return response.data.map((state: { nome: string; sigla: string }) => ({
            name: state.nome,
            code: state.sigla,
        }));
    },

    getCities: async (stateCode: string): Promise<string[]> => {
        const response = await axios.get(`${API_IBGE}/estados/${stateCode}/municipios`);
        return response.data.map((city: { nome: string }) => city.nome);
    },
};


export default locationService;
