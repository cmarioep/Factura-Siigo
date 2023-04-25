// import * as dotenv from 'dotenv';
// dotenv.config();
import { getAuthToken } from './getAuthToken.js';
import { setCustomerData } from './setCustomerData.js';


const rawCustomerData = `{
    "NIT": 901526685,
    "NOMBRE": "CONSULTOR NGS SAS",
    "DIRECCION": "CALLE 37 # 16-25",
    "CIUDAD": "Bogota D.C.",
    "NOMBRE_REPRESENTANTE": "ALEX MAURICIO",
    "APELLIDO_REPRESENTANTE": "BALAGUERA TRIANA"
}`


const extraData = {
    person_type: 'Empresa',
    id_type: 'NIT',
    phoneNumber: 3006003344,
    email: 'customer@contacto.com'
}



const url = 'https://api.siigo.com/v1/customers';
const accessToken = await getAuthToken();

const customerData = setCustomerData(rawCustomerData, extraData);


const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
    },
    body: JSON.stringify(customerData)
}


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
