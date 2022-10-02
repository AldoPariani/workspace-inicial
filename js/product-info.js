const URL = 'https://japceibal.github.io/emercado-api/products/'
const ID = localStorage.getItem('productoElegido') + '.json';
const URLS = URL.concat(ID);
const comentarios = 'https://japceibal.github.io/emercado-api/products_comments/'
const URL_comentarios = comentarios.concat(ID);
var coment = document.getElementById('comentarios');
var boton = document.getElementById('agregar');
var texto = document.getElementById('opinion');
var stars = document.getElementById('stars');

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
    let ProdRel = producto.relatedProducts;
    console.log(ProdRel);
    for (let Rel of ProdRel) {
        let productosRelacionados = document.getElementById('Relacionados');
        productosRelacionados.innerHTML += `
            <div class="relacionado" id="${Rel.id}">
                <div>
                    <p> ${Rel.name} </p>                    
                </div> 
                <div>   
                    <img src="${Rel.image}" class="img"></img>
                </div>    
            </div>
            <hr>
        `;
    }
    document.querySelectorAll(".relacionado").forEach((e, i) => {
        e.addEventListener("click", function() {     
            window.location = "product-info.html";
            localStorage.setItem("productoElegido", (document.getElementsByClassName("relacionado")[i].id));
        });   
    });
});






fetch(URL_comentarios)
.then(promesa => promesa.json())
.then(comentarios => {
    console.log(comentarios);
    let comen = comentarios; 
    coment.innerHTML = "<div><h2><b>Comentarios</b></h2></div>";
    comen.forEach((com , index) => {
        coment.innerHTML += `
            <div class="info-coment">
                <div class="contenido">
                    <b>${com.user}</b> - ${com.dateTime} - 
                </div>
                <div class="opinion">
                    <p>${com.description}</p>
                </div>
            </div>
        `; 
        for (let i = 0; i < com.score; i++) {
            document.getElementsByClassName('contenido')[index].innerHTML += `<span class="fa fa-star checked"></span>`
        }
        for (let i = 5-com.score; i>0; i--) {
            document.getElementsByClassName('contenido')[index].innerHTML += `<span class="fa fa-star"></span>`
        }
     })        
});

boton.addEventListener('click', (e) =>{ 
    const hoy = new Date(); 
    if (((texto.value != "") && (stars.value != ""))) {
        coment.innerHTML += `
            <div class="info-coment">
                <div class="contenido">
                    <b>${localStorage.getItem('nombre')}</b> - ${hoy.toLocaleString("sv-SE")} -
                </div>
                <div class="opinion">
                    <p>${texto.value}</p>
                </div>
            </div>
        `;  
        let newcom = document.getElementsByClassName('contenido');
        for (let i = 0; i < stars.value; i++) {
            newcom[newcom.length - 1].innerHTML += `<span class="fa fa-star checked"></span>`
        }
        for (let i = 5-stars.value; i>0; i--) {
            newcom[newcom.length - 1].innerHTML += `<span class="fa fa-star"></span>`
        }
    texto.value = "";
    stars.value = "";
        
    }
});