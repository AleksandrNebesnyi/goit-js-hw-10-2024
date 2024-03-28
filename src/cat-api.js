import axios from 'axios';

axios.defaults.headers.common["x-api-key"] = "live_6Zxx3ZSWz1img07wDHFVSpUljjzJxnw9Ce2qtd9doWoGPmVHh1b37lNhRoAhipYs";
const BASE_URL='https://api.thecatapi.com/v1';

async function fetchBreeds(){
    try {
         const response = await axios.get( BASE_URL+`/breeds`);
        return response.data;
       
    } catch (error) {
        return console.error(error);
    }
};


async function fetchBreedById(id) {
    try {
        const response = await axios.get(BASE_URL+`/images/search?breed_ids=${id}`);
        return response.data;

    } catch (error) {
        console.error(error.message);
     }
    };

export{ fetchBreeds,fetchBreedById};



