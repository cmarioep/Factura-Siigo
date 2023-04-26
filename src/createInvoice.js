import { getCurrentDate } from './utils/getCurrentDate.js';
import { getAuthToken } from './getAuthToken.js';
import { getCustomerByIdentification } from './getCustomerByIdentification.js';


async function postInvoice(customerId) {

    const date = getCurrentDate();

    const accessToken = await getAuthToken();

    const url = 'https://api.siigo.com/v1/invoices';

    const body = {
        "document": {
            // tipo de comprobante Factura electrónica de venta
            "id": 38315
        },
        "date": `${date}`,
        "customer": {
            "identification": `${customerId}`,
            "branch_office": "0"
        },
        // id Esperanza Bermudez
        "seller": 40,
        "items": [
            {
                "code": "02",
                "description": "PAGO A AFP",
                "quantity": 1,
                "price": 847.45
            }
        ],
        "payments": [
            {
                "id": 8604,
                "value": 847.45
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

// Llamamos a la función postInvoice para enviar la solicitud POST
async function createInvoice(customerId) {

    console.log('Cliente ID:', customerId);

    const customerExists = await getCustomerByIdentification(customerId);

    if (customerExists) {
        try {
            const result = await postInvoice(customerId);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log('No se encuentra el cliente');
        return;
    }


}

await createInvoice(714523698);
