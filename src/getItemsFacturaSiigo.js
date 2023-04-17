
const json = {
    "content_res": [
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
const agregaritems = (tipo, obj, items) => {
    const nombre = obj[tipo];
    const precio = parseFloat(obj[`VALOR_${tipo}`].replace(".", "").replace(",", "."));
    const subSistema = obj[`SUB_SISTEMA_${tipo}`];
    const nit = obj[`NIT_${tipo}`];
    const valorActual = items.find(valor => valor.nombre === nombre);

    // Si el tipo de pago ya existe en el arreglo de items, se actualiza el valor correspondiente.
    if (valorActual) {
        valorActual.valor += precio;
    // Si no existe, se agrega un nuevo objeto con los items correspondientes.
    } else {
        items.push({
            tipo: `Pago a ${subSistema}`,
            id: nit,
            nombre: nombre,
            valor: precio,
            iva: 0,
            totalIva: 0,
            totalValor: precio

        });
    }
}

// calcula el valor de "ADMINISTRACION" de acuerdo al numero de usuarios por planilla
const agregarValorAdmon = (json, items) => {
    const valorPorUsuario = 1680.7;
    const iva = 0.19;
    const totalUsuarios = json.content_res.length
    const valorAdmon = totalUsuarios * valorPorUsuario;
    const ivaAdmon = valorAdmon * iva;
    const totalAdmon = valorAdmon + ivaAdmon;

    items.push({
        tipo: `ADMINISTRACION`,
        id: 901156656,
        nombre: 'Mercado y Pagos',
        valor: valorAdmon.toFixed(2),
        iva,
        totalIva: ivaAdmon.toFixed(2),
        totalValor: totalAdmon.toFixed(2)

    });
}

// Función principal para la lista de planillas de pago que extraer los valores correspondientes de los items
const getItemsFacturaSiigo = (json) => {

    const items = [];

    json.content_res.forEach(obj => {
        agregaritems("EPS", obj, items);
        agregaritems("ARL", obj, items);
        agregaritems("AFP", obj, items);
        agregaritems("CCF", obj, items);
    });

    agregarValorAdmon(json, items);

    return items;

}


console.log(getItemsFacturaSiigo(json));