// import { data } from './data/customersData.js';
import { getAllCostumers } from "./getAllCostumers.js";

const data = await getAllCostumers();
console.log(data);

const jsonData = JSON.parse(data);
console.log(jsonData);

const newData = jsonData.results;

async function getCustomerIdByName(name) {
    try {
        let clienteEncontrado = false;
        for (let i = 0; i < newData.length; i++) {
            if (newData[i].name.includes(name)) {
                console.log(newData[i].identification);
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



