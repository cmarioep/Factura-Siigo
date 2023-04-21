import * as dotenv from 'dotenv';
dotenv.config();

const productsUrl = 'https://api.siigo.com/v1/products';


async function fetchCustomers(url) {
    console.log(url);

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
        const customers = await fetchCustomers(url);
        return customers;
    } catch (error) {
        console.error(error);
    }
}


console.log(await getSiigoData(productsUrl));