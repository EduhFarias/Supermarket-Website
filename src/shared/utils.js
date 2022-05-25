// Check if device is mobile
function isMobile() {
  return screen.width < 992 ? true : false;
}

let count = 0;
document.getElementsByClassName('badge')[0].setAttribute('value', count);

function handleNavbar() {
  if (window.localStorage.getItem('user') != 'undefined') {
    document.getElementsByName('account-menu')[0].innerHTML =
      '<li><a class="dropdown-item" href="profile.html">Perfil</a></li>' +
      '<li><a class="dropdown-item" href="#" onclick="logout()">Sair</a></li>';
  } else {
    document.getElementsByName('account-menu')[0].innerHTML =
      '<li><a class="dropdown-item" href="signin.html">Entrar</a></li>';
  }
}
