async function getCurrentUser() {
  let userUID = window.localStorage.getItem('user');
  let userData = db
    .collection('users')
    .doc(userUID)
    .get()
    .then((docRef) => {
      if (docRef.data()) return docRef.data();
      return {};
    })
    .catch((error) => {
      console.log('User not found: ', error.error);
    });
  return await userData;
}

function editUserAdmin(userID) {
  const docRef = document.getElementById('user-form');
  db.collection('users')
    .doc(userID)
    .update({
      address: docRef['address'].value,
      name: docRef['name'].value,
      phone: docRef['phone'].value,
      admin: docRef['is-admin'].checked,
    })
    .then(function () {
      manageUsers();
      alert('Conta alterada com sucesso');
    })
    .catch(function (error) {
      console.log('Error setting:', error);
    });
}

async function getAllUsers() {
  return await db
    .collection('users')
    .get()
    .then((querySnapshot) => {
      let docs = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      return docs;
    });
}

function setCard() {
  const cardData = document.getElementById('credit-card');
  db.collection('cards')
    .doc(window.localStorage.getItem('user'))
    .set({
      number: cardData['number'].value,
      cvc: cardData['cvc'].value,
      name: cardData['name'].value,
      validity: cardData['validity'].value,
    })
    .then(() => alert('Cartão cadastrado com sucesso'))
    .catch((error) => console.log(error));
}

async function getUserCard() {
  let userUID = window.localStorage.getItem('user');
  let userCard = db
    .collection('cards')
    .doc(userUID)
    .get()
    .then((docRef) => {
      if (docRef.data()) return docRef.data();
      return {};
    })
    .catch((error) => {
      console.log('User not found: ', error.error);
      return {};
    });
  return await userCard;
}

async function getUserHistoric() {
  let userUID = window.localStorage.getItem('user');
  let userHistoric = db
    .collection('cards')
    .doc(userUID)
    .get()
    .then((docRef) => {
      if (docRef.data()) return docRef.data();
      return {};
    })
    .catch((error) => {
      console.log('User not found: ', error.error);
    });
  return await userHistoric;
}

function editUser() {
  const docRef = document.getElementsByClassName('profile')[0];
  db.collection('users')
    .doc(window.localStorage.getItem('user'))
    .update({
      address: docRef['address'].value,
      cpf: docRef['cpf'].value,
      birthday: docRef['birthday'].value,
      name: docRef['name'].value,
      phone: docRef['phone'].value,
    })
    .then(function () {
      editProfile();
      alert('Conta alterada com sucesso');
    })
    .catch(function (error) {
      console.log('Error setting:', error);
    });
}

function setProvider() {
  const docRef = document.getElementById('provider-form');
  let id = docRef['name'].value.toLowerCase().replace(' ', '-');
  db.collection('providers')
    .doc(id)
    .set({
      cnpj: docRef['cnpj'].value,
      name: docRef['name'].value,
      type: docRef['type'].value,
      phone: docRef['phone'].value,
      address: docRef['address'].value,
      email: docRef['email'].value,
    })
    .then(() => {
      alert('Fornecedor cadastrado com sucesso');
      manageProviders();
    })
    .catch((error) => console.log(error));
}

async function getAllProviders() {
  return await db
    .collection('providers')
    .get()
    .then((querySnapshot) => {
      let docs = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      return docs;
    });
}
