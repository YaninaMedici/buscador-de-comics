// siempre los parametros tienen que ir en la url


const comics = getComics();

comics
    .then(response => response.json())
    .then(data => console.log(data))

// const loadComics = async () => {
//     const comics = await getComics();
//     console.log(comics);
// }

// loadComics();