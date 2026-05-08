// Ajout du numéro de commande
document.getElementById('orderId').innerHTML = new URLSearchParams(
  location.search
).get('id');
