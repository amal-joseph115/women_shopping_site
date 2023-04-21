category = "";
productList = [];
function getData() {
  return fetch("../Data/products.json").then((response) => response.json());
}

function generateProductList(data) {
  let prodListHtml = "";
  data.forEach((product) => {
    const offerString = `<div class="clearance">
                                <p class="price">$ ${product.price}</p>
                                <p> Offer $ ${product.offer}</p>
                            </div>`;
    const noOfferString = `<p>$ ${product.price}</p>`;
    prodListHtml =
      prodListHtml +
      `
                    <div class="product-wrapper">
                        <img src=${
                          product.imgSrc
                        } alt="lipstick" title="lipstick" class="image">
                        <div class="product-info">
                            <p class="name">${product.product}</p>
                            <p class="info-title">${product.productInfo}</p>
                            <p>
                                <img src="/images/star.svg" alt="star" title="star" class="review">
                                <img src="/images/star.svg" alt="star" title="star" class="review">
                                <img src="/images/star.svg" alt="star" title="star" class="review">
                            </p>
                            ${
                              product.offer ? offerString : noOfferString
                            }                    
                        </div>
                        <div class="w-100 d-flex justify-content-end px-3 my-2">
                          <button type="button" class="btn btn-primary pink-btn w-100" data-bs-toggle="modal" data-bs-target="#productModal${
                            product.productId
                          }">
                            Buy
                          </button>
                        </div> 
                    </div>
                    <div class="modal fade" id="productModal${
                      product.productId
                    }" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content">
                              <div class="modal-body py-0">
                                <div class="row">
                                  <img src=${
                                    product.imgSrc
                                  } alt="lipstick" title="lipstick" class="image col-5 p-3">
                                  <div class="dialog-product-info col-5 mt-4 ml-2">
                                    <p class="name">${product.product}</p>
                                    <p class="info-title">${
                                      product.productInfo
                                    }</p>
                                    <p>
                                        Rating: 
                                        <img src="/images/star.svg" alt="star" title="star" class="review">
                                        <img src="/images/star.svg" alt="star" title="star" class="review">
                                        <img src="/images/star.svg" alt="star" title="star" class="review">
                                    </p>
                                    <p>Price: ${product.price}</p>

                                    ${
                                      product.offer
                                        ? `<p class="offer">offer Price: ${product.offer}</p>`
                                        : ""
                                    }                    
                                  </div>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="close-btn-${
                                  product.productId
                                }">Close</button>
                                <button type="button" class="btn btn-danger" id="${
                                  product.productId
                                }" onclick="buyProduct(event.target.attributes.id.value)">Pay & Buy</button>
                              </div>
                          </div>
                      </div>  
                    </div>
                  `;
    //const btn = document.querySelector()
  });
  const element = document.querySelector("#products");
  element.innerHTML = prodListHtml;
}

function setDropdownValue(category) {
  let text = "";
  switch (category) {
    case "All": {
      text = "All Category";
      break;
    }
    case "Hair": {
      text = "Hair Care";
      break;
    }
    case "lotion": {
      text = "Body Care";
      break;
    }
    case "lipcare": {
      text = "Lip Care";
      break;
    }
    case "eyecare": {
      text = "Eye Care";
      break;
    }
  }
  const dropdownElement = document.querySelector(".dropdown-toggle");
  if (dropdownElement) {
    dropdownElement.innerHTML = text;
  }
}
function createProdListHTML(value, name) {
  category = value || category;
  if (category) {
    setDropdownValue(category);
  }
  getData().then((data) => {
    productList = data;
    const prodList = data
      .filter(
        (data) => !category || category === "All" || category === data.category
      )
      .filter(
        (data) =>
          !name || data.product.toLowerCase().includes(name.toLowerCase())
      );
    generateProductList(prodList);
  });
}

function buyProduct(id) {
  const product = productList.find((product) => product.productId === id);
  const elemId = `#close-btn-${id}`;

  document.querySelector(elemId).click();
}
