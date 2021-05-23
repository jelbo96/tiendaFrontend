function search() {
  let textSearch = document.getElementById("search-text").value;

  //fetch(`http://localhost:3000/products?text=${textSearch}`)
  fetch(`https://calm-depths-40785.herokuapp.com/products?text=${textSearch}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("enviando a appenddata", data.rows);
      appendData(data.rows);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });
}

//fetch("http://localhost:3000/products")
fetch("https://calm-depths-40785.herokuapp.com/products")
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
  console.log("creando producto", product);
  let card = document.createElement("div");
  card.className = "card shadow cursor-pointer";

  /* Imagen */
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";

  let img = document.createElement("img");

  if (product.url_image) {
    img.src = product.url_image;
  } else {
    img.src = "imgs/producto-sin-imagen.png";
  }
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
    //document.getElementById("card-container").replaceWith(cardContainer);
    document.getElementById("card-container").innerHTML = "";
  }

  cardContainer = document.getElementById("card-container");

  console.log("dataForEach", data);

  if (data.length == 0) {
    let title = document.createElement("h5");
    title.innerText = "No se encontraron productos";
    cardContainer.appendChild(title);
  } else {
    data.forEach((product) => {
      console.log("producto", product);
      createProductCard(product);
    });
  }
};
