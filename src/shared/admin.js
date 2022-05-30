function showCharts() {
  document.getElementById('main-div').innerHTML =
    '<h2 style="color: var(--secondary-color)">Gráfico de desempenho</h2>' +
    '<div id="chart" style="margin: 0 auto">' +
    '<canvas id="canvas-radar"></canvas>' +
    '</div>' +
    '<div id="chart" style="margin: 0 auto">' +
    '<canvas id="canvas-bar"></canvas>' +
    '</div>';
  setupCharts();
}

let savedProducts = [];
let savedUsers = [];
let savedProdivers = [];

function manageProducts() {
  allProducts().then((products) => {
    savedProducts = products;

    let addProduct = '<li><a onclick="showProductForm()">Adicionar novo produto</a>';
    let productsList = products.map(
      (product, index) => '<li><a onclick="showProductForm(' + index + ')">' + product.name + '</a></li>'
    );

    document.getElementById('main-div').innerHTML =
      '<div class="row">' +
      '<div class="col-md-4"><ul>' +
      addProduct +
      productsList.join('') +
      '</ul></div>' +
      '<div id="product" class="col-md-8 product-form">' +
      '<div></div>';
    showProductForm();
  });
}

function showProductForm(ref = 'default') {
  let product;
  if (ref == 'default') product = new Product('', '', '', false, '', '', '');
  else product = savedProducts[ref];

  let html =
    '<h3>' +
    (product.name == '' ? 'Cadastrar' : 'Editar') +
    ' produto' +
    '</h3><form id="product-form" runat="server"><fieldset>' +
    '<div class="product-image">' +
    '<label for="image">Selecione uma imagem (PNG) para o produto</label><br />' +
    '<input id="image" type="file" accept="image/png">' +
    '</div>' +
    '<div class="product-name">' +
    '<label for="name">Nome</label><br />' +
    '<input id="name" type="text" placeholder="Nome do produto" value="' +
    product.name +
    '">' +
    '</div>' +
    '<div class="product-price">' +
    '<label for="price">Preço</label><br />' +
    '<input id="price" type="text" placeholder="XX.XX" value="' +
    product.price +
    '">' +
    '</div>' +
    '<div class="product-unit">' +
    '<label for="unit">Unidade</label><br />' +
    '<input id="unit" type="text" placeholder="Kg, L, g, mL" value="' +
    product.unit +
    '">' +
    '</div>' +
    '<div class="product-provider">' +
    '<label for="provider">Fornecedor</label><br />' +
    '<input id="provider" type="text" placeholder="Fornecedor" value="' +
    product.provider +
    '">' +
    '</div>' +
    '<div class="product-discount">' +
    '<label for="discount">Desconto %</label><br />' +
    '<input id="discount" type="text" placeholder="XX.XX" value="' +
    product.discount +
    '">' +
    '</div>' +
    '<div class="product-natural">' +
    '<label for="product-is-natural">O produto é natural</label>' +
    '<div id="product-is-natural" class="toggle" style="display: inline-flex">' +
    '<input type="checkbox" id="is-natural" ' +
    (product.isNatural == true ? 'checked' : '') +
    '>' +
    '<label for="is-natural"></label>' +
    '</div>' +
    '</div>' +
    '<button type="button" class="btn btn-primary" id="submitProduct">' +
    (product.name == '' ? 'Cadastrar' : 'Editar') +
    '</button>' +
    '<fieldset></form>';

  document.getElementById('product').innerHTML = html;

  submitProduct.onclick = (evt) => {
    setProduct();
  };
}

function manageUsers() {
  getAllUsers().then((users) => {
    savedUsers = users;
    let usersList = users.map((user, index) => '<li><a onclick="showUser(' + index + ')">' + user.name + '</a></li>');
    document.getElementById('main-div').innerHTML =
      '<div class="row">' +
      '<div class="col-md-4"><ul>' +
      usersList.join(' ') +
      '</ul></div>' +
      '<div id="user" class="col-md-8">' +
      '<div></div>';
    showUser();
  });
}

