

const getComics = async (offset, orderBy) => {
    const response = await fetch(`${baseUrl}/comics?apikey=${apiKey}&offset=${offset}&orderBy=${orderBy}`)
    const data = await response.json()
    return data;
}

