import { getSiigoData } from "./getSiigoData.js";


export async function getProductsCodeByName(name) {

    const productsUrl = 'https://api.siigo.com/v1/products';

    const products = await getSiigoData(productsUrl);


    try {
        let productFound = false;
        for (let i = 0; i < products.length; i++) {
            if (products[i].name.includes(name)) {
                productFound = true;
                return (products[i].code);
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

await getProductsCodeByName('ADMINISTRACION')


