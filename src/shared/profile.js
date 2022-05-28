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
  document.getElementById('main-div').innerHTML = 'historic';
}
