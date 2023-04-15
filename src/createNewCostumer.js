import * as dotenv from 'dotenv';
dotenv.config();


const url = 'https://api.siigo.com/v1/customers';


const accessToken = process.env.ACCESS_TOKEN;


const customerData = {
    "person_type": "Person",
    "id_type": "13",
    "identification": "1115064121",
    "name": [
        "Marcos",
        "Castillo"
    ],
    "address": {
        "address": "Cra. 18 #79A - 42",
        "city": {
            "country_code": "Co",
            "state_code": "11",
            "city_code": "11001"
        }
    },
    "phones": [
        {
            "number": "3006003344"
        }
    ],
    "contacts": [
        {
            "first_name": "Marcos",
            "last_name": "Castillo",
            "email": "marcos.castillo@contacto.com"
        }
    ]
}


const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
    },
    body: JSON.stringify(customerData)
};


async function createNewCustomer() {
    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

createNewCustomer();
