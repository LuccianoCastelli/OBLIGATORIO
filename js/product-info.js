function showComments(array) {
  let htmlContentToAppend = "";
  for (let i = 0; i < array.length; i++) {
    let comment = array[i];

    htmlContentToAppend +=
      `<div class="list-group-item">
        <div class="row">
           <div class="col">
           <div class="d-flex w-100 justify-content-between">
           <h4 class="mb-1">` +
      comment.score +
      `/5 </h4>
           <small class = "text-muted"> ` +
      comment.user +
      ` </small>
           <small class = "text-muted"> ` +
      comment.dateTime +
      ` </small>
           </div>
           <div> ` +
      comment.description +
      `</div>
           </div>
        </div>
     </div>
        `;
  }

  document.getElementById("comment-list").innerHTML = htmlContentToAppend;
}

var category = {};

function showImagesGallery(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let imageSrc = array[i];

    htmlContentToAppend +=
      `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` +
      imageSrc +
      `" alt="">
            </div>
        </div>
        `;
    document.getElementById("product-info").innerHTML = htmlContentToAppend;
  }
}

var productsArray = [];
var relatedArray = [];

function showRecomendados(array, productosRelacionados) {
  let htmlContentToAppend = "";
  for (let i = 0; i < productosRelacionados.length; i++) {
    let category = array[productosRelacionados[i]];

    htmlContentToAppend +=
      `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` +
      category.imgSrc +
      `" alt="` +
      category.desc +
      `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` +
      category.name +
      `</h4>
                        <small class="text-muted">` +
      category.soldCount +
      ` artículos</small>
                    </div>
                    <div>` +
      category.cost +
      ` ` +
      category.currency +
      `</div> 
                    <div>` +
      category.description +
      `</div>

                </div>
            </div>
        </div>
        `;
    document.getElementById("otrosProductos").innerHTML = htmlContentToAppend;
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      category = resultObj.data;

      let productNameHTML = document.getElementById("productName");
      let productDescriptionHTML = document.getElementById(
        "productDescription"
      );
      let productCostHTML = document.getElementById("productCost");
      let productSoldHTML = document.getElementById("productSold");
      let productCurrencyHTML = document.getElementById("productCurrency");

      productNameHTML.innerHTML = category.name;
      productDescriptionHTML.innerHTML = category.description;
      productCostHTML.innerHTML = category.cost;
      productSoldHTML.innerHTML = category.soldCount;
      productCurrencyHTML.innerHTML = category.currency;

      getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
          productsArray = resultObj.data;
          showComments(productsArray);
        }

        getJSONData(PRODUCTS_URL).then(function (resultObj) {
          if (resultObj.status === "ok") {
            let productsArray = resultObj.data;
            showRecomendados(productsArray, category.relatedProducts);
          }
        });
      });

      showImagesGallery(category.images);
    }
  });
});
