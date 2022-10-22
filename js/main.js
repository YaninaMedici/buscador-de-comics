const loadComics = async () => {
    const comics = await getComics();
    console.log(comics);
}

loadComics();