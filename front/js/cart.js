// recuperation des produits choisis
var tableauCanape = JSON.parse(localStorage.getItem('tableauCanape'));

// affichage de tous les produits
function affichageCanape() {
  for (let i = 0; i < tableauCanape.length; i++) {
    // calcul du prix total par ligne de produits
    var totalPrice = tableauCanape[i].price * tableauCanape[i].quantity;
    const CODEHTML = `<article class="cart__item" data-id="${tableauCanape[i].id}" data-color="${tableauCanape[i].color}">
                  <div class="cart__item__img">
                    <img src="${tableauCanape[i].image}" alt="Photographie d'un canapé">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${tableauCanape[i].name}</h2>
                      <p>${tableauCanape[i].color}</p>
                      <p>${totalPrice} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${tableauCanape[i].quantity}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>`;
    document
      .getElementById('cart__items')
      .insertAdjacentHTML('beforeend', CODEHTML);
    if (tableauCanape[i].id == tableauCanape[i].id) {
      tableauCanape[i].quantity = tableauCanape[i].quantity;
      +1;
    }
  }
}
affichageCanape();

// supprimer un article
const MOINS = document.querySelectorAll('.deleteItem');
for (let i = 0; i < MOINS.length; i++) {
  MOINS[i].addEventListener('click', (Event) => {
    Event.preventDefault();
    tableauCanape.splice(i, 1);
    localStorage.setItem('tableauCanape', JSON.stringify(tableauCanape));
    location.reload();
  });
}

// changer la quantité d'un article à partir du panier
const ajoutPanier = document.querySelectorAll('.itemQuantity');
for (let i = 0; i < ajoutPanier.length; i++) {
  ajoutPanier[i].addEventListener('change', (event) => {
    event.preventDefault();

    // récupération de la nouvelle quantité à partir du champ quantité
    const newQuantity = event.target.value;
    const PRODUCTS = {
      id: tableauCanape[i].id,
      name: tableauCanape[i].name,
      price: tableauCanape[i].price,
      color: tableauCanape[i].color,
      quantity: newQuantity,
      image: tableauCanape[i].image,
      alt: tableauCanape[i].alt,
    };
    tableauCanape[i] = PRODUCTS;
    localStorage.clear();
    localStorage.setItem('tableauCanape', JSON.stringify(tableauCanape));

    // permet de réactualiser la page
    location.reload();
  });
}

// afficher le prix global et le nombre d'article
function affichageTotaux() {
  let TotalPrice = 0;
  let TotalQuantity = 0;
  for (let i = 0; i < tableauCanape.length; i++) {
    const TOTAL =
      tableauCanape[i].price * parseInt(tableauCanape[i].quantity, 10);
    TotalPrice += TOTAL;
    TotalQuantity += parseInt(tableauCanape[i].quantity, 10);
  }
  document.getElementById('totalPrice').textContent = TotalPrice;
  document.getElementById('totalQuantity').textContent = TotalQuantity;
}
affichageTotaux();

// déclarations des variables pour l'envoi de la requète
var products = [];
var firstName = document.getElementById('firstName');
var lastName = document.getElementById('lastName');
var address = document.getElementById('address');
var city = document.getElementById('city');
var email = document.getElementById('email');

var firstNameValid = false;
var lastNameValid = false;
var addressValid = false;
var cityValid = false;
var emailValid = false;

// vérification la modification de firstName
const validFirstName = function (inputFirstName) {
  //Creation de la reg exp pour validation prénom
  let firstNameRegExp = new RegExp('^[-a-zA-ZÀ-ÖØ-öø-ÿs]{3,}$');

  // On teste l'expression régulière
  if (firstNameRegExp.test(inputFirstName)) {
    firstNameValid = true;
    document.getElementById('firstNameErrorMsg').innerText = '';
  } else {
    document.getElementById('firstNameErrorMsg').innerText =
      "Le prénom n'est pas valide !";
    firstNameValid = false;
  }
};
document.getElementById('firstName').addEventListener('change', () => {
  validFirstName(firstName.value);
});

// vérification la modification de lastName
const validLastName = function (inputLastName) {
  //Creation de la reg exp pour validation nom
  let lastNameRegExp = new RegExp('^[-a-zA-ZÀ-ÖØ-öø-ÿs]{3,}$');

  // On teste l'expression régulière
  if (lastNameRegExp.test(inputLastName)) {
    lastNameValid = true;
    document.getElementById('lastNameErrorMsg').innerText = '';
  } else {
    document.getElementById('lastNameErrorMsg').innerText =
      "Le nom n'est pas valide !";
    lastNameValid = false;
  }
};
document.getElementById('lastName').addEventListener('change', () => {
  validLastName(lastName.value);
});

// vérification la modification d'adresse
const validAddress = function (inputAddress) {
  //Creation de la reg exp pour validation de l'adresse postale
  let addressRegExp = new RegExp('[#.0-9,a-zA-Zs,-_]');
  // On teste l'expression régulière
  if (addressRegExp.test(inputAddress)) {
    addressValid = true;
    document.getElementById('addressErrorMsg').innerText = '';
  } else {
    document.getElementById('addressErrorMsg').innerText =
      "L'adresse n'est pas valide !";
    addressValid = false;
  }
};
document.getElementById('address').addEventListener('change', () => {
  validAddress(address.value);
});

// vérification la modification de la ville
const validCity = function (inputCity) {
  //Creation de la reg exp pour validation de la ville
  let cityRegExp = new RegExp('^[-a-zA-ZÀ-ÖØ-öø-ÿs]{3,}$');

  // On teste l'expression régulière
  if (cityRegExp.test(inputCity)) {
    cityValid = true;
    document.getElementById('cityErrorMsg').innerText = '';
  } else {
    document.getElementById('cityErrorMsg').innerText =
      "Le nom de la ville n'est pas valide !";
    cityValid = false;
  }
};
document.getElementById('city').addEventListener('change', () => {
  validCity(city.value);
});

// vérification la modification de l'email
const validEmail = function (inputEmail) {
  //Creation de la reg exp pour validation email
  let emailRegExp = new RegExp(
    '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$',
    'g'
  );

  // On teste l'expression régulière
  if (emailRegExp.test(inputEmail)) {
    emailValid = true;
    document.getElementById('emailErrorMsg').innerText = '';
  } else {
    document.getElementById('emailErrorMsg').innerText =
      "Le mail n'est pas valide !";
    emailValid = false;
  }
};

// vérification la modification de l'email
document.getElementById('email').addEventListener('change', () => {
  validEmail(email.value);
});

// remplissage du formulaire
document.getElementById('order').addEventListener('click', (event) => {
  event.preventDefault();

  // vérification de la validation des champs
  // si tous les champs sont valident, exécution de la requête Post
  if (
    emailValid &&
    firstNameValid &&
    lastNameValid &&
    cityValid &&
    addressValid
  ) {
    for (let i = 0; i < tableauCanape.length; i++) {
      products.push(tableauCanape[i].id);
    }

    // formalisation du tableau du json de contact
    const formulaire = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products,
    };

    // envoi du formulaire et effacement du localStorage
    fetch('http://localhost:3000/api/products/order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formulaire),
    })
      .then((response) => response.json())
      .then((id) => {
        document.location.href = `confirmation.html?id=${id.orderId}`;
      })
      .catch((error) => {});
    localStorage.clear();
  } else {
    alert(
      'Veuillez vérifier que tous les champs soient correctement renseignés !'
    );
  }
});
