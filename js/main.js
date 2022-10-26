// siempre los parametros tienen que ir en la url


const loadComics = async () => {
    const comicsResponse = await getComics();
    const data = comicsResponse.data;
    const comics = data.results;

    console.log(data)

    comics.forEach(comic => {
        console.log(comic)
        
    });
}

loadComics();


// comics
//     .then(response => response.json())
//     .then(data => console.log(data))
