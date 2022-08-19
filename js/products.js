const URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json'

fetch(URL)
.then(respuesta => respuesta.json())
.then (Autos =>{
        console.log(Autos)
        var titulo = document.getElementById('Productos');
        var colection = document.getElementById('Cars');
        titulo.innerHTML += `<h1 id="Products"> Productos </h1>`
        titulo.innerHTML += `<p id="Subt"> Verás aqui todos los productos de la categoria Autos </p>`
        for (let i = 0; i<=4; i++) {
            colection.innerHTML += ` 
                <div class="Div-autos">
                    <div class="Div-img">
                        <img src="${Autos.products[i].image}" alt="auto" class="img"></img> 
                    </div>
                    <div class="cositas">
                        <h2 class="nombre">${Autos.products[i].name} - ${Autos.products[i].currency} ${Autos.products[i].cost}</h2> 
                        <p class="desc">${Autos.products[i].description}</p>
                    </div>
                    <div class="cantidad">
                        <p class="cant">${Autos.products[i].soldCount} vendidos</p>
                    </div>
                </div>
            `;
        }
    
    });