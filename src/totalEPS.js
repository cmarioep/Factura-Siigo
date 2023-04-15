// Definir el JSON
const json = {
    "content_res": [
        {
            "NUMERO_PLANILLA": 1050857206,
            "EMPRESA": "ONIX INC SAS",
            "NIT": 901584854,
            "EPS": "E.P.S Sanitas",
            "NIT_EPS": 800251440,
            "VALOR_EPS": "40.000",
            "ARL": "La Equidad Seguros de Vida",
            "NIT_ARL": 830008686,
            "VALOR_ARL": "5.300",
            "AFP": "Administradora Colombiana de Pensiones Colpensiones",
            "NIT_AFP": 900336004,
            "VALOR_AFP": "160.000",
            "CCF": "Comfenalco Valle",
            "NIT_CCF": 890303093,
            "VALOR_CCF": "40.000",
            "TOTAL_PILA": "245.300"
        },
        {
            "NUMERO_PLANILLA": 1050857206,
            "EMPRESA": "ONIX INC SAS",
            "NIT": 901584854,
            "EPS": "E.P.S Sanitas",
            "NIT_EPS": 800251440,
            "VALOR_EPS": "40.000",
            "ARL": "La Equidad Seguros de Vida",
            "NIT_ARL": 830008686,
            "VALOR_ARL": "43.500",
            "AFP": "Colfondos",
            "NIT_AFP": 800227940,
            "VALOR_AFP": "160.000",
            "CCF": "Comcaja",
            "NIT_CCF": 800231969,
            "VALOR_CCF": "100",
            "TOTAL_PILA": "243.600"
        },
        {
            "NUMERO_PLANILLA": 1050857206,
            "EMPRESA": "ONIX INC SAS",
            "NIT": 901584854,
            "EPS": "E.P.S Sanitas",
            "NIT_EPS": 800251440,
            "VALOR_EPS": "40.000",
            "ARL": "La Equidad Seguros de Vida",
            "NIT_ARL": 830008686,
            "VALOR_ARL": "5.300",
            "AFP": "Administradora Colombiana de Pensiones Colpensiones",
            "NIT_AFP": 900336004,
            "VALOR_AFP": "160.000",
            "CCF": "Comcaja",
            "NIT_CCF": 800231969,
            "VALOR_CCF": "100",
            "TOTAL_PILA": "205.400"
        },
        {
            "NUMERO_PLANILLA": 1050857206,
            "EMPRESA": "ONIX INC SAS",
            "NIT": 901584854,
            "EPS": "Servicio Occidental de Salud S.O.S. S.A.",
            "NIT_EPS": 805001157,
            "VALOR_EPS": "40.000",
            "ARL": "La Equidad Seguros de Vida",
            "NIT_ARL": 830008686,
            "VALOR_ARL": "5.300",
            "AFP": "Porvenir",
            "NIT_AFP": 800224808,
            "VALOR_AFP": "160.000",
            "CCF": "Comcaja",
            "NIT_CCF": 800231969,
            "VALOR_CCF": "100",
            "TOTAL_PILA": "205.400"
        },
    ],
    "session_res": true
}


function sumarValores(json) {
    // Crear un objeto para almacenar las sumas por cada valor en "ARL", "AFP" y "CCF"
    const sumas = { eps: {}, arl: {}, afp: {}, ccf: {}, admon: {} };

    // calcula el valor de "ADMINISTRACION" de acuerdo al numero de usuarios por planilla
    const valorAdmon = 1680.7;
    const totalUsuarios = json.content_res.length
    const totalAdmon = totalUsuarios * valorAdmon;
    const ivaAdmon = totalAdmon * 0.19;

    sumas.admon[json.content_res[0].EMPRESA] = totalAdmon;
    sumas.admon['iva'] = ivaAdmon;


    // Recorrer los objetos en el array "content_res" para obtener los valores de "EPS", "ARL", "AFP" y "CCF"
    json.content_res.forEach(obj => {

        // Sumar los valores por cada valor en "EPS"
        const eps = obj.EPS;
        const valorEps = parseFloat(obj.VALOR_ARL.replace(".", "").replace(",", "."));
        if (sumas.eps[eps]) {
            sumas.eps[eps] += valorEps;
        } else {
            sumas.eps[eps] = valorEps;
        }

        // Sumar los valores por cada valor en "ARL"
        const arl = obj.ARL;
        const valorArl = parseFloat(obj.VALOR_ARL.replace(".", "").replace(",", "."));
        if (sumas.arl[arl]) {
            sumas.arl[arl] += valorArl;
        } else {
            sumas.arl[arl] = valorArl;
        }

        // Sumar los valores por cada valor en "AFP"
        const afp = obj.AFP;
        const valorAfp = parseFloat(obj.VALOR_AFP.replace(".", "").replace(",", "."));
        if (sumas.afp[afp]) {
            sumas.afp[afp] += valorAfp;
        } else {
            sumas.afp[afp] = valorAfp;
        }

        // Sumar los valores por cada valor en "CCF"
        const ccf = obj.CCF;
        const valorCcf = parseFloat(obj.VALOR_EPS.replace(".", "").replace(",", "."));
        if (sumas.ccf[ccf]) {
            sumas.ccf[ccf] += valorCcf;
        } else {
            sumas.ccf[ccf] = valorCcf;
        }
    });

    return sumas;
}

const resultado = sumarValores(json);
console.log(resultado);

