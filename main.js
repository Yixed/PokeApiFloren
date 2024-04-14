// PokeAPI --- Floren Gonzalez -----------------------

//Se hace peticion a la API, hacer solo 1 vez if possible
const getData = async () => {
  //LLamada a los datos
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/')
  const res = await response.json()
  //console.log('Devolucion del getData:', res)

  return res
}

const getPokemon = async () => {
  //LLamada a los datos de cada pokemon
  let loader$ = document.querySelector('#loader')
  loader$.style.display = 'block'

  const pokeArray = []
  const pokeUrl = 'https://pokeapi.co/api/v2/pokemon/'

  for (let i = 1; i <= 151; i++) {
    const response = await fetch(pokeUrl + i)
    const res = await response.json()
    pokeArray.push(res)
    //console.log('Devolucion del getPokemon:', res) //OK
  }
  console.log('Devolucion del getPokemon total:', pokeArray)
  return pokeArray
}

//Simplificacion de los datos de la API
const mapPokemon = results => {
  const pokemonArrayMapped = results.map(result => ({
    name: result.name,
    image: result.sprites['front_default'],
    type: result.types.map(type => type.type.name).join(','),
    id: result.id
  }))
  return pokemonArrayMapped
}

//Se activan los botones del menu
function menuButtons () {
  const teamSection$ = document.querySelector('#teamSection')
  const searchSection$ = document.querySelector('#searchSection')
  const statsSection$ = document.querySelector('#statsSection')
  const battleSection$ = document.querySelector('#battleSection')

  const teamBtn$ = document.querySelector('#menuBtnTeam')
  teamBtn$.addEventListener('click', () => {
    teamSection$.style.display = 'grid'
    searchSection$.style.display = 'none'
    statsSection$.style.display = 'none'
    battleSection$.style.display = 'none'
  })

  const searchBtn$ = document.querySelector('#menuBtnSearch')
  searchBtn$.addEventListener('click', () => {
    teamSection$.style.display = 'none'
    searchSection$.style.display = 'block'
    statsSection$.style.display = 'none'
    battleSection$.style.display = 'none'
  })

  const statsBtn$ = document.querySelector('#menuBtnStats')
  statsBtn$.addEventListener('click', () => {
    searchSection$.style.display = 'none'
    teamSection$.style.display = 'none'
    statsSection$.style.display = 'grid'
    battleSection$.style.display = 'none'
  })
  const battleBtn$ = document.querySelector('#menuBtnBattle')
  battleBtn$.addEventListener('click', () => {
    searchSection$.style.display = 'none'
    teamSection$.style.display = 'none'
    statsSection$.style.display = 'none'
    battleSection$.style.display = 'grid'
  })
}

//Se activa el boton para añadir pokemon -- simplemente vamos a pestaña search
function teamSectionButtons () {
  const teamSection$ = document.querySelector('#teamSection')
  const searchSection$ = document.querySelector('#searchSection')
  const statsSection$ = document.querySelector('#statsSection')
  const battleSection$ = document.querySelector('#battleSection')

  const pokeCard$ = document.querySelectorAll('.pokeCard')
  for (let pokeCard of pokeCard$) {
    pokeCard.addEventListener('click', () => {
      teamSection$.style.display = 'none'
      searchSection$.style.display = 'block'
      statsSection$.style.display = 'none'
      battleSection$.style.display = 'none'
    })
  }
  const pokeCardFilled$ = document.querySelectorAll('.pokeCardFilled')
  for (let pokeCardFilled of pokeCardFilled$) {
    pokeCardFilled.addEventListener('click', () => {
      console.log('click')
    })
  }
}

//Volver a pantalla team
function goToTeamSection () {
  const teamSection$ = document.querySelector('#teamSection')
  const searchSection$ = document.querySelector('#searchSection')
  const statsSection$ = document.querySelector('#statsSection')
  const battleSection$ = document.querySelector('#battleSection')

  teamSection$.style.display = 'grid'
  searchSection$.style.display = 'none'
  statsSection$.style.display = 'none'
  battleSection$.style.display = 'none'
}

//Pintamos los datos en el DOM
const drawContainer = characters => {
  let loader$ = document.querySelector('#loader')
  loader$.style.display = 'none'

  console.log(characters)

  let container$ = document.querySelector('#charContainer')
  container$.innerHTML = '' //Se vacía

  if (characters.length !== 0) {
    for (let character of characters) {
      let { name, image, type, id } = character
      //let { name, foto, rol } = characters[0] //Para pruebas

      let pill$ = document.createElement('div')
      pill$.classList.add('charPill')
      pill$.innerHTML = ` <!--div inyectado-->
          <div class="charContent">
            <div class="charImageContainer">
              <img src=${image} alt="" class="charImage" />
            </div>
            <div class="charId" id=${id}>${id}</div>
            <div class="charName">${name}</div>
            <div class="charRole">${type}</div>
          </div>
          `
      container$.appendChild(pill$) //Se mete un .charContainer en #charContainer
    }
  } else {
    let pill$ = document.createElement('div')
    pill$.classList.add('charPill')
    pill$.innerHTML = ` <!--div inyectado-->
          <div class="charContent">
            <div class="charImageContainer">
              <img src="./image/4228-Unown-Question.webp" alt="" class="charImage" />
            </div>
            <div class="charName">Unknow</div>
            <div class="charRole">Phantom</div>
          </div>
          `
    container$.appendChild(pill$)
  }
}

