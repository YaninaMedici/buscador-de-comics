const baseUrl = "https://gateway.marvel.com/v1/public";
const apikey = "ad0c07cf382bdeb7bad248929fa3e0d6";
// const apiPrivate = '647db36cd1ad69c1263e719c49cc462cd0bd8519';

const getComics = async (page, orderBy) => {

    const offset = (page - 1) * 20; // para avanzar de a 20 comics // cuando page es 1, -1 va a ser 0, 0 * 20 es 0

    const response = await fetch(`${baseUrl}/comics?&apikey=${apikey}&offset=${offset}&orderBy=${orderBy}`)

    const data = await response.json()
    return data;
}
