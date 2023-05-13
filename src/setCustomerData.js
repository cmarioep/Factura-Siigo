import { customersIdTypes } from './utils/paymentsTypes.js';


const getIDType = (id_type) => {
    return customersIdTypes[id_type];
}


const setCustomerName = (person_type, name, lastName) => {

    const customerName = [];

    if (person_type === 'Person') {
        customerName.push(name);
        customerName.push(lastName);
        return customerName;
    }

    if (person_type === 'Company') {
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



export const setCustomerData = (rawCustomerData, typeOfCustomer, identificationType = 'NIT' ) => {

    const { NOMBRE, IDENTIFICACION, DIRECCION, CODIGO_CIUDAD, CODIGO_DEPTO, NOMBRE_REPRESENTANTE, APELLIDO_REPRESENTANTE, EMAIL, TELEFONO } = rawCustomerData;

    const person_type= typeOfCustomer;
    const id_type= identificationType;
    const lastName = '';

    return {
        person_type: typeOfCustomer,
        id_type: getIDType(id_type),
        identification: `${IDENTIFICACION}`,
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
                number: `${TELEFONO}`
            }
        ],
        contacts: [
            {
                first_name: `${NOMBRE_REPRESENTANTE}`,
                last_name: `${APELLIDO_REPRESENTANTE}`,
                email: `${EMAIL}`
            }
        ]
    }
}







