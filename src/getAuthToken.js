const url = 'https://api.siigo.com/auth';

const body = {
    "username": "contabilidadyfinanzasgr@gmail.com",
    "access_key": "MGQwOTkxM2ItZDA0MC00ZjZlLTg5NTktMjZiMjZiNGY1MmNlOjA2Y1FmNkBPQ0g="
}

let authToken = null;
let authTokenExpiresAt = null;


export async function getAuthToken() {
    if (authToken && authTokenExpiresAt > Date.now()) {
        // Token válido en caché, retornarlo directamente
        console.log('Token válido en caché');
        return authToken;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });

        const json = await response.json();
        authToken = json.access_token;
        authTokenExpiresAt = Date.now() + json.expires_in * 1000;

        return authToken;

    } catch (err) {
        console.error(err);
        throw new Error('Error al obtener el token de autenticación');
    }
}

// console.log(await getAuthToken());