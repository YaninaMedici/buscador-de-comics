// siempre los parametros tienen que ir en la url


const loadComics = async () => {
    const comicsResponse = await getComics();
    const data = comicsResponse.data;
    const comics = data.results;


    console.log(data)


comics
    .then(response => response.json())
    .then(data => console.log(data))     


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
        console.log(comic)     
        
        // reemplazamos de esta manera el TEMPLATE creando los div, la Img, y agregandole las class de boostrap

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

        const title = document.createElement('h2');

        const titleText = document.createTextNode(comic.title);
        
        // indicamos que va dentro de cada cosa
        card.appendChild(cardImg);
        card.appendChild(cardBody);
        col.appendChild(card);
        cardBody.appendChild(title);
        title.appendChild(titleText);

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

        col.classList.add('col-md-3');
        title.classList.add('h6'); // va a tener una importancia de un h2, pero boostrap permite que se vea como un h5

        row.appendChild(col); 

        cardImg.setAttribute('src', `${comic.thumbnail.path}.${comic.thumbnail.extension}`); // le pasamos los 2 parametros de la img
        

    };
}

loadComics();


// comics
//     .then(response => response.json())
//     .then(data => console.log(data))

        // col.classList.add('col-md-3')
        // name.classList.add('h5')

        // row.appendChild(col)
        // cardImg.setAttribute('src', `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}` )



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
};