/* Obtener datos con string de busqueda */
function search() {
  let textSearch = document.getElementById("search-text").value;
  fetch(`https://calm-depths-40785.herokuapp.com/products?text=${textSearch}`) //fetch(`http://localhost:3000/products?text=${textSearch}`)
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

/* Obtener datos con filtro */
function filterCategory(idCategory) {
  console.log(
    "en esta funcion se obtendran los datos segun filtros de categoria",
    idCategory
  );

  fetch(
    `https://calm-depths-40785.herokuapp.com/products?category=${idCategory}`
  ) //fetch(`http://localhost:3000/products?category=${idCategory}`)
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

/* Obtener todos los datos */
fetch("https://calm-depths-40785.herokuapp.com/products") //fetch("http://localhost:3000/products")
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

/* Manejo del DOM para añadir productos */
let createProductCard = (product) => {
  /* Contenedor del producto */
  let card = document.createElement("div");
  card.className = "card shadow cursor-pointer";

  /* Imagen del producto*/
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";

  let img = document.createElement("img");

  /* Si el producto viene sin imagen se inserta por default */
  if (product.url_image) {
    img.src = product.url_image;
  } else {
    img.src = "imgs/producto-sin-imagen.png";
  }
  img.className = "card-product-img";

  /* Nombre de producto */
  let title = document.createElement("h5");
  title.innerText = product.name;
  title.className = "card-title";

  /* Precio del producto */
  let color = document.createElement("div");
  color.innerText = "$ " + product.price;
  color.className = "card-price";

  /* Añadir elementos al html */
  cardBody.appendChild(img);
  cardBody.appendChild(title);
  cardBody.appendChild(color);
  card.appendChild(cardBody);
  cardContainer.appendChild(card);
};

let appendData = (data) => {
  if (cardContainer) {
    document.getElementById("card-container").innerHTML = "";
  }

  cardContainer = document.getElementById("card-container");

  console.log("dataForEach", data);

  /* Si no hay datos se muestra mensaje */
  if (data.length == 0) {
    let title = document.createElement("h5");
    title.innerText = "No se encontraron productos";
    cardContainer.appendChild(title);
  } else {
    /* Recorrer los productos obtenidos y mostrar datos */
    data.forEach((product) => {
      console.log("producto", product);
      createProductCard(product);
    });
  }
};
