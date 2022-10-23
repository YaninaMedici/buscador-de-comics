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




//Belu

const loadCharacters = async () => {
    const charactersResponse = await getCharacters()
    const data = charactersResponse.data
    const characters = data.results

    const charactersResults = document.getElementById('characters-results');
    const container = document.createElement('div');
    const row = document.createElement('div')

    charactersResults.appendChild(container);
    container.appendChild(row);

    container.classList.add('container');
    row.classList.add('row');

    for (const character of characters) {

        const card = document.createElement('div');
        const cardImg = document.createElement('img');
        const cardBody = document.createElement('div');
        const col = document.createElement('div');
        const name = document.createElement('h2');
        const nameText = document.createTextNode(character.name);

        card.appendChild(cardImg);
        card.appendChild(cardBody);
        col.appendChild(card)
        cardBody.appendChild(name);
        name.appendChild(nameText)

        card.classList.add('card');
        cardImg.classList.add('card-img-top');
        cardBody.classList.add('card-body');
        col.classList.add('col-md-3')
        name.classList.add('h5')

        row.appendChild(col)
        cardImg.setAttribute('src', `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}` )
    }
}

loadCharacters()