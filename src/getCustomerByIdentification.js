import { getSiigoData } from "./getSiigoData.js";


export const getCustomerByIdentification = async (identification) => {

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
            return false;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

// console.log(await getCustomerByIdentification(900266167) )

