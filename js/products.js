const URL = 'https://japceibal.github.io/emercado-api/cats_products/'
const cat = localStorage.getItem('catID') + '.json';
const URLS = URL.concat(cat);

var colection = document.getElementById('Cars');

let btnAsc = document.getElementById('sortAsce');
let btnDesc = document.getElementById('sortDesc');
let btnRel = document.getElementById('sortByCount');

let inputMin = document.getElementById('rangeFilterCountMin');
let inputMax = document.getElementById('rangeFilterCountMax');
let btnFiltrar = document.getElementById('rangeFilterCount');
let btnLimpiar = document.getElementById('clearRangeFilter');

let ProductosOriginal = [];
let Productos = [];

fetch(URLS)
.then(respuesta => respuesta.json())
.then (categorias =>{
    ProductosOriginal = categorias.products;
    Productos = categorias.products;
    var titulo = document.getElementById('Productos');
    titulo.innerHTML += `<h1 id="Products"> Productos </h1>`;
    titulo.innerHTML += `<p id="Subt"> Verás aqui todos los productos de la categoria ${categorias.catName} </p>`;
    mostrarProductos(ProductosOriginal);
    document.querySelectorAll(".Div-categorias").forEach((e, i) => {
        e.addEventListener("click", function() {     
            window.location = "product-info.html";
            localStorage.setItem("productoElegido", (document.getElementsByClassName("Div-categorias")[i].id));
        });   
    });
});

function mostrarProductos(Productos){
    colection.innerHTML = "";
    console.log(Productos);
    for(let producto of Productos){
        colection.innerHTML += `
            <div class="Div-categorias" id="${producto.id}">
                <div class="Div-img">
                    <img src="${producto.image}" alt="auto" class="img"></img> 
                </div>
                <div class="cositas">
                    <h2 class="nombre">${producto.name} - ${producto.currency} ${producto.cost}</h2> 
                    <p class="desc">${producto.description}</p>
                </div>
                <div class="cantidad">
                    <p class="cant">${producto.soldCount} vendidos</p>
                </div>
            </div>
        `;       
    };
};


btnAsc.addEventListener("click", function(){
    ProductosOriginal.sort((a, b) => {
        if (a.cost < b.cost) {return -1;}
        if (a.cost > b.cost) {return 1;}
        return 0;
    });
    mostrarProductos(ProductosOriginal);
});

btnDesc.addEventListener("click", function(){
    ProductosOriginal.sort((a, b) => {
        if (a.cost > b.cost) {return -1;}
        if (a.cost < b.cost) {return 1;}
        return 0;
    });
    mostrarProductos(ProductosOriginal);
});

btnRel.addEventListener("click", function(){
    ProductosOriginal.sort((a, b) => {
        if (a.soldCount > b.soldCount) {return -1;}
    });
    mostrarProductos(ProductosOriginal);
});

btnLimpiar.addEventListener("click", function(){
    inputMin.value = "";
    inputMax.value = "";

    minCount = undefined;
    maxCount = undefined;
    mostrarProductos(ProductosOriginal);
});

function filtrar() {
    let min;
    let max;
    if (inputMin.value !== '' && inputMin.value !== undefined) {
        min = inputMin.value;
    } else {
        min = -Infinity;
    };
    if (inputMax.value !== '' && inputMax.value !== undefined) {
        max = inputMax.value;
    } else {
        max = Infinity;
    };
    Productos = ProductosOriginal.filter(e => (e.cost >= min) && (e.cost <= max))
    mostrarProductos(Productos);
};

btnFiltrar.addEventListener('click', filtrar);

document.addEventListener('keyup', (e) =>{
    if (e.target.matches('#buscador')) {
        document.querySelectorAll('.Div-categorias').forEach(prod => {
            if (prod.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
                prod.classList.remove('filtro');
            } else {
                prod.classList.add('filtro');
            }               
        });
    }   
});

document.getElementsByClassName('nav-item')[3].innerHTML += `<a class="nav-link" href="my-profile.html">${localStorage.getItem('nombre')}</a>`;
