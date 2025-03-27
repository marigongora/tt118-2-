const pokemonList = document.getElementById("pokemonList")
const pokemonDetail = document.getElementById("pokemonDetail")
const pokemonInfo = document.getElementById ("pokemonInfo")
const btnBack= document.getElementById ("btnBack")
let btnCalcular= document.getElementById("btnCalcular")
let entradaUsuario = document.getElementById("entradaUsuario")
let inputPokemon

//esta funcion extrae los pokemones desde la base de datos de la pagina original//
async function getPokemonData (pokemonID) {
    try {
        let res = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
        let pokemon = await res.json()   
    return pokemon
} catch (error) {
        console.error(error.message)
        return false   
    }
} 
// esta funcion muestra las tarjetas con su respectivo nombre e imagen// 

function displayPokemon (pokemon){
    const pokemonCard = document.createElement ("div")
    pokemonCard.classList.add("pokemon-card")
    pokemonCard.innerHTML= `
    <img src="${pokemon.sprites.front_default}" alt= "imagen del ${pokemon.name}">
    <h3> ${pokemon.name} </h3>
    <p> ID: ${pokemon.id}</p>
    `
    pokemonCard.addEventListener("click",()=> showPokemonDetail (pokemon))
        
    pokemonList.appendChild(pokemonCard)
    return true
}

// esta funcion detalla cada pokemon// 

function showPokemonDetail(pokemon){
    console.log(pokemon)
    let typesName = []
    let typesImg = ""
    for (i=0; i< pokemon.types.length;i++){
        console.log(pokemon.types[i].type.name)
        typesImg = typesImg + `<img src= "./assets/${pokemon.types[i].type.name}.png" alt="logo tipo${pokemon.types[i].type.name}">`
        typesName.push(pokemon.types[i].type.name)
    }
    let stats= []
    let base_stats = []
    for (i=0; i< pokemon.stats.base_stats;i++){
        console.log(pokemon.stats[i].base_stats)
        stats= typesImg + `<img src= "./assets/${pokemon.types[i].type.name}.png" alt="logo tipo${pokemon.types[i].type.name}">`
        base_stats.push(pokemon.types[i].type.name)
    }

    pokemonList.style.display= "none"
    pokemonDetail.style.display= "block"
    pokemonInfo.innerHTML= `
    <img src= "${pokemon.sprites.front_default}" alt="image view front ${pokemon.name}">
    <img src= "${pokemon.sprites.back_default}" alt="image view back ${pokemon.name}">
    <h3>${typesName}</h3>
    <div> ${typesImg}</div>
    `
}
// formula //

async function  loadPokedex(){
    for (let i=1;i< 200; i ++){
    let pokemon = await getPokemonData(i)
    displayPokemon (pokemon)
    }
}

// botones de Hallo //

btnBack.addEventListener("click",()=>{
     pokemonList.style.display= "grid"
    pokemonDetail.style.display= "none"

})

entradaUsuario.addEventListener("input",(evento)=> {
   inputPokemon = evento.target.value 
    console.log(inputPokemon) }
)
btnCalcular.addEventListener ("click",async() => {
    let pokemon = await getPokemonData(inputPokemon)
   if (pokemon==false) {
    console.error ("pokemon no found")
    return alert ("pokemon not found")
   }

showPokemonDetail (pokemon)
})
loadPokedex()
