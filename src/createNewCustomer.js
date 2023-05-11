// import * as dotenv from 'dotenv';
// dotenv.config();
import { getAuthToken } from './getAuthToken.js';
import { setCustomerData } from './setCustomerData.js';


const rawCustomerData = `{
    "content_res": {
        "result": true,
        "content": [
            {
                "NIT": 901584854,
                "NOMBRE": "ONIX INC SAS",
                "DIRECCION": "CL 6 #13 - 20",
                "CIUDAD": "Buga",
                "NOMBRE_REPRESENTANTE": "ESMERALDA",
                "APELLIDO_REPRESENTANTE": "CORREA"
            }
        ]
    },
    "session_res": true
}`


const extraData = {
    person_type: 'Empresa',
    id_type: 'NIT',
    phoneNumber: 3006003344,
    email: 'customer@contacto.com'
}





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




async function createNewCustomer(rawCustomerData, extraCustomerData) {

    rawCustomerData = JSON.parse(rawCustomerData);
    rawCustomerData = rawCustomerData.content_res.content[0]

    const customerData = setCustomerData(rawCustomerData, extraCustomerData)

    console.log(customerData);
    return customerData;


}

createNewCustomer(rawCustomerData, extraData);
