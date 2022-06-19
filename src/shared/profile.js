function editProfile() {
  getCurrentUser().then((userData) => {
    let innerHTML =
      '<form class="profile">' +
      '<fieldset>' +
      '<legend style="color: var(--alternative-color)">Dados Pessoais</legend>' +
      '<div class="mb-3">' +
      '<label for="name" class="form-label">Nome</label>' +
      '<input type="text" id="name" class="form-control" placeholder="Nome" value="' +
      userData.name +
      '"/>' +
      '</div>' +
      '<div class="mb-3">' +
      '<label for="address" class="form-label">Endereço</label>' +
      '<textarea class="form-control" id="address" rows="2" placeholder="Endereço">' +
      userData.address +
      '</textarea>' +
      '</div>' +
      '<div class="mb-3">' +
      '<label for="phone" class="form-label">Telefone</label>' +
      '<input type="text" id="phone" class="form-control" placeholder="(01) 9 8765-4321" maxlength="11" minlength="11" value="' +
      userData.phone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4') +
      '"/>' +
      '</div>' +
      '</div>' +
      '<div class="mb-3">' +
      '<label for="cpf" class="form-label">CPF</label>' +
      '<input type="text" id="cpf" class="form-control" disabled value="' +
      userData.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') +
      '"/>' +
      '</div>' +
      '<div class="mb-3">' +
      '<label class="formLabel" for="birthday">Data de nascimento:</label>' +
      '<input class="form-control" id="birthday" name="birthday" type="date" value="' +
      userData.birthday +
      '" />' +
      '</div>' +
      '<button type="button" class="btn btn-primary" onclick="editUser()" style="background-color: var(--main-color); border:none">Alterar</button>' +
      '</fieldset>' +
      '</form>';

    document.getElementById('main-div').innerHTML = innerHTML;
  });
}

function paymentMethods() {
  getUserCard().then((card) => {
    if (Object.keys(card).length === 0) card = { cvc: '', name: '', number: '', validity: '' };
    else window.sessionStorage.setItem('registerCard', 'false');

    let cardF =
      '<div class="col-md-5 credit-card">' +
      '<span class="bank-name">BANK</span>' +
      '<div class="chip"><i class="fa-solid fa-dollar-sign custom-dollar"></i></div>' +
      '<div class="card-number">' +
      '<label for="number">Número do cartão</label><br/>' +
      '<input class="form-control" type="text" id="number" minlength="19" maxlength="19" value="' +
      card.number +
      '" placeholder="XXXX XXXX XXXX XXXX" number>' +
      '</div>' +
      '<div class="card-validity">' +
      '<label for="validity">Validade</label><br/>' +
      '<input id="validity" type="month" value="' +
      card.validity +
      '">' +
      '</div>' +
      '<div class="card-name">' +
      '<label for="name">Nome</label><br/>' +
      '<input type="text" id="name" value="' +
      card.name +
      '" placeholder="NOME COMO DESCRITO NO CARTÃO">' +
      '</div>' +
      '</div>';
    let cardB =
      '<div class="col-md-5 credit-card">' +
      '<div class="mag-strip"></div>' +
      '<div class="signature">' +
      '<p style="color: black">Assinatura</p><div class="cvc-code"><input id="cvc" type="string" minlength="3" maxlength="3" value="' +
      card.cvc +
      '" placeholder="CVC" number></div>' +
      '</div>' +
      '<div class="hologram"><i class="fa fa-star custom-star"></i></div>' +
      '</div>';
    document.getElementById('main-div').innerHTML =
      '<form id="credit-card"><h3>Fazer cadastro do cartão de crédito</h3><fieldset><div class="row">' +
      cardF +
      cardB +
      '<div class="col-md-2" style="text-align: center">' +
      '<button type="button" class="btn btn-primary submit-card" onclick="setCard()">Cadastrar</button>' +
      '</div></div></fieldset></form>';
  });
}

