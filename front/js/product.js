// recuperation de l'ID du produit a partir du parametre de l'URL
const PRODUCT_ID = new URLSearchParams(location.search).get('id');
var canape;
function productById() {
  fetch(`http://localhost:3000/api/products/${PRODUCT_ID}`)
    .then((response) => response.json())
    .then((data) => affichage(data));
}
productById();

// affichage du produit selectionne dans la page product.html
function affichage(product) {
  canape = product;
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

// ajout du produit au panier
document.getElementById('addToCart').addEventListener('click', (event) => {
  const quantity = document.getElementById('quantity');
  const color = document.getElementById('colors');
  const PRODUCTS = {
    id: PRODUCT_ID,
    name: canape.name,
    price: canape.price,
    color: color.value,
    quantity: quantity.value,
    image: canape.imageUrl,
    alt: canape.altTxt,
  };

  var tableauCanape = JSON.parse(localStorage.getItem('tableauCanape'));
  if (tableauCanape === null) {
    tableauCanape = [];
  }
  tableauCanape.push(PRODUCTS);
  localStorage.setItem('tableauCanape', JSON.stringify(tableauCanape));
});
