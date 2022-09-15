const URL = 'https://japceibal.github.io/emercado-api/products/'
const ID = localStorage.getItem('productoElegido') + '.json';
const URLS = URL.concat(ID);
const comentarios = 'https://japceibal.github.io/emercado-api/products_comments/'
const URL_comentarios = comentarios.concat(ID);

fetch(URLS)
.then(respuesta => respuesta.json())
.then(producto => {
    console.log(producto);
    let prod = producto;
    var info = document.getElementById('producto')
    info.innerHTML +=` 
        <div class="nombre"><h1>${prod.name}</h1></div>
        <div class="info-prod"> 
            <div class="precio">
                <p><b>Precio</b></p>
                <p>${prod.currency} ${prod.cost}</p>
            </div>
            <div class=""descripcion>
                <p><b>Descripción</b></p>
                <p>${prod.description}</p>
            </div>
            <div class="info-categoria">
                <p><b>Categoria</b></p>
                <p>${prod.category}</p>
            </div>
            <div class="vendidos">
                <p><b>Cantidad de vendidos</b></p>
                <p>${prod.soldCount}</p>
            </div>
            <div class"imagenes-ilustrativas">
                <p><b>Imagenes ilustrativas</b></p>
                <div id="imagenes-info">
                    <img src="${prod.images[0]}" class="img-info"></img>
                    <img src="${prod.images[1]}" class="img-info"></img>
                    <img src="${prod.images[2]}" class="img-info"></img>
                    <img src="${prod.images[3]}" class="img-info"></img>
                </div>
            </div>
        </div>       
    `;
});

fetch(URL_comentarios)
.then(promesa => promesa.json())
.then(comentarios => {
    console.log(comentarios);
    let comen = comentarios;
    var coment = document.getElementById('comentarios');
    coment.innerHTML = "<div><h2><b>Comentarios</b></h2></div>";
    for (const com of comen) {
        coment.innerHTML += `
            <div class="info-coment">
                <div class="contenido">
                    <p><b>${com.user}</b> - ${com.dateTime} - ${com.score}</p>
                    <p>${com.description}</p>
                </div>
            </div>
        `; 
    };  
});



document.getElementsByClassName('nav-item')[3].innerHTML += `<a class="nav-link" href="my-profile.html">${localStorage.getItem('nombre')}</a>`;