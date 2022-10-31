const apikey = '26a7a8acd5fe326ac4725819538ebf98';
const apiPrivate = '36e9d123cce0e5998a27a9394da7867691023eb9';
const baseUrl = `https://gateway.marvel.com/v1/public/`

const getComics = async (offset, orderBy) => {
    const response = await fetch(`${baseUrl}/comics?&apikey=${apikey}&offset=${offset}&orderBy=${orderBy}`)

    const data = await response.json()
    return data;
}


// let url 
// if(searchType.value === 'comics'){
//     if(searchInput == ""){
//         url = `${baseUrl}/comics?&offset=${offset}&orderBy=${orderBy}&apikey=${apikey}`

// }
//     }else{
//     url = `${baseUrl}/comics?&titleStartsWith=${searchInput}&offset=${offset}&orderBy=${orderBy}&apikey=${apikey}`

// }

