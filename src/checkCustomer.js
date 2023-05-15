import { getSiigoData } from "./getSiigoData.js";


const getCustomerByIdentification = async (identification) => {

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

export const checkCustomer = async (customerIdentificacion) => {
	console.log("Verificacndo Cliente ID:", customerIdentificacion);

	const customerExists = await getCustomerByIdentification(customerIdentificacion);

	if (customerExists) {
		console.log("Cliente existente");
		return;
	} else {
		console.log("El cliente no existe");
		return new Error("El cliente no existe");
	}
};


// console.log(await getCustomerByIdentification(900266167) )

