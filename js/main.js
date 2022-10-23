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




//Belu personajes

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
    // ***********************
    // OCULTE EL CONTAINER PARA QUE NO MOLESTE, SI SACA LA CLASE SE VEN LOS PERSONAJES. 
    container.classList.add('visually-hidden');

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


//**********************************************/
// Form filtros
//**********************************************/
const controlorderBy = document.getElementById('control-order-by');
const searchType = document.getElementById('search-type');


const generarOption = ()=> {
    if(searchType.value === 'comics'){
        controlorderBy.innerHTML = `
      <option value="title">A-Z</option>
      <option value="-title">Z-A</option>
      <option value="-onsaleDate">Más nuevos</option>
      <option value="onsaleDate">Más viejos</option> `
    }
    if(searchType.value === 'characters'){
        controlorderBy.innerHTML = `
      <option value="name">A-Z</option>
      <option value="-name">Z-A</option> `
    }
  }

  generarOption()

  searchType.addEventListener('change', () => {
    generarOption()
  })