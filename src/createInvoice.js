import { getCurrentDate } from './utils/getCurrentDate.js';
import { getAuthToken } from './getAuthToken.js';
import { getCustomerByIdentification } from './getCustomerByIdentification.js';
import { planillaData, getItemsFacturaSiigo } from './getItemsFacturaSiigo.js';


const setInvoiceBody = (isCustomerRegistered, customer, items) => {

    if (isCustomerRegistered) {
        const body = {
            "document": {
                // tipo de comprobante Factura electrónica de venta
                "id": 38315
            },
            "date": `${date}`,
            "customer": {
                "identification": `${customer}`,
                "branch_office": "0"
            },
            // id Esperanza Bermudez
            "seller": 40,
            "items": items,
            "payments": [
                {
                    "id": 8604,
                    "value": paymentVlaue
                }
            ]
        }

        return body;


    } else {
        const body = {
            "document": {
                // tipo de comprobante Factura electrónica de venta
                "id": 38315
            },
            "date": `${date}`,
            // id Esperanza Bermudez
            "seller": 40,
            "items": items,
            "payments": [
                {
                    "id": 8604,
                    "value": paymentVlaue
                }
            ]
        }

        return body;
    }


}


async function postInvoice(customer, items) {

    const accessToken = await getAuthToken();

    const paymentVlaue = items.reduce((acc, item) => acc + item.total, 0);

    const date = getCurrentDate();

    const url = 'https://api.siigo.com/v1/invoices';

    const body = {
        "document": {
            // tipo de comprobante Factura electrónica de venta
            "id": 38315
        },
        "date": `${date}`,
        "customer": {
            "identification": `${customer}`,
            "branch_office": "0"
        },
        // id Esperanza Bermudez
        "seller": 40,
        "items": items,
        "payments": [
            {
                "id": 8604,
                "value": paymentVlaue
            }
        ]
    }

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
async function createInvoice(planilla) {

    const { customerId, formatedItems } = await getItemsFacturaSiigo(planilla);

    console.log('Cliente ID:', customerId);

    const isCustomerRegistered = await getCustomerByIdentification(customerId);

    if (isCustomerRegistered) {
        try {
            const result = await postInvoice(customerId, formatedItems);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log('No se encuentra el cliente');
        return;
    }

}

await createInvoice(planillaData);
