 var user = document.getElementById('email-input');
 var pass = document.getElementById('password-input');
 var googleLog = document.getElementById('login');

 document.getElementById('boton-log').addEventListener('click', function login() {
    if ((user.value !== "") && (pass.value !== "")) {
        window.location = "index.html";
    } else if (user.value == "") {
        alert("No ha ingresado un email");
    } else if (pass.value == "") {
        alert("No ha ingresado una contraseña");
    }
});
