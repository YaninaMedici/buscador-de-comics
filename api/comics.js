const baseUrl = `https://gateway.marvel.com/v1/public`;
const apikey = "ad0c07cf382bdeb7bad248929fa3e0d6";
const apiPrivate = '647db36cd1ad69c1263e719c49cc462cd0bd8519';

const getComics = async (offset, orderBy) => {
    const response = await fetch(`${baseUrl}/comics?orderBy=${orderBy}&offset=${offset}&apikey=${apikey}`)
    const data = await response.json()
    return data;
}

            //https://gateway.marvel.com/v1/public/comics?orderBy=title&offset=20&apikey=

// let url 
// if(searchType.value === 'comics'){
//     if(searchInput == ""){
//         url = `${baseUrl}/comics?&offset=${offset}&orderBy=${orderBy}&apikey=${apikey}`

// }
//     }else{
//     url = `${baseUrl}/comics?&titleStartsWith=${searchInput}&offset=${offset}&orderBy=${orderBy}&apikey=${apikey}`

// }

//https://gateway.marvel.com/v1/public//comics?&apikey=26a7a8acd5fe326ac4725819538ebf98&offset=0&orderBy=title
//https://gateway.marvel.com/v1/public/comics?apikey=ad0c07cf382bdeb7bad248929fa3e0d6&offset=0&orderBy=title
//https://gateway.marvel.com/v1/public/comics?apikey=ad0c07cf382bdeb7bad248929fa3e0d6&offset=20&orderBy=title
//https://gateway.marvel.com/v1/public/comics?orderBy=title&offset=20&apikey=