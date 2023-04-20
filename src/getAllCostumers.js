import * as dotenv from 'dotenv';

dotenv.config();

async function fetchCustomers() {
    const accessToken = process.env.ACCESS_TOKEN;

    const url = 'https://api.siigo.com/v1/customers';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    });


    const data = await response.text();

    return data;
}

export async function getAllCostumers() {
    try {
        const customers = await fetchCustomers();
        return customers;
    } catch (error) {
        console.error(error);
    }
}


await getAllCostumers();
