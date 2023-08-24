const customersIdTypes = {
    'CC': '13', // Cédula de ciudadanía
    'NI': '31', // NIT
    'CE': '22', // Cédula de extranjería
    'Documento de identificación extranjero': '42',
    'NIT de otro país': '50',
    'No obligado a registrarse en el RUT PN': 'R-00-PN',
    'NUIP': '91',
    'PA': '41', // Pasaporte
    'PE': '47', // Permiso especial de permanencia
    'Registro civil': '11',
    'Sin identificación del exterior o para uso definido por la DIAN': '43',
    'Tarjeta de extranjería': '21',
    'Tarjeta de identidad': '12'
}


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

    const { NOMBRE, TIPO_IDENTIFICACION, NIT, DIRECCION, CODIGO_CIUDAD, CODIGO_DEPTO, NOMBRE_REPRESENTANTE, APELLIDO_REPRESENTANTE, EMAIL, TELEFONO } = rawCustomerData;


    return {
        person_type: setPersonType(TIPO_IDENTIFICACION),
        id_type: getIDType(TIPO_IDENTIFICACION),
        identification: `${NIT}`,
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







