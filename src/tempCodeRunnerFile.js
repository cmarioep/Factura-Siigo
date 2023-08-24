// import * as dotenv from 'dotenv';
// dotenv.config();
import { getAuthToken } from './getAuthToken.js';
import { setCustomerData } from './setCustomerData.js';


const customerData = {
    result: true,
    content: [
        {
            NOMBRE: 'GESTION LOGISTICA INTEGRAL S.A.S',
            TIPO_IDENTIFICACION: 'NI',
            NIT: 901487064,
            DIGITO_VERIFICACION_EMPLEADOR: 1,
            DIRECCION: 'AV 6 OESTE 32 25',
            CIUDAD: 'Cali',
            CODIGO_CIUDAD: 76001,
            DEPARTAMENTO: 'Valle del Cauca',
            CODIGO_DEPTO: '76',
            NOMBRE_REPRESENTANTE: 'QUINTERO FRANCO',
            APELLIDO_REPRESENTANTE: 'LINA VIVIANA',
            EMAIL: 'gestionlogisticaintegralsas@gmail.com',
            TELEFONO: '3225939366'
        }
    ]
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




async function createNewCustomer(rawCustomerData) {

    rawCustomerData = rawCustomerData.content[0]

    const customerData = setCustomerData(rawCustomerData)

    console.log(customerData);
    return customerData;

}


createNewCustomer(customerData);
