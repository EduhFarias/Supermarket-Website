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

function setCard() {}

async function getUserCard() {}

async function getUserHistoric() {}

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
