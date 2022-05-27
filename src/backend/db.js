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

function editUser() {
  console.log(new Date());
}
