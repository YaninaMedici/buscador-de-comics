const getCharacters = async () =>{
    const response = await fetch(`${baseUrl}/characters?apikey=${apikey}&offset=0`);
    const data = await response.json();
    return data
    
}

