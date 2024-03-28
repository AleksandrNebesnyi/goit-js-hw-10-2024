import axios from 'axios';
import {fetchBreeds,fetchBreedById} from './cat-api'

const selectEl= document.querySelector('.breed-select');
const el = document.querySelector('select.breed-select')
const loaderEl= document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catInfoContainerEl= document.querySelector('.cat-info'); 


isHidden(selectEl);
isVisible(loaderEl);


fetchBreeds().then((breeds)=>{
    isHidden(loaderEl);
    isVisible(selectEl);
   

   
    let firstElId='';

    for (const {id,name} of breeds) {
        const markup = makeSelectMarkup(id,name);
        renderMarkup(selectEl,markup) ;
        firstElId=selectEl.firstChild.value;
    };
    
    renderFetchDataById(firstElId);
}).catch(()=>isVisible(errorEl));

function makeSelectMarkup(id,name) {
    return `<option value="${id}">${name}</option>`
};

function renderMarkup(container, markup) {
    container.insertAdjacentHTML("beforeend", markup);    
};

selectEl.addEventListener("change", onSelectValue);

function onSelectValue(event) { 
    clearContainer(catInfoContainerEl);
    const breedId= event.currentTarget.value;
    renderFetchDataById(breedId);
   };

function renderFetchDataById(id) {

     isHidden(catInfoContainerEl);
     isVisible(loaderEl);
     

    fetchBreedById(id).then((breed)=>{
        isHidden(loaderEl);
        isVisible(catInfoContainerEl);
        [{breeds:breedInfo,url}]=breed;
        [{description,temperament,alt_names:altImg,origin:country,name:catName}]=breedInfo;
   
    const markup=makeDetailInformationMarkup({url,description,temperament,altImg,country,catName})
    renderMarkup(catInfoContainerEl,markup);        
    }).catch(()=>isVisible(errorEl));
};

function makeDetailInformationMarkup({catName,url,country,temperament,description}) {
    return `
    <h2 class="title ">${catName}</h2>
    <img class="cat_img" src="${url}" alt="${altImg}"/>
    <p class="locationt">Country:${country}</p>
    <p class="temperament">Temperament:${temperament}</p>
    <p class="description">Description:${description}</p>`    
};
function isHidden(elem) {
    elem.classList.add('is-hidden')
    
}
function isVisible(elem) {
    elem.classList.remove('is-hidden')
  
}

function clearContainer(elem) {
    elem.innerHTML='';
    
}




  