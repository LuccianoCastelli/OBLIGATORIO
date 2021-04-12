let comissionPercentage = 0.15;
let PERCENTAGE_SYMBOL = "%";
let MONEY_SYMBOL = "$";
let subtotal = "subtotales2";

var articulosArray = [];
var msg = "";

function showArticulos(array) {
  let htmlContentToAppend = "";
  for (let i = 0; i < array.length; i++) {
    let article = array[i];

    if (article.currency === "USD") {
      article.unitCost = 40 * article.unitCost;
    }

    htmlContentToAppend +=
      `<div class="container mb-4">
        <div class="row">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col"> </th>
                                <th scope="col">Producto</th>
                                <th scope="col" class="text-center" type="number">Cantidad</th>
                                <th scope="col" class="text-right">Precio</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img src="` +
      article.src +
      `" /> </td>
                                <td>` +
      article.name +
      `</td>
                                <td><label id="label-cantidad` +
      i +
      `"></label> <input id="cantidad` +
      i +
      `" type="number" class="form-control" value="` +
      article.count +
      `"></td>
                                <td class="text-right">` +
      article.unitCost +
      `</td>
                                <td>UYU</td>
                                <td class="text-right"><button class="btn btn-sm btn-danger"><i class="fa fa-trash"></i> </button> </td>
                                </tr>
                                <tr>
                                <td colspan="4"></td>
                                <td colspan="2">SUBTOTAL<span id="subtotal` +
      i +
      `"></span></td><td>($)</td>
                                

                            </tr>
                                `;
  }

  document.getElementById("carrito").innerHTML = htmlContentToAppend;
}

function mostrarCostoEnvio() {
  let costoDeEnvioHTML = document.getElementById("costodeenvio");
  let valorTotal = parseInt(document.getElementById("totales").innerHTML);
  let costoDeEnvioToShow = Math.round(valorTotal * comissionPercentage);
  costoDeEnvioHTML.innerHTML = costoDeEnvioToShow;
  let total = costoDeEnvioToShow + valorTotal;
  document.getElementById("total2").innerHTML = MONEY_SYMBOL + total;
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_2).then(function (resultObj) {
    if (resultObj.status === "ok");
    {
      articulosArray = resultObj.data.articles;
      showArticulos(articulosArray);
      costo();
    }

    function sumatoriaTotal() {
      var total = 0;
      for (let i = 0; i < articulosArray.length; i++) {
        total += parseInt(
          document.getElementById("subtotal" + i).textContent,
          10
        );
      }

      document.getElementById("totales").innerHTML = total;
      document.getElementById("subtotales2").innerHTML = total;
    }

    function costo() {
      for (let i = 0; i < articulosArray.length; i++) {
        var cantidad = document.getElementById("cantidad" + i).value;
        var article = articulosArray[i];
        var precio = article.unitCost;
        var cuenta = parseInt(cantidad) * precio;
        document.getElementById("subtotal" + i).innerHTML = cuenta;
      }

      sumatoriaTotal();
    }

    for (let i = 0; i < articulosArray.length; i++) {
      document.getElementById("cantidad" + i).addEventListener("change", costo);
    }

    document.getElementById("totales").addEventListener("change", function () {
      productCost = this.value;
      updateTotalCosts();
    });

    document
      .getElementById("premiumradio")
      .addEventListener("change", function () {
        comissionPercentage = 0.15;
        mostrarCostoEnvio();
      });

    document
      .getElementById("expressradio")
      .addEventListener("change", function () {
        comissionPercentage = 0.07;
        mostrarCostoEnvio();
      });

    document
      .getElementById("estandardradio")
      .addEventListener("change", function () {
        comissionPercentage = 0.05;
        mostrarCostoEnvio();
      });

    document.getElementById("pago").addEventListener("click", function () {
      document.getElementById("numerocuenta").removeAttribute("required");
      document.getElementById("cardNumber").setAttribute("required", "");
      document.getElementById("expityMonth").setAttribute("required", "");
      document.getElementById("expityYear").setAttribute("required", "");
      document.getElementById("cvCode").setAttribute("required", "");
    });

    document.getElementById("pago2").addEventListener("click", function () {
      document.getElementById("cardNumber").removeAttribute("required");
      document.getElementById("expityMonth").removeAttribute("required");
      document.getElementById("expityYear").removeAttribute("required");
      document.getElementById("cvCode").removeAttribute("required");
      document.getElementById("numerocuenta").setAttribute("required", "");
    });
  });
});
