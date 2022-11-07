
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

  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('p')) || 1;

  const comicsResponse = await getComics(page, "title");
  
  const data = comicsResponse.data;
  const comics = data.results;

  // const params = getParams()

  //   const comicsResponse = await getComics( 
  //     params.get('offset') || (page - 1) * 20, 
  //     params.get('orderBy') || 'title',
  //     params.get('orderType') || 'comics');

  //     //searchType
  //   const data = comicsResponse.data;
  //   const comics = data.results;
  //   console.log(comics)


    // llamamos al section donde vamos a pintar las cards de los comics
    // y creamos el div y row que las va a contener
    const results = document.getElementById('comics-results');
    results.innerHTML = ""; // es para vaciar el elemento cada vez que lo capturamos con el id
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

        // card.addEventListener('click', () => {
        //   params.set('comicId', comic.id);
        //   window.location.href = window.location.pathname = '/../detail.html?' = params.toString();

        // })

        // backButton.addEventListener('click', () => {
        //   results.classList.remove('d-none');
        //   backButton.classList.remove('d-none');
        // })

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
        col.classList.add('col-md-2'); // col-6
        title.classList.add('h6'); // va a tener una importancia de un h2, pero boostrap permite que se vea como un h6

        row.appendChild(col); 

        cardImg.setAttribute('src', `${comic.thumbnail.path}.${comic.thumbnail.extension}`); // le pasamos los 2 parametros de la img
        // cardImg.setAttribute('src', `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`); // le pasamos los 2 parametros de la img
    });

    renderPagination(Math.ceil(data.total / 20)); // le estamos pasando el objeto que creamos arriba con dom
}

//**********************************************/
// PERSONAJES
//**********************************************/
const loadCharacters = async () => {

  const params = getParams()
  const charactersResponse = await getCharacters(
    params.get('offset') || (page - 1) * 20, 
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
    const comics = character.comics;

    card.addEventListener('click', () => {
      loadDetailCharacter(character)
      container.classList.add('d-none');
      
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


//**********************************************/
// PAGINADOR
//**********************************************/

const renderPagination = (totalPages) => {

  const params = new URLSearchParams(window.location.search);
  const page = parseInt(params.get('p')) || 1;

  const buttons = [{ 
    text: "<<", 
    class: "btn",
    onClick: function() {    
      params.set('p', 1);
      window.location.href = window.location.pathname + '?' + params.toString()
    },
  },{ 
    text: page - 1, // "<"
    class: "btn",
    onClick: function() {      
      params.set('p', page - 1)
      window.location.href = window.location.pathname + '?' + params.toString()
    },
  },{
    text: page, // "Página actual"
    class: "btn",
  },{ 
    text: page + 1, // ">"
    class: "btn",
    onClick: function() {   
      params.set('p', page + 1)
      window.location.href = window.location.pathname + '?' + params.toString()
    }
  },{ 
    text: ">>",
    class: "btn",
    onClick: function() {
      params.set('p', totalPages)
      window.location.href = window.location.pathname + '?' + params.toString()
    }
  }];

  // const containerPagination = document.getElementById('container-pagination');
  // containerPagination.appendChild(pagination);
  const pagination = document.createElement('div');
  pagination.setAttribute('id', 'pagination');
  pagination.classList.add('pagination');


  buttons.forEach(button => {
           
    const buttonNode = document.createElement('button');
    const textNode = document.createTextNode(button.text);        
    buttonNode.appendChild(textNode);
    buttonNode.classList.add(button.class);
    
    buttonNode.addEventListener('click', button.onClick)
        
    pagination.appendChild(buttonNode)
    
    // estilos de btn boostrap // btn.classList.add('page-link text-bg-dark text-white')
  });
  document.body.appendChild(pagination);
}


const init = () => {
  loadComics();

  //COMENTADO
  generarOption()
  const params = new URLSearchParams(window.location.search);
  if (params.get('orderType') ===  'characters') {
    loadCharacters();
    } else {
      loadComics(1);
    }
};

init();

//COMENTADO
window.onload = init(); 

