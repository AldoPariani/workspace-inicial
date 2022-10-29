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

        document.getElementById('gen-Sub').innerHTML = `
            <p class="derecha">${preCarrito.currency} ${subtotal}</p>
        `;

        document.getElementById('gen-Tot').innerHTML = `
            <p class="derecha">${preCarrito.currency} ${subtotal}</p>
        `;

        // if (document.getElementById('premium').checkValidity() === true) {
        //     document.getElementById('gen-Cost').innerHTML = `
        //         <p class="derecha">${preCarrito.currency} ${preCarrito.unitCost*preCarrito.count*0.15}</p>
        //     `;
        // } else if (document.getElementById('express')) {
        //     document.getElementById('gen-Cost').innerHTML = `
        //         <p class="derecha">${preCarrito.currency} ${preCarrito.unitCost*preCarrito.count*0.07}</p>
        //     `;
        // } else if (document.getElementById('standard')) {
        //     document.getElementById('gen-Cost').innerHTML = `
        //         <p class="derecha">${preCarrito.currency} ${preCarrito.unitCost*preCarrito.count*0.05}</p>
        //     `;
        // }
    });

    document.getElementById('general-Subt').innerHTML += `
        <div class="col-6" id="gen-Sub">
            <p class="derecha">${preCarrito.currency} ${preCarrito.unitCost*preCarrito.count}</p>
        </div>
    `;
    document.getElementById('general-Total').innerHTML += `
        <div class="col-6">
            <strong><p class="derecha" id="gen-Tot">${preCarrito.currency} ${preCarrito.unitCost*preCarrito.count}</p></strong>
        </div>
    `;
});

(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            opcionmodal();
            direccion();

            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            } else {
                event.preventDefault()
                document.getElementById("ok").classList.remove("filtro");
                setTimeout(function() {
                    location.reload();
                }, 4000);
            }
            form.classList.add('was-validated')
            
        }, false)
    })
})()

function opcionmodal() {
    if (document.getElementById('tarjeta').checked) {
        document.getElementById('N-cuenta').disabled = true;
        document.getElementById('N-tarjeta').disabled = false;
        document.getElementById('C-seg').disabled = false;
        document.getElementById('Vencimiento').disabled = false;
        document.getElementById('P-error').classList.add('filtro');
        if ((document.getElementById('N-tarjeta').value == "")) {
            document.getElementById('llenar-datos').classList.remove('filtro');
        } else if ((document.getElementById('C-seg').value == "")) {
            document.getElementById('llenar-datos').classList.remove('filtro');
        } else if ((document.getElementById('Vencimiento').value == "")) {
            document.getElementById('llenar-datos').classList.remove('filtro');
        } else {
            document.getElementById('llenar-datos').classList.add('filtro');
        }
    } else if (document.getElementById('banco').checked) {
        document.getElementById('N-cuenta').disabled = false;
        document.getElementById('N-tarjeta').disabled = true;
        document.getElementById('C-seg').disabled = true;
        document.getElementById('Vencimiento').disabled = true;
        document.getElementById('P-error').classList.add('filtro');
        if ((document.getElementById('N-cuenta').value == "")) {
            document.getElementById('llenar-datos').classList.remove('filtro');
        } else {
            document.getElementById('llenar-datos').classList.add('filtro');
        }
    } else {
        document.getElementById('P-error').classList.remove('filtro');
    }
}

function direccion() {
    if ((document.getElementById('calle').value == "")) {
        document.getElementById('P-dirrecion').classList.remove('filtro');
    } else if ((document.getElementById('numero').value == "")) {
        document.getElementById('P-dirrecion').classList.remove('filtro');
    } else if ((document.getElementById('esquina').value == "")) {
        document.getElementById('P-dirrecion').classList.remove('filtro');
    } else {
        document.getElementById('P-dirrecion').classList.add('filtro');
    }
}

function comprado() {
    document.getElementById("ok").classList.remove("filtro");
    setTimeout(function() {
        location.reload();
    }, 3000);
}
