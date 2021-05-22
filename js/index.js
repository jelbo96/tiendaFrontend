//fetch("https://calm-depths-40785.herokuapp.com/products")
fetch("http://localhost:3000/products")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data.rows);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

let cardContainer;

let createProductCard = (product) => {
  console.log(product);
  let card = document.createElement("div");
  card.className = "card shadow cursor-pointer";

  /* Imagen */
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";

  let img = document.createElement("img");
  img.src = product.url_image;
  img.className = "card-product-img";

  let title = document.createElement("h5");
  title.innerText = product.name;
  title.className = "card-title";

  let color = document.createElement("div");
  color.innerText = "$ " + product.price;
  color.className = "card-price";

  cardBody.appendChild(img);
  cardBody.appendChild(title);
  cardBody.appendChild(color);
  card.appendChild(cardBody);
  cardContainer.appendChild(card);
};

let appendData = (data) => {
  console.log("data", data);
  if (cardContainer) {
    document.getElementById("card-container").replaceWith(cardContainer);
    return;
  }

  cardContainer = document.getElementById("card-container");

  data.forEach((product) => {
    createProductCard(product);
  });
};
