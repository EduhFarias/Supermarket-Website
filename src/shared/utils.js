// Check if device is mobile
function isMobile() {
  return screen.width < 992 ? true : false;
}

function handleNavbar() {
  if (window.sessionStorage.getItem('user') != 'undefined') {
    document.getElementsByName('account-menu')[0].innerHTML =
      '<li><a class="dropdown-item" href="profile.html">Perfil</a></li>';
    if (window.sessionStorage.getItem('admin') == 'true') {
      document.getElementsByName('account-menu')[0].innerHTML +=
        '<li><a class="dropdown-item" href="admin.html">Admin</a></li>';
    }
    document.getElementsByName('account-menu')[0].innerHTML +=
      '<li><a class="dropdown-item" href="#" onclick="logout()">Sair</a></li>';
  } else {
    document.getElementsByName('account-menu')[0].innerHTML =
      '<li><a class="dropdown-item" href="signin.html">Entrar</a></li>';
  }
}

let count = window.sessionStorage.getItem('count') == null ? 0 : window.sessionStorage.getItem('count');
document.getElementsByClassName('badge')[0].setAttribute('value', count);
let listedProducts = [];
let productsInCart = [];

function preLoadCart() {
  productsInCart =
    window.sessionStorage.getItem('productsInCart') == null
      ? []
      : JSON.parse(window.sessionStorage.getItem('productsInCart'));

  productsInCart.forEach((product) => added(product.name));
}

function addToCart(idx) {
  if (
    !productsInCart.some((product) => {
      if (product.id === listedProducts[idx].id) {
        return true;
      }
      return false;
    })
  ) {
    listedProducts[idx].amount = 1.0;
    productsInCart.push(listedProducts[idx]);
    count++;
  } else {
    productsInCart.splice(productsInCart.indexOf(listedProducts[idx]), 1);
    count--;
  }
  document.getElementsByClassName('badge')[0].setAttribute('value', count);
  window.sessionStorage.setItem('count', count);
  window.sessionStorage.setItem('productsInCart', JSON.stringify(productsInCart));
  added(listedProducts[idx].name);
}

function added(id) {
  document.getElementById(id).classList.toggle('product-added');
}
