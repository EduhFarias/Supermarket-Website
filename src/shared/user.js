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
      '<button type="submit" class="btn btn-primary" onclick="editUser()" style="background-color: var(--main-color); border:none">Alterar</button>' +
      '</fieldset>' +
      '</form>';

    document.getElementById('main-div').innerHTML = innerHTML;
  });
}

function paymentMethods() {
  document.getElementById('main-div').innerHTML = 'payment methods';
}

function showHistoric() {
  document.getElementById('main-div').innerHTML = 'historic';
}