//Se genera el escuchador del input y se pinta segun su valor
const drawContainer_input_filter_order = characters_ => {
  const input$ = document.querySelector('#searchInput')

  //Se le pone una funcion recursiva para que no se ejecute hasta que se de el event
  input$.addEventListener('input', () =>
    searchCharacters(characters_, input$.value)
  )

  //Funcion para buscar en el array y pintarlo
  const searchCharacters = (characters_, inputValue_) => {
    console.log(inputValue_)
    let filteredCharacters = characters_.filter(characters_ => {
      characters_.name.toLowerCase().includes(inputValue_) ||
        characters_.id == inputValue_ ||
        characters_.type.toLowerCase().includes(inputValue_)
    })

    /* NO FUNCA
    if (filteredType_.length > 1) {
    for (let type of filteredType_) {
      filteredCharacters = filteredCharacters.filter(characters_ => {
        characters_.type.toLowerCase() === type
      })
    }
  } else if (filteredType_.length === 1) {
    filteredCharacters = filteredCharacters.filter(characters_ => {
      characters_.type.toLowerCase() === type
    })
  }*/

    console.log('busqueda:', filteredCharacters)
    drawContainer(filteredCharacters) //Se manda a pintar
  } /* */
}

//Se activa el menu de filtros y se guardan los activos para filtrar
//SIN FUNCIONAR YET
/*
function activeFilters () {
  let activeFiltersArray = []

  const filterMenu$ = document.querySelector('#searchFilterMenu')
  const filter$ = document.querySelector('#searchFilterMenuBtn')
  filter$.addEventListener('click', () => {
    filterMenu$.style.display = 'inline'
  })
  const input$ = document.querySelectorAll('Input')

  const cleanFilter$ = document.querySelector('#searchCleanBtn')
  cleanFilter$.addEventListener('click', () => {
    for (let input of input$) {
      input.checked = false
    }
    filterMenu$.style.display = 'none'
  })
  const goFilter$ = document.querySelector('#searchGoBtn')

  goFilter$.addEventListener('click', () => {
    activeFiltersArray = []

    for (let input of input$) {
      if (input.checked) {
        activeFiltersArray.push(input.id)
      }
    } //En el array se guardan los valores de orden tambien

    filterMenu$.style.display = 'none'
    console.log('activeBtns:', activeFiltersArray)
    return activeFiltersArray
  })

  return activeFiltersArray
}*/

function pickPokemon (characters_) {
  const pokemones$ = document.querySelectorAll('.charPill')
  for (let pokemon of pokemones$) {
    pokemon.addEventListener('click', () => {
      pokemonId = pokemon.querySelector('.charId').id - 1
      const pokemonSlot$ = document.querySelector('.pokeCard')
      if (pokemonSlot$ !== null) {
        pokemonSlot$.classList.remove('pokeCard')
        pokemonSlot$.classList.add('pokeCardFilled')
        pokemonSlot$.innerHTML = ` <!--div inyectado-->
            <img src=${characters_[pokemonId].image} alt="" class="charImage"/> 
            <p>${characters_[pokemonId].name}</p>
            <p>${characters_[pokemonId].type}</p>
          `
        goToTeamSection()
        console.log(pokemonSlot$)
        teamSectionButtons() //Se actualizan los botones de teamSection
      } else {
        alert('No puedes añadir mas pokemon')
      }
    })
  }
}

//Eliminar pokemon del team not funking
function deletePokemon (characters_) {
  const pokemones$ = document.querySelectorAll('.pokeCardFilled')
  for (let pokemon of pokemones$) {
    pokemon.addEventListener('click', () => {
      pokemonId = pokemon.querySelector('.charId').id - 1
      const pokemonSlot$ = document.querySelector('.pokeCard')
      if (pokemonSlot$ !== null) {
        pokemonSlot$.classList.remove('pokeCardFilled')
        pokemonSlot$.classList.add('pokeCard')
        pokemonSlot$.innerHTML = ` <!--div inyectado-->
        +
          `
        goToTeamSection()
        console.log(pokemonSlot$)
        teamSectionButtons() //Se actualizan los botones de teamSection
      } else {
        alert('No puedes añadir mas pokemon')
      }
    })
  }
}

async function init () {
  //1º Cargar los datos de la API
  const dataOrigin = await getData()
  //console.log('Devolucion del getData desde el init:', dataOrigin)

  //2º Mapear los datos para simplificar las claves existentes
  const pokemonArray = await getPokemon()
  const pokemonArrayMapped = await mapPokemon(pokemonArray)
  console.log('Devolucion del mapCharacters desde el init:', pokemonArrayMapped)

  //Activamos los botones del menu:
  menuButtons()
  teamSectionButtons()

  //3º Pintamos los datos en el DOM - searchSection
  drawContainer(pokemonArrayMapped)
  //Se activa el click sobre los pokemones para añadirlos al equipo
  pickPokemon(pokemonArrayMapped)
  deletePokemon(pokemonArrayMapped)
  //activamos el menu filtros
  //activeFilters()

  drawContainer_input_filter_order(pokemonArrayMapped)
}

init()
