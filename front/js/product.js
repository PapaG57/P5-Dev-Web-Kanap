// recuperation de l'ID du produit à partir du parametre de l'URL
const PRODUCT_ID = new URLSearchParams(location.search).get('id');

function productById() {
  fetch(`http://localhost:3000/api/products/${PRODUCT_ID}`)
    .then((response) => response.json())
    .then((data) => affichage(data));
}
productById();

// affichage du produit sélectionnes dans la page product.html
function affichage(product) {
  const IMG = document.querySelector('div.item__img');
  const NAME = document.getElementById('title');
  const PRICE = document.getElementById('price');
  const DESCRIPTION = document.getElementById('description');
  IMG.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  NAME.innerHTML = `${product.name}`;
  PRICE.innerHTML = `${product.price}`;
  DESCRIPTION.innerHTML = `${product.description}`;

  for (let i in product.colors) {
    colors.options[colors.options.length] = new Option(
      product.colors[i],
      product.colors[i]
    );
  }
}
