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
        <div class="nombre container-fluid d-flex justify-content-between"><h1>${prod.name}</h1> <button type="submit" class="btn btn-primary" id="agregar-carrito">Enviar al carrtio</button></div>
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
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="${prod.images[0]}" class="d-block img-info">
                            </div>
                            <div class="carousel-item">
                                <img src="${prod.images[1]}" class="d-block img-info">
                            </div>
                            <div class="carousel-item">
                                <img src="${prod.images[2]}" class="d-block img-info">
                            </div>
                            <div class="carousel-item">
                                <img src="${prod.images[3]}" class="d-block img-info">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>                    
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
    // document.getElementById('agregar-carrito').addEventListener('click', (e)=>{
    //     document.getElementById('info-cart').innerHTML += `
    //     <div class="col-2">
    //         <img>
    //             ${prod.images[0]}
    //         </img>
    //     </div>
    //     <div class="col-2">
    //         <p>
    //             ${prod.name}
    //         </p>
    //     </div>
    //     <div class="col-2">
    //         <p>
    //             ${prod.currency} ${prod.cost}
    //         </p>
    //     </div>
    //     <div class="col-2">
    //         <p>
    //             Cantidad
    //         </p>
    //     </div>
    //     <div class="col-2">
    //         <p>
    //             <strong>${prod.currency} ${prod.cost}</strong>
    //         </p>
    //     </div>
    //     `;
    //     localStorage.setItem('name-send-carr', prod.name);
    //     localStorage.setItem('cost-send.carr', prod.cost);
    //     localStorage.setItem('img-send-carr', prod.images[0]);
    //     localStorage.setItem('moneda-send-carr', prod.currency);
    // });
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