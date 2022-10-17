const CART_INFO = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

let contenedorCarrito = document.getElementById('info-cart');

fetch(CART_INFO)
.then(respuesta => respuesta.json())
.then(datos => {
    console.log(datos);
    let preCarrito = datos.articles[0];
    console.log(preCarrito);
    contenedorCarrito.innerHTML += `
    <div class="col-2">
        <img src="${preCarrito.image}" alt="" id="img-preCarr">
    </div>
    <div class="col-2">
        <p>
            ${preCarrito.name}
        </p>
    </div>
    <div class="col-2">
        <p>
            ${preCarrito.currency} ${preCarrito.unitCost}
        </p>
    </div>
    <div class="col-2">
        <input type="number" name="cantidad" id="cantidad" min="1" value="${preCarrito.count}">
    </div>
    <div class="col-3">
        <p  id="sub-Tot"><strong>
            ${preCarrito.currency} ${preCarrito.unitCost*preCarrito.count}
        </strong> 
        </p>
    </div>
    `;
    let cant = document.getElementById('cantidad');
    cant.addEventListener('input', (e) =>{
        let precioUnit = preCarrito.unitCost;
        let subtotal = precioUnit * cant.value;
        console.log(subtotal); 
        document.getElementById('sub-Tot').innerHTML = `
                <strong>${preCarrito.currency} ${subtotal}</strong>
        `;  
    });
});