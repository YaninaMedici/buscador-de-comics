const results = document.getElementById('comics-results');
const charactersResults = document.getElementById('characters-results');
const searchType = document.getElementById('search-type');
const searchInput   = document.getElementById('search-input');
const controlOrderBy = document.getElementById('control-order-by');
const searchComics = document.getElementById('search-comics');


const getParams = () => {
  const params = new URLSearchParams(window.location.search);
  return params
}
  

//**********************************************/
// COMICS
//**********************************************/
// siempre los parametros tienen que ir en la url

const loadComics = async () => {
  const params = getParams()

    const comicsResponse = await getComics(
      params.get('offset') || 0, 
      params.get('orderBy') || 'title',
      params.get('orderType') || 'comics');

      //searchType
    const data = comicsResponse.data;
    const comics = data.results;
    console.log(comics)

    // llamamos al section donde vamos a pintar las cards de los comics
    // y creamos el div y row que las va a contener
    const results = document.getElementById('comics-results');
    const container = document.createElement('div');
    const row = document.createElement('div');
    results.appendChild(container);
    container.appendChild(row);

    container.classList.add('container');
    row.classList.add('row');

    comics.forEach(comic => {

        // reemplazamos de esta manera el TEMPLATE creando los div, la Img, y agregandole las class de boostrap
        const card = document.createElement('div');
        const cardImg = document.createElement('img');
        const cardBody = document.createElement('div');
        const col = document.createElement('div');
        const title = document.createElement('h2');

        const titleText = document.createTextNode(comic.title);


        // indicamos que va dentro de cada cosa
        card.appendChild(cardImg);
        card.appendChild(cardBody);
        col.appendChild(card);
        cardBody.appendChild(title);
        title.appendChild(titleText);
        
        // pasamos los estilos de boostrap
        card.classList.add('card');
        cardImg.classList.add('card-img-top');
        cardBody.classList.add('card-body');
        col.classList.add('col-md-2');
        title.classList.add('h6'); // va a tener una importancia de un h2, pero boostrap permite que se vea como un h6

        row.appendChild(col); 

        cardImg.setAttribute('src', `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`); // le pasamos los 2 parametros de la img
        

    });
}




//**********************************************/
// PERSONAJES
//**********************************************/
const loadCharacters = async () => {

  const params = getParams()
  const charactersResponse = await getCharacters(
    params.get('offset') || 0, 
    params.get('orderBy') || 'name',
    params.get('orderType') || 'characters');

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
   charactersResults.classList.remove('d-none');

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
     // loadCharacterComics(character)
      container.classList.add('d-none');

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




const loadDetailCharacter = (character) => {

  const charactersDetail = document.getElementById('characters-detail-comics');
  charactersDetail.classList.remove('d-none')

  const divImg = document.createElement('div');
  const cardImg = document.createElement('img');
  const divText = document.createElement('div');
  const name = document.createElement('h3');
  const pText = document.createElement('p');

  const textName =  document.createTextNode(character.name);
  const textDescription =  document.createTextNode(
    character.description.length 
    ? `Descripción: ${character.description}`
    : "No hay descripción");
  
  charactersDetail.appendChild(divImg);
  divImg.appendChild(cardImg)
  charactersDetail.appendChild(divText);
  divText.appendChild(name);
  divText.appendChild(pText);

  name.appendChild(textName);
  pText.appendChild(textDescription);

  cardImg.setAttribute('src', `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}` )

  divImg.classList.add('detail');
  divText.classList.add('detail-text');


}


// const loadCharacterComics = (character) => {
//   const characterComics = character
//   const dataCharacterComics = characterComics.comics
//   console.log(dataCharacterComics)
//   const charactersDetailComics = document.getElementById('characters-detail-comics');
//   charactersDetailComics.classList.remove('d-none')

  
//   const divText = document.createElement('div');
//   const comics = document.createElement('h3');
//   const pText = document.createElement('p');

//   const textComics =  document.createTextNode(`Comics`);
//   const textDescription =  document.createTextNode(`${dataCharacterComics.available} RESULTADOS`);

//   charactersDetailComics.appendChild(divText);
//   divText.appendChild(comics);
//   divText.appendChild(pText);

//   comics.appendChild(textComics);
//   pText.appendChild(textDescription);


//   const container = document.createElement('div');
//   const row = document.createElement('div')

//   charactersDetailComics.appendChild(container);
//   container.appendChild(row);

//   container.classList.add('container');

//   row.classList.add('row');
  
//   const comicsItems = dataCharacterComics.items 

//   for (const comicsItem of comicsItems) {
//     const card = document.createElement('div');
//     const cardImg = document.createElement('img');
//     const cardBody = document.createElement('div');
//     const col = document.createElement('div');
//     const name = document.createElement('h2');
//     const nameText = document.createTextNode(comicsItem.name);

//     card.appendChild(cardImg);
//     card.appendChild(cardBody);
//     col.appendChild(card)
//     cardBody.appendChild(name);
//     name.appendChild(nameText)

//     card.classList.add('card');
//     cardImg.classList.add('card-img-top');
//     cardBody.classList.add('card-body');
//     col.classList.add('col-md-3')
//     name.classList.add('h6')

//     row.appendChild(col)
//     //cardImg.setAttribute('href', `${comicsItem.resourceURI}` )
//   }
// }


// //**********************************************/
// Formularios
// //**********************************************/

searchComics.addEventListener('submit', (e) => {
  e.preventDefault()

  const orderBy = e.target["control-order-by"].value
  const searchType = e.target["search-type"].value
  //const searchInput = e.target["search-input"].value

  const params = new URLSearchParams(window.location.search);
  params.set('orderBy', orderBy);
  params.set('orderType', searchType);
  params.set("offset", 20);
  //params.set('searchInput', searchInput);
  window.location.href = window.location.pathname + '?' + params.toString();

})


//**********************************************/
// Form filtros
//**********************************************/

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
};


searchType.addEventListener('change', () => {
  generarOption()
});


const init = () => {
  generarOption()
  const params = new URLSearchParams(window.location.search);
  if (params.get('orderType') ===  'characters') {
      loadCharacters();

  } else {
      loadComics();

  }
};

window.onload = init();



