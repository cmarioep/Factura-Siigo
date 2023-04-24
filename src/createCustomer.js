import { customersIdTypes } from './utils/paymentsTypes.js';

const body = `{
    "person_type": "Person", // Person or Company
    "id_type": "13",
    "identification": "28211179",
    "name": [
        "Marcos",
        "Castillo"
    ],
    "address": {
        "address": "Cra. 18 #79A - 42",
        "city": {
            "country_code": "Co",
            "state_code": "11",
            "city_code": "11001"
        }
    },
    "phones": [
        {
            "number": "3006003344"
        }
    ],
    "contacts": [
        {
            "first_name": "Marcos",
            "last_name": "Castillo",
            "email": "marcos.castillo@contacto.com"
        }
    ]
}`

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

const setNewCustomer = ({ person_type, id_type, identification, name, lastName }) => {

    return {
        person_type: customersType[person_type],
        id_type: getIDType(id_type),
        identification: `${identification}`,
        name: setCustomerName(person_type, name, lastName),
    }

}


console.log(
    setNewCustomer(
        {
            person_type: 'Empresa',
            id_type: 'Cédula de ciudadanía',
            identification: 1115064121,
            name: 'Carlos Mario',
            lastName: 'Escandon'
        }
    )
)


