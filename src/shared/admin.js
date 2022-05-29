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
  document.getElementById('main-div').innerHTML = 'manage users';
}

function manageProviders() {
  document.getElementById('main-div').innerHTML = 'manage providers';
}