function showHistoric() {
  getUserPurchases().then((purchases) => {
    let html = '<div class="row historic-block">';
    purchases.forEach((purchase, index) => {
      html +=
        '<div class="col-12 card-historic" name="card-historic" id="' +
        index +
        '">' +
        '<span class="card-historic-date" >' +
        new Date(purchase.obj.created.seconds * 1000).toLocaleString() +
        '</span><hr/>' +
        '<span class="card-historic-value"> Valor total da compra: R$ ' +
        (purchase.obj.payment === 'pix' ? purchase.obj.pixValue : purchase.obj.totalValue) +
        '</span>' +
        '</div><br />';
    });
    document.getElementById('main-div').innerHTML = html + '</div>';

    document.getElementsByName('card-historic').forEach((card) => {
      card.addEventListener('click', (event) => {
        if (event.target.id) displayCard(purchases[event.target.id].obj);
      });
    });
  });
}

function displayCard(obj) {
  let html =
    '<div class="row"><div class="col-9" style="max-height: 600px;overflow-y: auto;"><h3 style="margin-left: 10px"><i class="fa-solid fa-basket-shopping"></i>PRODUTOS</h3>';
  obj.products.forEach((product) => {
    const auxObj = new Product('', product.price, '', '', '', '', product.discount, '');
    html +=
      '<div class="cart-product row">' +
      '<div class="col-2"><img src="./fonts/products/' +
      product.imgSrc +
      '"></div>' +
      '<div class="col-6"><span class="span-cart-provider">' +
      product.provider +
      '</span><br />' +
      '<span>' +
      product.name +
      ', ' +
      product.unit +
      ', ' +
      product.provider +
      (product.isNatural ? ', Produto natural' : '') +
      '</span></div>' +
      '<div class="col-2">' +
      '<span>Quantidade(' +
      product.unit +
      '):</span>' +
      '<input type="text" name="amount" value="' +
      product.amount +
      '" style="width: 40px" disabled>' +
      '<br />' +
      '</div>' +
      '<div class="col-2"><span>Preço:' +
      (product.discount == '0.0'
        ? '<p class="value" style="font-size: 20px">R$ ' + product.price + '</p>'
        : '<p class="dashed-value" style="font-size: 16px; margin-bottom: -5px">R$ ' +
          product.price +
          '</p>' +
          '<p class="value" style="font-size: 20px">R$ ' +
          auxObj.getDiscountPrice() +
          '</p>') +
      '</span></div>' +
      '</div>';
  });

  html +=
    '</div>' +
    '<div class="col-3">' +
    '<h3>' +
    '<i class="fa-solid fa-file-invoice-dollar"></i>' +
    'RESUMO' +
    '</h3>' +
    '<p>Valor total dos produtos: <span style="font-weight: bolder" id="total">R$ ' +
    obj.totalValue +
    '</span></p><hr />' +
    '<div class="col-12 pix"><h5>Valor no <b>PIX</b>: <span style="font-weight: bolder" id="pix">R$ ' +
    obj.pixValue +
    '</span></h5><p style="text-align:left; left:10%">(Economize: <b>R$ ' +
    obj.discount +
    '</b>)</p></div>' +
    '<hr />' +
    '<span>Frete: ' +
    (obj.shipping === 'local' ? 'Buscado pessoalmente' : 'Entregue no endereço com taxa de R$: 5,00') +
    '<span>' +
    '<hr />' +
    '<span>Forma de pagamento: ' +
    (obj.payment === 'pix' ? 'Pago utilizando o PIX' : 'Pago no cartão e parcelando em ' + obj.stages + 'x') +
    '<span>' +
    '</div>';
  document.getElementById('modal-body').innerHTML = html;
  var myModal = new bootstrap.Modal(document.getElementById('historicCardModal'));
  myModal.show();
}

function checkInitialCondition() {
  if (window.sessionStorage.getItem('registerCard') === 'true') paymentMethods();
  else editProfile();
}
