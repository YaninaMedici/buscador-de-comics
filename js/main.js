//**********************************************/
// COMICS
//**********************************************/


// siempre los parametros tienen que ir en la url

let page = 1;

const loadComics = async () => {
    
    // const params = new URLSearchParams(window.location.search);

    const comicsResponse = await getComics((page - 1) * 20, "title");  // para avanzar de a 20 comics // cuando page es 1, -1 va a ser 0, 0 * 20 es 0
    const data = comicsResponse.data;
    const comics = data.results;

    // console.log(data)

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
        // console.log(comic)     
        
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

        cardImg.setAttribute('src', `${comic.thumbnail.path}.${comic.thumbnail.extension}`); // le pasamos los 2 parametros de la img
        

    });
}

loadComics();


//**********************************************/
// PERSONAJES
//**********************************************/
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
        const name = document.createElement('h2');
        const nameText = document.createTextNode(character.name);

        card.appendChild(cardImg);
        card.appendChild(cardBody);
        col.appendChild(card)
        cardBody.appendChild(name);
        name.appendChild(nameText)

        col.classList.add('col-md-3');
        title.classList.add('h6'); // va a tener una importancia de un h2, pero boostrap permite que se vea como un h5
    };
};

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
};

generarOption()

// searchType.addEventListener('change', () => {
//     generarOption()
// };


//**********************************************/
// PAGINADOR
//**********************************************/

/* <li class="page-item"><a class="page-link text-bg-dark text-white p-3" href="#" id="first-page"><<</a></li>
<li class="page-item"><a class="page-link text-bg-dark text-white p-3" href="#" id="previus-page"><</a></li>
<li class="page-item"><a class="page-link text-bg-dark text-white p-3" href="#" id="next-page">></a></li>
<li class="page-item"><a class="page-link text-bg-dark text-white p-3" href="#" id="last-page">>></a></li> */

// const searchComics = () => {
//     fetch(`endpoint?offset=${(page - 1) * 20}`) // para avanzar de a 20 comics // cuando page es 1, -1 va a ser 0, 0 * 20 es 0
//     console.loge(page)
// }


const buttons = [
    { 
        text: "<<", 
        class: "btn",
        onClick: () => {
            page = 1;
            loadComics();
        },
    },
    { 
        text: "<",
        class: "btn",
        onClick: () => {
            page = page - 1;
            loadComics();        
        },
    },
    {
        text: "Página actual",
        class: "btn",
    },
    { 
        text: ">",
        class: "btn",
        onClick: () => {
            page = page + 1;
            loadComics();        
        }
    },
    { 
        text: ">>",
        class: "btn",
        onClick: () => {
            page = 400; // DETERMINAR AUTOMATICAMENTE LA ULTIMA PAGINA!!!!!!!!
            loadComics();        
        }
    },
];

// const containerPagination = document.getElementById('container-pagination');
const pagination = document.createElement('div');
// containerPagination.appendChild(pagination);
pagination.setAttribute('id', 'pagination');
pagination.classList.add('pagination');

// const renderButton = () => {

    buttons.forEach(button => {
        
        const buttonNode = document.createElement('button');
        const textNode = document.createTextNode(button.text);
        
        buttonNode.appendChild(textNode);
        buttonNode.classList.add(button.class);
    
        buttonNode.addEventListener('click', button.onClick)
    
        pagination.appendChild(buttonNode)
    
        // estilos de btn boostrap
        // btn.classList.add('page-link text-bg-dark text-white')
    });
// }



// const refresh = () => {

    // const pageNode = document.createElement('h1');
    // const pageNodeText = document.createTextNode(page);
    
    // pageNode.appendChild(pageNodeText);
    
    // document.body.appendChild(pageNode);
    document.body.appendChild(pagination);

// }