// import * as dotenv from 'dotenv';
// dotenv.config();
import { getAuthToken } from './getAuthToken.js';
import { setCustomerData } from './setCustomerData.js';


const rawCustomerData = `{
    "content_res": {
    "result": true,
    "content": [
        {
        "NOMBRE": "CONSULTOR NGS SAS",
        "IDENTIFICACION": 1115064121,
        "DIRECCION": "CALLE 37 # 16-25",
        "CIUDAD": "Bogota D.C.",
        "CODIGO_CIUDAD": 11001,
        "NOMBRE_DEPTO": "Bogota D.C",
        "CODIGO_DEPTO": "11",
        "NOMBRE_REPRESENTANTE": "ALEX MAURICIO",
        "APELLIDO_REPRESENTANTE": "BALAGUERA TRIANA",
        "EMAIL": "consultor@ngs.com",
        "TELEFONO": "3006003344"
        }
    ]
    },
    "session_res": true
}`



async function postNewCustomer(customerData) {

    const accessToken = await getAuthToken();

    const url = 'https://api.siigo.com/v1/customers';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            body: JSON.stringify(customerData)
        });

        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error(error);
    }
}




async function createNewCustomer(rawCustomerData, typeOfCustomer) {

    rawCustomerData = JSON.parse(rawCustomerData);
    rawCustomerData = rawCustomerData.content_res.content[0]

    const customerData = setCustomerData(rawCustomerData, typeOfCustomer)

    console.log(customerData);
    return customerData;

}

// const customersTypes = {
//     Persona: 'Person',
//     Empresa: 'Company'
// }

createNewCustomer(rawCustomerData, 'Company');
