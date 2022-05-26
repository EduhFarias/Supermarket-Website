// For each of your app's pages that need information about the signed-in user, attach an observer to the global authentication object.
// This observer gets called whenever the user's sign-in state changes.
// Attach the observer using the onAuthStateChanged method. When a user successfully signs in, you can get information about the user in the observer.

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('user logged in:', user);
    window.localStorage.setItem('user', user.email);
  } else {
    console.log('user logged out');
    window.localStorage.setItem('user', 'undefined');
  }
});

// Create account
function signUp() {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

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
          address: signupForm['address'].value,
          cpf: signupForm['cpf'].value,
          birthday: signupForm['birthday'].value,
          name: signupForm['name'].value,
          created: new Date().getDate,
        })
        .then(function () {
          console.log('New user registred');
          alert('Nova conta criada com sucesso');
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
            window.localStorage.setItem('admin', 'true');
          } else {
            window.localStorage.setItem('admin', 'false');
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

function redirect(role = 'none') {
  auth.onAuthStateChanged((user) => {
    if (user) {
      if (role == 'admin') {
        db.collection('users')
          .doc(user.uid)
          .get()
          .then(function (doc) {
            if (doc.exists) {
              if (doc.data().admin === true) {
                console.log('Access granted!');
              } else {
                window.location.replace('indexUser.html');
              }
            } else {
              console.log('No such document');
            }
          })
          .catch(function (error) {
            console.log('Error getting document: ', error);
          });
      }
    } else {
      console.log('No user logged');
      window.location.replace('index.html');
    }
  });
}

function catchAuthError(error) {
  switch (error) {
    case 'auth/wrong-password':
      alert('Senha inválida');
      break;
    case 'auth/invalid-email':
      alert('Email inválido');
      break;
    case 'auth/user-disabled':
      alert('Conta desabilitada');
      break;
    case 'auth/user-not-found':
      alert('Usuário não encontrado');
      break;
  }
}
