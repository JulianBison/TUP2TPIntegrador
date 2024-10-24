
let dolares = [];
fetch("https://dolarapi.com/v1/dolares")
  .then(response => response.json())
  .then(data =>{
    dolares =data;
    for(i=0;i<7;i++){
    document.write("<p>Moneda:",dolares[i].moneda,"</p>");
    document.write("<p>Casa:",dolares[i].casa,"</p>");
    document.write("<p>Nombre:",dolares[i].nombre,"</p>");
    document.write("<p>Compra:",dolares[i].compra,"</p>");
    document.write("<p>Venta:",dolares[i].venta,"</p>");
    document.write("<p>Fecha actualización:",dolares[i].fechaActualizacion,"</p>");
    }
    
  });