import * as dotenv from 'dotenv';
dotenv.config();


async function fetchSiigoData(url) {

    const accessToken = process.env.ACCESS_TOKEN;

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
        const customers = await fetchSiigoData(url);
        return customers;
    } catch (error) {
        console.error(error);
    }
}


