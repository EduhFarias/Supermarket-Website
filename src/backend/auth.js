auth.onAuthStateChanged((user) => {
  if (user) {
    window.sessionStorage.setItem('user', user.uid);
  } else {
    window.sessionStorage.setItem('user', 'undefined');
  }
});

function signUp() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const signupForm = document.querySelector('#signupForm');

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      cred.user.updateProfile({
        displayName: signupForm['name'].value,
      });
      db.collection('users')
        .doc(cred.user.uid)
        .set({
          admin: false,
          email: cred.user.email,
          id: cred.user.uid,
          address: signupForm['address'].value,
          cpf: signupForm['cpf'].value,
          birthday: signupForm['birthday'].value,
          name: signupForm['name'].value,
          phone: signupForm['phone'].value,
          created: new Date(),
        })
        .then(function () {
          alert('Nova conta criada com sucesso');
          window.sessionStorage.setItem('admin', 'false');
          window.location.replace('index.html');
        })
        .catch(function (error) {
          console.log('Error setting:', error);
        });
    })
    .then(() => {
      signupForm.reset();
    })
    .catch(function (error) {
      catchAuthError(error.code);
    });
}

function signIn() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      const docRef = db.collection('users').doc(cred.user.uid);

      docRef.get().then(function (doc) {
        if (doc.exists) {
          if (doc.data().admin === true) {
            window.sessionStorage.setItem('admin', 'true');
          } else {
            window.sessionStorage.setItem('admin', 'false');
          }
          window.location.replace('index.html');
        }
      });
    })
    .catch(function (error) {
      catchAuthError(error.code);
    });
}

function logout() {
  console.log('logged out');
  auth.signOut().then(() => {
    window.location.replace('index.html');
  });
}

function catchAuthError(error) {
  switch (error) {
    case 'auth/wrong-password':
      alert('Senha inv??lida');
      break;
    case 'auth/invalid-email':
      alert('Email inv??lido');
      break;
    case 'auth/user-disabled':
      alert('Conta desabilitada');
      break;
    case 'auth/user-not-found':
      alert('Usu??rio n??o encontrado');
      break;
  }
}
