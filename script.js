//se crean constantes de los elementos HTML
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

//diccionario de colores para los distintos tipos

const typeColors = {
    electric :'#F4DA52',
    normal: '#999DA2',
    fire: '#F9A74C',
    water:'#5BA8E3',
    ice:'#7BD6C9',
    rock:'#C7BC8B',
    flying:'#95ACE1',
    grass:'#5FBC5C',
    psychic:'#F6877F',
    ghost:'#5A6DAF',
    bug:'#9FC232',
    poison:'#B062C8',
    ground:'#DD7C48',
    dragon:'#0E6FC7',
    steel:'#548C9D',
    fighting:'#DA405C',
    dark:'#656874',
    fairy:'#EF91E6',
    default:'#2a1a1f',
}

//funcion busqueda pokemon
const searchPokemon = (event) => {
    //prevenimos la funcion por defecto
    event.preventDefault();
    //buscamo el valor del input de name pokemon
    const {value} = event.target.pokemon
    //creamos el fetch con la api y el valor
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    //obtenemos la respuesta y la convertimos a json
    .then(data => data.json())
    //llamamos a la funcion para renderizar el pokemon con la data obtenida
    .then(response => renderPokemonData(response))
    .catch(err => renderNotFound())
}

//funcion de renderizado
const renderPokemonData = (data) => {
    //constante de imagen
    const sprite = data.sprites.front_default;
    //constante de stats y tipos
    const{ stats, types } = data;
    //asignamos el nombre 
    pokeName.textContent = data.name;
    //asignamos la imagen
    pokeImg.setAttribute('src', sprite);
    //asginamos la id
    pokeId.textContent = `N° ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

// funcion para fondo de imagen
const setCardColor = (types) => {
    //buscamos en la api el tipo y le asignamos el color del diccionario
    const colorOne = typeColors[types[0].type.name]
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    //le agregamos el color al fondo de la imagen
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = `5px 5px`;
}

const renderPokemonTypes = (types) => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement)
    });
}

const renderPokemonStats = (stats) => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    })
}
const renderNotFound = () => {
    pokeName.textContent = "No Encontrado";
    pokeImg.setAttribute('src', 'img/poke_shadow.png');
    pokeImg.style.background = '#fff'
    pokeId.innerHTML = "";
    pokeStats.innerHTML = "";
    pokeTypes.innerHTML = "";
}