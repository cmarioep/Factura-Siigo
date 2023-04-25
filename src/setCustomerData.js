import { customersIdTypes } from './utils/paymentsTypes.js';


const getIDType = (id_type) => {
    return customersIdTypes[id_type];
}


const customersType = {
    Persona: 'Person',
    Empresa: 'Company'
}


const setCustomerName = (person_type, name, lastName) => {

    const customerName = [];

    if (person_type === 'Persona') {
        customerName.push(name);
        customerName.push(lastName);
        return customerName;
    }

    if (person_type === 'Empresa') {
        customerName.push(name);
        return customerName;
    }
}


export const setCustomerData = (rawCustomerData, { person_type, id_type, lastName= '', phoneNumber, email}) => {

    const customerData = JSON.parse(rawCustomerData);

    const { NIT, NOMBRE, DIRECCION, NOMBRE_REPRESENTANTE, APELLIDO_REPRESENTANTE } = customerData;

    return {
        person_type: customersType[person_type],
        id_type: getIDType(id_type),
        identification: `${NIT}`,
        name: setCustomerName(person_type, NOMBRE, lastName),
        address: {
            address: `${DIRECCION}`,
            city: {
                country_code: "Co",
                state_code: "11",
                city_code: "11001"
            }
        },
        phones: [
            {
                number: `${phoneNumber}`
            }
        ],
        contacts: [
            {
                first_name: `${NOMBRE_REPRESENTANTE}`,
                last_name: `${APELLIDO_REPRESENTANTE}`,
                email: `${email}`
            }
        ]
    }
}


// console.log(setCustomerData(rawCustomerData, extraData));




// const body = `{
//     "person_type": "Person", // Person or Company
//     "id_type": "13",
//     "identification": "28211179",
//     "name": [
//         "Marcos",
//         "Castillo"
//     ],
//     "address": {
//         "address": "Cra. 18 #79A - 42",
//         "city": {
//             "country_code": "Co",
//             "state_code": "11",
//             "city_code": "11001"
//         }
//     },
//     "phones": [
//         {
//             "number": "3006003344"
//         }
//     ],
//     "contacts": [
//         {
//             "first_name": "Marcos",
//             "last_name": "Castillo",
//             "email": "marcos.castillo@contacto.com"
//         }
//     ]
// }`






