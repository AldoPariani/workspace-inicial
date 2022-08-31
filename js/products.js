const URL = 'https://japceibal.github.io/emercado-api/cats_products/'
const cat = localStorage.getItem('catID') + '.json';
const URLS = URL.concat(cat);

fetch(URLS)
.then(respuesta => respuesta.json())
.then (categorias =>{
        console.log(categorias)
        var titulo = document.getElementById('Productos');
        var colection = document.getElementById('Cars');
        titulo.innerHTML += `<h1 id="Products"> Productos </h1>`
        titulo.innerHTML += `<p id="Subt"> Verás aqui todos los productos de la categoria ${categorias.catName} </p>`
        for (let i = 0; i<=4; i++) {
            colection.innerHTML += ` 
                <div class="Div-categorias">
                    <div class="Div-img">
                        <img src="${categorias.products[i].image}" alt="auto" class="img"></img> 
                    </div>
                    <div class="cositas">
                        <h2 class="nombre">${categorias.products[i].name} - ${categorias.products[i].currency} ${categorias.products[i].cost}</h2> 
                        <p class="desc">${categorias.products[i].description}</p>
                    </div>
                    <div class="cantidad">
                        <p class="cant">${categorias.products[i].soldCount} vendidos</p>
                    </div>
                </div>
            `;
        }   
});

document.getElementsByClassName('nav-item')[3].innerHTML += `<a class="nav-link" href="my-profile.html">${localStorage.getItem('nombre')}</a>`;
