import * as dotenv from 'dotenv';
dotenv.config();

async function postInvoice() {

    const accessToken = process.env.ACCESS_TOKEN;

    const url = 'https://api.siigo.com/v1/invoices';

    const body = {
        "document": {
            // tipo de comprobante Factura electrónica de venta
            "id": 38315
        },
        "date": "2020-02-04",
        "customer": {
            "identification": "38876427",
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
async function createInvoice() {
    try {
        const result = await postInvoice();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

createInvoice();
