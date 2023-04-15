import * as dotenv from 'dotenv';
dotenv.config();


async function fetchCustomers() {
    const accessToken = process.env.ACCESS_TOKEN;

    const url = 'https://api.siigo.com/v1/customers';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': accessToken
        }
    });

    const data = await response.json();

    return data;
}

async function getData() {
    try {
        const customers = await fetchCustomers();
        console.log(customers);
    } catch (error) {
        console.error(error);
    }
}

getData();
