import { getSiigoData } from "./getSiigoData.js";


async function getCustomerByIdentification(identification) {

    const customersUrl = 'https://api.siigo.com/v1/customers';

    const customers = await getSiigoData(customersUrl);

    try {
        let clienteEncontrado = false;
        for (let i = 0; i < customers.length; i++) {
            if (customers[i].identification.includes(identification)) {
                clienteEncontrado = true;
                console.log('Cliente existente');
                return true;
            }
        }
        if (!clienteEncontrado) {
            console.log('No se encuentra el Cliente');
            return false;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

await getCustomerByIdentification(16751985);



