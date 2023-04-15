export const data = `
{
    "pagination": {
        "page": 1,
        "page_size": 25,
        "total_results": 187
    },
    "results": [
        {
            "id": "e33e050a-7e03-4873-9b25-758bcead755e",
            "type": "Customer",
            "person_type": "Company",
            "id_type": {
                "code": "31",
                "name": "NIT"
            },
            "identification": "901543761",
            "branch_office": 0,
            "check_digit": "4",
            "name": [
                "EPS Familiar de Colombia S.A.S."
            ],
            "active": true,
            "vat_responsible": false,
            "address": {
                "address": ""
            },
            "contacts": [],
            "metadata": {
                "created": "2023-03-17T10:06:48.617"
            }
        },
        {
            "id": "ee51935b-d264-4f80-a0e0-e295d5b734b9",
            "type": "Customer",
            "person_type": "Person",
            "id_type": {
                "code": "13",
                "name": "Cédula de ciudadanía"
            },
            "identification": "38876427",
            "branch_office": 0,
            "check_digit": "9",
            "name": [
                "MARTHA LUCIA",
                "GARCIA GARZON"
            ],
            "active": true,
            "vat_responsible": false,
            "fiscal_responsibilities": [
                {
                    "code": "R-99-PN",
                    "name": "No aplica - Otros"
                }
            ],
            "address": {
                "address": "CL 7A SUR 16 07"
            },
            "phones": [
                {
                    "number": "3154111589"
                }
            ],
            "contacts": [
                {
                    "first_name": "MARTHA LUCIA",
                    "last_name": "GARCIA GARZON",
                    "email": "gerentecomercial@talentoscompany.com",
                    "phone": {}
                },
                {
                    "first_name": "CONTABILIDAD",
                    "last_name": "MERCADO Y PAGOS",
                    "email": "contabilidadyfinanzasgr@gmail.com",
                    "phone": {
                        "indicative": "57",
                        "number": "3170119813"
                    }
                }
            ],
            "metadata": {
                "created": "2022-12-30T18:30:26.04"
            }
        },
        {
            "id": "ced90e72-85dd-454c-a4dc-c33b61fe44f4",
            "type": "Customer",
            "person_type": "Person",
            "id_type": {
                "code": "13",
                "name": "Cédula de ciudadanía"
            },
            "identification": "31658625",
            "branch_office": 0,
            "check_digit": "0",
            "name": [
                "JENNY CAROLINA",
                "BEDOYA RODRIGUEZ"
            ],
            "active": true,
            "vat_responsible": false,
            "fiscal_responsibilities": [
                {
                    "code": "R-99-PN",
                    "name": "No aplica - Otros"
                }
            ],
            "address": {
                "address": "CL 6 13 20"
            },
            "phones": [
                {
                    "indicative": "602",
                    "number": "3152512501"
                }
            ],
            "contacts": [
                {
                    "first_name": "JENNY CAROLINA",
                    "last_name": "BEDOYA RODRIGUEZ",
                    "email": "asesoriasgrup@gmail.com",
                    "phone": {}
                }
            ],
            "metadata": {
                "created": "2022-12-29T22:38:08.6"
            }
        }
    ],
    "_links": {
        "self": {
            "href": "https://api.siigo.com/v1/customers?limit=%3Fcreated_start%3D2023-03-15&page=1&page_size=25"
        },
        "next": {
            "href": "https://api.siigo.com/v1/customers?limit=%3Fcreated_start%3D2023-03-15&page=2&page_size=25"
        }
    }
}`