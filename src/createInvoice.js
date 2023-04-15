import * as dotenv from 'dotenv';
dotenv.config();

async function postInvoice() {

    const accessToken = process.env.ACCESS_TOKEN;

    const url = 'https://api.siigo.com/v1/invoices';

    const body = {
        "document": {
            "id": 24446
        },
        "date": "2020-02-04",
        "customer": {
            "identification": "209048401",
            "branch_office": "0"
        },
        "seller": 629,
        "items": [
            {
                "code": "Sku-1",
                "description": "Sku-1",
                "quantity": 1,
                "taxes": [
                    {
                        "id": 13156
                    },
                    {
                        "id": 21479
                    }
                ],
                "price": 847.45
            }
        ],
        "payments": [
            {
                "id": 5638,
                "value": 1000,
                "due_date": "2022-05-08"
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
