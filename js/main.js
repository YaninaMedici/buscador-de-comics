


// siempre los parametros tienen que ir en la url


// const comics = getComics();


// comics
//     .then(response => response.json())
//     .then(data => console.log(data))     

// // const loadComics = async () => {
// //     const comics = await getComics();
// //     console.log(comics);
// // }

// // loadComics();


const getParams = () => {
  const params = new URLSearchParams(window.location.search);
  
  return params
}
  


//Belu personajes

const loadCharacters = async () => {
  const params = getParams()
  const charactersResponse = await getCharacters();

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
    //container.classList.add('visually-hidden');

    row.classList.add('row');

    for (const character of characters) {

        const card = document.createElement('div');
        const cardImg = document.createElement('img');
        const cardBody = document.createElement('div');
        const col = document.createElement('div');
        const name = document.createElement('h2');
        const nameText = document.createTextNode(character.name);

        card.addEventListener('click', () => {
          loadDetailCharacter(character)
         loadCharacterComics(character)
        charactersResults.classList.add('d-none');

         // params.set('characterId', character.id);
        // window.location.href = window.location.pathname + 'detail.html?' + params.toString();

        })

        card.appendChild(cardImg);
        card.appendChild(cardBody);
        col.appendChild(card)
        cardBody.appendChild(name);
        name.appendChild(nameText)

        card.classList.add('card');
        cardImg.classList.add('card-img-top');
        cardBody.classList.add('card-body');
        col.classList.add('col-md-3')
        name.classList.add('h6')

        row.appendChild(col)
        cardImg.setAttribute('src', `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}` )
    }
}

loadCharacters()


const loadDetailCharacter = (character) => {

  //const charactersResponseDetail = await loadCharacters();


  const charactersDetail = document.getElementById('characters-detail');
  charactersDetail.classList.remove('d-none')

  const divImg = document.createElement('div');
  const cardImg = document.createElement('img');
  const divText = document.createElement('div');
  const name = document.createElement('h3');
  const pText = document.createElement('p');

  const textName =  document.createTextNode(character.name);
  const textDescription =  document.createTextNode(`Descripción: ${character.description}`);

  //div.appendChild(document.createTextNode)

  charactersDetail.appendChild(divImg);
  divImg.appendChild(cardImg)
  charactersDetail.appendChild(divText);
  divText.appendChild(name);
  divText.appendChild(pText);

  name.appendChild(textName);
  pText.appendChild(textDescription);

  cardImg.setAttribute('src', `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}` )


}


const loadCharacterComics = (character) => {
  const characterComics = character
  const dataCharacterComics = characterComics.comics
  console.log(dataCharacterComics)
  const charactersDetailComics = document.getElementById('characters-detail-comics');
  charactersDetailComics.classList.remove('d-none')

  
  const divText = document.createElement('div');
  const comics = document.createElement('h3');
  const pText = document.createElement('p');

  const textComics =  document.createTextNode(`Comics`);
  const textDescription =  document.createTextNode(`${dataCharacterComics.available} RESULTADOS`);

  charactersDetailComics.appendChild(divText);
  divText.appendChild(comics);
  divText.appendChild(pText);

  comics.appendChild(textComics);
  pText.appendChild(textDescription);


  const container = document.createElement('div');
  const row = document.createElement('div')

  charactersDetailComics.appendChild(container);
  container.appendChild(row);

  container.classList.add('container');

  row.classList.add('row');
  
  const comicsItems = dataCharacterComics.items 
//console.log(comicsItems)

  for (const comicsItem of comicsItems) {
    const card = document.createElement('div');
    const cardImg = document.createElement('img');
    const cardBody = document.createElement('div');
    const col = document.createElement('div');
    const name = document.createElement('h2');
    const nameText = document.createTextNode(comicsItem.name);

    card.appendChild(cardImg);
    card.appendChild(cardBody);
    col.appendChild(card)
    cardBody.appendChild(name);
    name.appendChild(nameText)

    card.classList.add('card');
    cardImg.classList.add('card-img-top');
    cardBody.classList.add('card-body');
    col.classList.add('col-md-3')
    name.classList.add('h6')

    row.appendChild(col)
  //cardImg.setAttribute('href', `${comicsItem.resourceURI}` )
}


}











//**********************************************/
// Form filtros
//**********************************************/
const controlOrderBy = document.getElementById('control-order-by');
const searchType = document.getElementById('search-type');


const generarOption = ()=> {
    if(searchType.value === 'comics'){
        controlOrderBy.innerHTML = `
      <option value="title">A-Z</option>
      <option value="-title">Z-A</option>
      <option value="-onsaleDate">Más nuevos</option>
      <option value="onsaleDate">Más viejos</option> `
    }
    if(searchType.value === 'characters'){
        controlOrderBy.innerHTML = `
      <option value="name">A-Z</option>
      <option value="-name">Z-A</option> `
    }
  }

  generarOption()

  searchType.addEventListener('change', () => {
    generarOption()
  })