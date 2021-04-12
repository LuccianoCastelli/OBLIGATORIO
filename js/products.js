var categoriesArray = [];

function showCards(array) {
  let htmlContentToAppend = "";
  for (let i = 0; i < array.length; i++) {
    let category = array[i];

    htmlContentToAppend +=
      `
                
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="` +
      category.imgSrc +
      `" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">` +
      category.name +
      `</h5>
                            <p class="card-text">` +
      category.description +
      `</p>
                            <p class="card-text">` +
      category.cost +
      ` ` +
      category.currency +
      `</p>
                        </div>
                    </div>
                `;
  }
  document.getElementById("idproductos").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok");

    {
      categoriesArray = resultObj.data;
      showCards(categoriesArray);
    }
  });
});

function filtroprecio(array) {
  let filtrado = [];
  let precioMin = document.getElementById("min").value;
  let precioMax = document.getElementById("max").value;
  filtrado = array.filter(
    (elemento) =>
      (!precioMin || elemento.cost <= precioMin) &&
      (!precioMax || elemento.cost <= precioMax)
  );
  showCards(filtrado);
}

document.getElementById("boton").addEventListener("click", function () {
  filtroprecio(categoriesArray);
});
