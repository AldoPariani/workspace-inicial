let PrimerName = document.getElementById('validationDefault01')
let SegundoName = document.getElementById('validationDefault012')
let PrimerApellido = document.getElementById('validationDefault02')
let SegundoApellido = document.getElementById('validationDefault022')
let Numero = document.getElementById('validationDefaultNumber')
let email = document.getElementById('validationDefaultUsername');

PrimerName.value = localStorage.getItem('PrimerNombre');
SegundoName.value = localStorage.getItem('SegundoNombre');
PrimerApellido.value = localStorage.getItem('PrimerApellido');
SegundoApellido.value = localStorage.getItem('SegundoApellido');
email.value = localStorage.getItem('nombre');
Numero.value = localStorage.getItem('Numero');

(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                localStorage.setItem('PrimerNombre', PrimerName.value);
                localStorage.setItem('SegundoNombre', SegundoName.value);
                localStorage.setItem('PrimerApellido', PrimerApellido.value);
                localStorage.setItem('SegundoApellido', SegundoApellido.value);
                localStorage.setItem('Numero', Numero.value);
                event.preventDefault();
                Guardado();
            }
            form.classList.add('was-validated')
        }, false)
    })
})()


function Guardado() {
    document.getElementById("ok").classList.remove("filtro");
    setTimeout(function() {
        document.getElementById("ok").classList.add("filtro");
    }, 4000);
}