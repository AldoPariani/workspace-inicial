const CART_INFO = "https://japceibal.github.io/emercado-api/user_cart/25801.json";

fetch(CART_INFO)
.then(respuesta => respuesta.json())
.then(datos => {
    console.log(datos);
});