function showUser(index = 0) {
  let user = savedUsers[index];
  let html =
    '<h3>Editar usuário' +
    '</h3><form id="user-form" runat="server"><fieldset>' +
    '<div class="user-name">' +
    '<label for="name">Nome</label><br />' +
    '<input id="name" type="text" placeholder="Nome" value="' +
    user.name +
    '">' +
    '</div>' +
    '<div class="user-email">' +
    '<label for="email">Email</label><br />' +
    '<input id="email" type="text" placeholder="example@mail.com" value="' +
    user.email +
    '" disabled>' +
    '</div>' +
    '<div class="user-cpf">' +
    '<label for="cpf">CPF</label><br />' +
    '<input id="cpf" type="text" value="' +
    user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') +
    '" disabled>' +
    '</div>' +
    '<div class="user-phone">' +
    '<label for="phone">Telefone</label><br />' +
    '<input id="phone" type="text" placeholder="Telefone" value="' +
    user.phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4') +
    '" maxlength="11" minlength="11">' +
    '</div>' +
    '<div class="user-address">' +
    '<label for="address">Data de nascimento</label><br />' +
    '<textarea id="address" rows="2" placeholder="Endereço">' +
    user.address +
    '</textarea>' +
    '</div>' +
    '<div class="user-admin">' +
    '<label for="user-is-admin">O usuário é admin</label>' +
    '<div id="user-is-admin" class="toggle" style="display: inline-flex">' +
    '<input type="checkbox" id="is-admin" ' +
    (user.admin == true ? 'checked' : '') +
    '>' +
    '<label for="is-admin"></label>' +
    '</div>' +
    '</div>' +
    '<button type="button" class="btn btn-primary" id="submitUser">Editar</button>' +
    '<fieldset></form>';

  document.getElementById('user').innerHTML = html;

  submitUser.onclick = (evt) => {
    editUserAdmin(user.id);
  };
}

function manageProviders() {
  getAllProviders().then((providers) => {
    savedProdivers = providers;
    let providersList = providers.map(
      (provider, index) => '<li><a onclick="showProvider(' + index + ')">' + provider.name + '</a></li>'
    );
    document.getElementById('main-div').innerHTML =
      '<div class="row">' +
      '<div class="col-md-4"><ul>' +
      providersList.join(' ') +
      '</ul></div>' +
      '<div id="provider" class="col-md-8">' +
      '<div></div>';
    showProvider();
  });
}

function showProvider(ref = 'default') {
  let provider;
  if (ref == 'default') provider = { name: '', cnpj: '', address: '', phone: '', type: '', email: '' };
  else provider = savedProdivers[ref];
  let html =
    '<h3>' +
    (provider.name == '' ? 'Cadastrar' : 'Editar') +
    ' fornecedor' +
    '</h3><form id="provider-form" runat="server"><fieldset>' +
    '<div class="provider-name">' +
    '<label for="name">Nome</label><br />' +
    '<input id="name" type="text" placeholder="Nome" value="' +
    provider.name +
    '">' +
    '</div>' +
    '<div class="provider-email">' +
    '<label for="email">Email</label><br />' +
    '<input id="email" type="text" placeholder="example@mail.com" value="' +
    provider.email +
    '">' +
    '</div>' +
    '<div class="provider-cnpj">' +
    '<label for="cnpj">CNPJ (Somente números)</label><br />' +
    '<input id="cnpj" type="text" placeholder="01.234.567./8910-12" value="' +
    provider.cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3./$4-$5') +
    '" number minlength="14" maxlength="14" required>' +
    '</div>' +
    '<div class="provider-phone">' +
    '<label for="phone">Telefone</label><br />' +
    '<input id="phone" type="text" placeholder="Telefone" value="' +
    provider.phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4') +
    '" maxlength="11" minlength="11">' +
    '</div>' +
    '<div class="provider-address">' +
    '<label for="address">Endereço</label><br />' +
    '<textarea id="address" rows="2" placeholder="Endereço">' +
    provider.address +
    '</textarea>' +
    '<div class="provider-type">' +
    '<label for="type">Tipo de produto</label><br />' +
    '<input id="type" type="text" placeholder="Legume, limpeza, derivados do leite..." value="' +
    provider.type +
    '">' +
    '</div>' +
    '<button type="button" class="btn btn-primary" id="submitProvider">' +
    (provider.name == '' ? 'Cadastrar' : 'Editar') +
    '</button>' +
    '<fieldset></form>';

  document.getElementById('provider').innerHTML = html;

  submitProvider.onclick = (evt) => {
    setProvider();
  };
}
