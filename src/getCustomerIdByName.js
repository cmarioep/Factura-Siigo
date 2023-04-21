// import { data } from './data/customersData.js';
import { getAllCostumers } from "./getAllCostumers.js";


async function getCustomerIdByName(name) {

    const data = await getAllCostumers();

    try {
        let clienteEncontrado = false;
        for (let i = 0; i < data.length; i++) {
            if (data[i].name.includes(name)) {
                console.log(data[i].identification);
                clienteEncontrado = true;
            }
        }
        if (!clienteEncontrado) {
            console.log('No se encuentra el Cliente');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

getCustomerIdByName('MARTHA LUCIA');



