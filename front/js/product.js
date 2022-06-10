// recuperation de l'ID du produit a partir du parametre de l'URL
const PRODUCT_ID = new URLSearchParams(location.search).get('id');
var canape;

// requête pour récupérer un seul produit et exécution de la fonction d'affichage
function productById() {
  fetch(`http://localhost:3000/api/products/${PRODUCT_ID}`)
    .then((response) => response.json())
    .then((data) => affichage(data));
}
productById();

// affichage du produit selectionné dans la page "Produit"
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

  // choix de la couleur
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

  if (quantity.value != 0 && color.value != '') {
    // tableau json de la quantité et de la couleur choisie
    const PRODUCTS = {
      id: PRODUCT_ID,
      name: canape.name,
      color: color.value,
      quantity: quantity.value,
      image: canape.imageUrl,
      alt: canape.altTxt,
    };

    // gestion du tableau canapé
    var tableauCanape = JSON.parse(localStorage.getItem('tableauCanape'));
    if (tableauCanape === null) {
      tableauCanape = [];
    }

    // gestion de couleur pour les canapés choisis
    let trouve = false;
    tableauCanape.forEach((element) => {
      if (element.color === color.value && element.id === PRODUCT_ID) {
        element.quantity = quantity.value;
        trouve = true;
      }
    });
    if (!trouve) {
      tableauCanape.push(PRODUCTS);
    }

    // ajout du produit dans le localStorage
    localStorage.setItem('tableauCanape', JSON.stringify(tableauCanape));

    // redirection à la page d'accueil
    window.location.href = './index.html';
  } else {
    alert(
      'Veuillez vérifier que les champs couleur et quantité sont correctement remplis !'
    );
  }
});
