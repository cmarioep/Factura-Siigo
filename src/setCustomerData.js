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

const formatCityCode = (cityCode) => {

    const code = cityCode.toString();

    if (code.length < 5) {
        const formatedCode = "0" + code;
        return formatedCode;
    }

    return code;
}



export const setCustomerData = (rawCustomerData, extraCustomerData) => {

    const { NIT, NOMBRE, DIRECCION, CODIGO_CIUDAD, CODIGO_DEPTO, NOMBRE_REPRESENTANTE, APELLIDO_REPRESENTANTE } = rawCustomerData;
    const { person_type, id_type, lastName = '', phoneNumber, email } = extraCustomerData;

    return {
        person_type: customersType[person_type],
        id_type: getIDType(id_type),
        identification: `${NIT}`,
        name: setCustomerName(person_type, NOMBRE, lastName),
        address: {
            address: `${DIRECCION}`,
            city: {
                country_code: "Co",
                state_code: `${CODIGO_DEPTO}`,
                city_code: formatCityCode(CODIGO_CIUDAD)
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







