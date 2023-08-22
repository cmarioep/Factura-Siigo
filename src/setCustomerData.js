import { customersIdTypes } from './utils/paymentsTypes.js';


const getIDType = (identificationType) => {
    return customersIdTypes[identificationType];
}


const setPersonType = (identificationType) => {

    if (identificationType === 'NI') {
        return 'Company';
    } else {
        return 'Person';
    }
}


const setCustomerName = (identificationType, name, lastName) => {


    const customerName = [];

    const personType = setPersonType(identificationType);

    if (personType === 'Person') {
        customerName.push(name);
        customerName.push(lastName);
        return customerName;
    }

    if (personType === 'Company') {
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



export const setCustomerData = (rawCustomerData) => {

    const { NOMBRE, TIPO_IDENTIFICACION, IDENTIFICACION, DIRECCION, CODIGO_CIUDAD, CODIGO_DEPTO, NOMBRE_REPRESENTANTE, APELLIDO_REPRESENTANTE, EMAIL, TELEFONO } = rawCustomerData;


    return {
        person_type: setPersonType(TIPO_IDENTIFICACION),
        id_type: getIDType(TIPO_IDENTIFICACION),
        identification: `${IDENTIFICACION}`,
        name: setCustomerName(TIPO_IDENTIFICACION, NOMBRE, APELLIDO_REPRESENTANTE),
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







