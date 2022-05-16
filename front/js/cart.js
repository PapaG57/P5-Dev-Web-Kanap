// recuperation des produits choisis
var tableauCanape = JSON.parse(localStorage.getItem('tableauCanape'));

function affichageCanape() {
  for (let i = 0; i < tableauCanape.length; i++) {
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

// supprimer article(s)
const MOINS = document.querySelectorAll('.deleteItem');
for (let i = 0; i < MOINS.length; i++) {
  MOINS[i].addEventListener('click', (Event) => {
    Event.preventDefault();
    tableauCanape.splice(i, 1);
    localStorage.setItem('tableauCanape', JSON.stringify(tableauCanape));
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

// remplissage du formulaire
document.getElementById('order').addEventListener('click', (event) => {
  event.preventDefault();
  let products = [];
  for (let i = 0; i < tableauCanape.length; i++) {
    products.push(tableauCanape[i].id);
  }
  var firstName = document.getElementById('firstName');
  var lastName = document.getElementById('lastName');
  var address = document.getElementById('address');
  var city = document.getElementById('city');
  var email = document.getElementById('email');
  const FORMULAIRE = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    products,
  };
  fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(FORMULAIRE),
  })
    .then((response) => response.json())
    .then((id) => {
      // localStorage.clear();
      document.location.href = `confirmation.html?id=${id.orderId}`;
    })
    .catch((error) => {
      console.log(error);
    });
});
