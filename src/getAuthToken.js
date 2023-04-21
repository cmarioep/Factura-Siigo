const url = 'https://api.siigo.com/auth';

const body = {
    "username": "contabilidadyfinanzasgr@gmail.com",
    "access_key": "MGQwOTkxM2ItZDA0MC00ZjZlLTg5NTktMjZiMjZiNGY1MmNlOjA2Y1FmNkBPQ0g="
}


async function getAuthToken() {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });

        const json = await response.json();
        console.log(json.access_token);
    } catch (err) {
        console.error(err);
    }
}

getAuthToken();