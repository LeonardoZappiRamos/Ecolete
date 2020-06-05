function populateUf(){
    const ufSelect = document.querySelector("select[name=uf]")    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then(states =>{
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUf()

function getCities(event){
   
    const citiesSelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value
    
    const indexOfSelectedStates = event.target.selectedIndex
   
   
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citiesSelect.innerHTML = "<option value>Seleciona a Cidade</option>"
    citiesSelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then(cities =>{
        for(const city of cities){
            citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
       }
       citiesSelect.disabled = false;
   })

   stateInput.value = event.target.options[indexOfSelectedStates].text
}

document
        .querySelector("select[name=uf]")
        .addEventListener("change", getCities)


const itensToColect = document.querySelectorAll(".itens-grid li")

for(const item of itensToColect){
    item.addEventListener("click",handleSelectedItem)
}

const colectedItens = document.querySelector("input[name=Item]")

let seletedItem = [];

function handleSelectedItem (event){
    const itemLi = event.target
    itemLi.classList.toggle("selected")

    const idItem = itemLi.dataset.id
    
    const alredySelected = seletedItem.findIndex(item => item == idItem)

    if(alredySelected <= 0)
    {   
        const fiteredItens = seletedItem.filter(item => {
            const itenIsDiferent = item != idItem;
            return itenIsDiferent;
        })

        seletedItem = fiteredItens
    } else{
        seletedItem = puch(idItem)
    }

    colectedItens.value = seletedItem
    
}