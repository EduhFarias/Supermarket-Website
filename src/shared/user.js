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
