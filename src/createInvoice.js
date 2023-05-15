import { getCurrentDate } from './utils/getCurrentDate.js';
import { getAuthToken } from './getAuthToken.js';
import { checkCustomer } from './checkCustomer.js';
import { planillaData, getItemsFacturaSiigo } from './getItemsFacturaSiigo.js';


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

    try {
        const { customerId, formatedItems } = await getItemsFacturaSiigo(planilla);

        await checkCustomer(customerId);

        console.log("Cliente verificado, se creara la factura");

    } catch (error) {
        console.error(error);
    }

}

await createInvoice(planillaData);
