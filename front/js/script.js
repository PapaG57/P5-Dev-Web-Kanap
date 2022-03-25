// chargement de l'API
function allProducts(){
    fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(data => affichage(data))
}
allProducts();

// affichage des produits dans la page index.html
function affichage(produit){
for(p of produit){
    const codeHtml=`<a href="./product.html?id=${p._id}">
            <article>
              <img src="${p.imageUrl}" alt="${p.altTxt}">
              <h3 class="productName">${p.name}</h3>
              <p class="productDescription">${p.description}.</p>
            </article>
          </a>`;
          document.getElementById("items").insertAdjacentHTML("beforeend",codeHtml);  
   }
}
