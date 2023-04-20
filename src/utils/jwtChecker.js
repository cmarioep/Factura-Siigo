import * as dotenv from 'dotenv';
dotenv.config();

const accessToken = process.env.ACCESS_TOKEN;


function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(Buffer.from(base64, 'base64').toString());
};


function isTokenActive(token) {
    const decoded = parseJwt(token);
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp < now) {
        return false; // El token ha expirado
    }
    if (decoded.nbf > now) {
        return false; // El token aún no es válido
    }
    return true; // El token está activo
}


console.log(isTokenActive(accessToken));