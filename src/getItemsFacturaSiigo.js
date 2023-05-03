

export const planillaData = {
    "content_res": [
        {
            "NUMERO_PLANILLA": 1050857206,
            "EMPRESA": "ONIX INC SAS",
            "NIT": 900266167, // Dummy data, real data is 901584854
            "SUB_SISTEMA_EPS": "EPS",
            "NIT_EPS": 800251440,
            "EPS": "E.P.S Sanitas",
            "VALOR_EPS": "40.000",
            "SUB_SISTEMA_ARL": "ARL",
            "NIT_ARL": 830008686,
            "ARL": "La Equidad Seguros de Vida",
            "VALOR_ARL": "5.300",
            "SUB_SISTEMA_AFP": "AFP",
            "NIT_AFP": 900336004,
            "AFP": "Administradora Colombiana de Pensiones Colpensiones",
            "VALOR_AFP": "160.000",
            "SUB_SISTEMA_CCF": "CCF",
            "NIT_CCF": 890303093,
            "CCF": "Comfenalco Valle",
            "VALOR_CCF": "40.000",
            "TOTAL_PILA": "245.300"
        },
        {
            "NUMERO_PLANILLA": 1050857206,
            "EMPRESA": "ONIX INC SAS",
            "NIT": 901584854,
            "SUB_SISTEMA_EPS": "EPS",
            "NIT_EPS": 800251440,
            "EPS": "E.P.S Sanitas",
            "VALOR_EPS": "40.000",
            "SUB_SISTEMA_ARL": "ARL",
            "NIT_ARL": 830008686,
            "ARL": "La Equidad Seguros de Vida",
            "VALOR_ARL": "43.500",
            "SUB_SISTEMA_AFP": "AFP",
            "NIT_AFP": 800227940,
            "AFP": "Colfondos",
            "VALOR_AFP": "160.000",
            "SUB_SISTEMA_CCF": "CCF",
            "NIT_CCF": 800231969,
            "CCF": "Comcaja",
            "VALOR_CCF": "100",
            "TOTAL_PILA": "243.600"
        },
        {
            "NUMERO_PLANILLA": 1050857206,
            "EMPRESA": "ONIX INC SAS",
            "NIT": 901584854,
            "SUB_SISTEMA_EPS": "EPS",
            "NIT_EPS": 800249241,
            "EPS": "Cooperativa de Salud y Desarrollo Integral de la Zona Sur Oriental de Cartagena Ltda.  Coosalud E.S.S.",
            "VALOR_EPS": "40.000",
            "SUB_SISTEMA_ARL": "ARL",
            "NIT_ARL": 830008686,
            "ARL": "La Equidad Seguros de Vida",
            "VALOR_ARL": "24.400",
            "SUB_SISTEMA_AFP": "AFP",
            "NIT_AFP": 800224808,
            "AFP": "Porvenir",
            "VALOR_AFP": "160.000",
            "SUB_SISTEMA_CCF": "CCF",
            "NIT_CCF": 800231969,
            "CCF": "Comcaja",
            "VALOR_CCF": "100",
            "TOTAL_PILA": "224.500"
        },
    ],
    "session_res": true
}



// procesa el objeto y extrae las propiedades correspondientes al tipo de pago.
const agregaritems = async (tipo, obj, items) => {
    const nombre = obj[tipo];
    const precio = parseFloat(obj[`VALOR_${tipo}`].replace(".", "").replace(",", "."));
    const subSistema = obj[`SUB_SISTEMA_${tipo}`];
    const nit = obj[`NIT_${tipo}`];
    const valorActual = items.find(valor => valor.nombre === nombre);

    const itemDescription = `PAGO A ${subSistema}: ${nombre}`;

    // Si el tipo de pago ya existe en el arreglo de items, se actualiza el valor correspondiente.
    if (valorActual) {
        valorActual.price += precio;
        valorActual.total += precio;
        // Si no existe, se agrega un nuevo objeto con los items correspondientes.
    } else {

        items.push({
            nombre: nombre,
            code: `${nit}`,
            description: itemDescription,
            quantity: 1,
            price: precio,
            total: precio
        });
    }

}

// calcula el valor de "ADMINISTRACION" de acuerdo al numero de usuarios por planilla
const agregarValorAdmon = async (json, items) => {
    const valorPorUsuario = 1681;
    const totalUsuarios = json.content_res.length
    const valorAdmon = totalUsuarios * valorPorUsuario;
    const valorIva = valorAdmon * 0.19;


    items.push({
        nombre: 'ADMINISTRACION',
        code: '05',
        description: `ADMINISTRACION: Mercado y Pagos NIT: 9013561116`,
        quantity: totalUsuarios,
        price: parseFloat(valorPorUsuario.toFixed(2)),
        taxes: [
            {
                id: 808,
                name: "IVA 19%",
                type: "IVA",
                percentage: 19,
                value: parseFloat(valorIva.toFixed(2))
            }
        ],
        total: valorAdmon + valorIva

    });
}

// Función principal para la lista de planillas de pago que extraer los valores correspondientes de los items
export const getItemsFacturaSiigo = async (json) => {

    const customerId = json.content_res[0].NIT;

    const items = [];

    for (const obj of json.content_res) {
        await agregaritems("EPS", obj, items);
        await agregaritems("ARL", obj, items);
        await agregaritems("AFP", obj, items);
        await agregaritems("CCF", obj, items);
    }

    await agregarValorAdmon(json, items);

    const formatedItems = items.map(obj => {
        const { nombre, ...rest } = obj; // desestructuración para omitir "nombre"
        return rest; // retorna un nuevo objeto sin la clave "nombre"
    });

    return { customerId, formatedItems };

}



// console.log(await getItemsFacturaSiigo(planillaData));