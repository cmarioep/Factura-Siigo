import { getAuthToken } from './getAuthToken.js';


async function fetchSiigoData(url) {

    const accessToken = await getAuthToken();

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    });

    let data = await response.text();
    data = JSON.parse(data);

    return data.results;
}


export async function getSiigoData(url) {
    try {
        const data = await fetchSiigoData(url);
        return data;
    } catch (error) {
        console.error(error);
    }
}


