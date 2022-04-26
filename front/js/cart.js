// recuperation des produits choisis
var tableauCanape = JSON.parse(localStorage.getItem('tableauCanape'));

function affichageCanape() {
  for (let i = 0; i < tableauCanape.length; i++) {
    console.log(tableauCanape[i]);
    const CODEHTML = `<article class="cart__item" data-id="${tableauCanape[i].id}" data-color="${tableauCanape[i].color}">
                <div class="cart__item__img">
                  <img src="${tableauCanape[i].image}" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${tableauCanape[i].name}</h2>
                    <p>${tableauCanape[i].color}</p>
                    <p>${tableauCanape[i].price}</p>
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
  }
}
affichageCanape();
