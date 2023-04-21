import { getSiigoData } from "./getSiigoData.js";


async function getProductsCodeByName(name) {

    const productsUrl = 'https://api.siigo.com/v1/products';

    const products = await getSiigoData(productsUrl);

    try {
        let productFound = false;
        for (let i = 0; i < products.length; i++) {
            if (products[i].name.includes(name)) {
                console.log(products[i].code);
                productFound = true;
            }
        }
        if (!productFound) {
            console.log('No se encuentra el Producto');
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

getProductsCodeByName('PAGO A EPS');



