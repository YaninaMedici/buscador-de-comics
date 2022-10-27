
let resultsCounter = 0;
let pagina = 0;




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
  const charactersResponse = await getCharacters(params.get('offset'), params.get('orderBy'), params.get('nameStartsWith'));

  const data = charactersResponse.data
  const characters = data.results
  const charactersCount = data.total

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
paginador(data)
updateresultsCount(charactersCount)

}

loadCharacters()

// // //**********************************************/
// // Formularios
// // //**********************************************/

// const searchComics = document.getElementById('search-comics');

// searchComics.addEventListener('submit', (e) => {
//   e.preventDefault()
//   const orderBy = e.target["control-order-by"].value
//   const searchType = e.target["search-type"].value
//   const searchInput = e.target["search-input"].value

//   const params = new URLSearchParams(window.location.search);
//   params.set('orderBy', orderBy);
//   //params.set('searchInput', searchInput);
//  console.log(searchInput.lenght)

//   if(searchType === 'comics'){
//     params.set('titleStartsWith', searchInput);
//   }
//   //&nameStartsWith=${searchInput}
//   if(searchType === 'characters'){
//     params.set('nameStartsWith', searchInput);
//   }
//   //parametroDeBusqueda = `&nameStartsWith=${inputBusqueda.value}` //le sumo el parametro del input

//   window.location.href = window.location.pathname + '?' + params.toString();
// })







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







const resultsNumber = document.getElementById('results-number');
const actualPages = document.getElementById('actual-page');


  const updateresultsCount = count => {
    // let totalResult = count.total
    // resultsNumber.innerHTML = `RESULTADOS: ${totalResult}`
    //actualPages.innerHTML = `Página actual: ${count.offset}`;
    resultsNumber.innerHTML = `RESULTADOS: ${count}`;
    resultsCounter = count;
    // paginador(totalResult)
  } 




//**********************************************/
// Paginador
//**********************************************/

const firstPage = document.getElementById('first-page');
const previusPage = document.getElementById('previus-page');
const nextPage = document.getElementById('next-page');
const lastPage = document.getElementById('last-page');
   
const paginador =  (data) => {
  let offset = data.offset;
  firstPage.addEventListener('click', () =>{
    offset = 0
    const params = new URLSearchParams(window.location.search);
    params.set('offset', offset);
    window.location.href = window.location.pathname + '?' + params.toString();  
  })
  nextPage.addEventListener('click', () => {
    offset += 20;
    const params = new URLSearchParams(window.location.search);
    params.set('offset', offset);
    window.location.href = window.location.pathname + '?' + params.toString();
  });
  previusPage.addEventListener('click', () => {
    if(offset > 0){
      offset -= 20;
      const params = new URLSearchParams(window.location.search);
      params.set('offset', offset);
      window.location.href = window.location.pathname + '?' + params.toString();
    }
  });
  lastPage.addEventListener('click', () =>{
    // cantidad de comic busco si el resto/modulo da 0 
    const maxResult = resultsCounter % 20 === 0 // falso

      //            53265     %   20  = 5  // quiere decir que en la ultima hoja hay 5 comics
    const maxPage = Math.floor(resultsCounter / 20)  // 2664 paginas
    let pagina = maxPage

    if(maxResult){ // si el maximo de comics es menor a menos -1 pintar el maximo de paginas - 1
      offset = maxPage // 2662 
      const params = new URLSearchParams(window.location.search);
      params.set('offset', offset);
      window.location.href = window.location.pathname + '?' + params.toString();
           console.log(offset)
    }else{
    offset = maxPage + 1
    console.log(offset)
    }

  })
}
