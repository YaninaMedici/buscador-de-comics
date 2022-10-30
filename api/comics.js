const baseUrl = "https://gateway.marvel.com/v1/public";
const apikey = "ad0c07cf382bdeb7bad248929fa3e0d6";


const getComics = async () => {
    const response = await fetch(`${baseUrl}/comics?apikey=${apikey}&offset=0&orderBy=title`)
    const data = await response.json()
    return data;
}