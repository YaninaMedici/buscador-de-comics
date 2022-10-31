const getCharacters = async (offset, orderBy) =>{     
 
   
    const response = await fetch(`${baseUrl}/characters?apikey=${apikey}&offset=${offset}&orderBy=${orderBy}`);
    const data = await response.json();
    return data
    
}

// if(searchInput.length > 1){
//   url = `${baseUrl}/characters?apikey=${apikey}&offset=${offset}&orderBy=${orderBy}&nameStartsWith=${searchInput}` ;  
// }else{
//   url
// }

// let url 
// if(searchInput == ""){
//         url = `${baseUrl}/comics?&offset=${offset}&orderBy=${orderBy}&apikey=${apikey}`

// }else{
//     url = `${baseUrl}/comics?&titleStartsWith=${searchInput}&offset=${offset}&orderBy=${orderBy}&apikey=${apikey}`

// }
//*
//*

// let url 
// if(searchInput == ""){
//   url = `${baseUrl}/characters?&offset=${offset}&orderBy=${orderBy}&apikey=${apikey}`
// }else{
//   url = `${baseUrl}/characters?&nameStartsWith=${searchInput}&offset=${offset}&orderBy=${orderBy}&apikey=${apikey}`

// }