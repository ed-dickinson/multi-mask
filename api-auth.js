// const directory = 'http://localhost:3000/';

const email_input = document.querySelector('input.email');
const password_input = document.querySelector('input.password');
const login_button = document.querySelector('button.log-in');
const signup_button = document.querySelector('button.sign-up');
const private = document.querySelector('button.private');

private.addEventListener('click', get);
login_button.addEventListener('click', () => {
  login(email_input.value, password_input.value)
});
signup_button.addEventListener('click', () => {
  signup(email_input.value, password_input.value)
});


async function get() {
  fetch(directory + 'protected/get', {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    mode: 'cors',
    // body: JSON.stringify(data),
  })
  .then(response => {
    // response.json();
    console.log(response)
    if (response.ok) {
      response.json().then(json => {token = json.token; console.log(token)});
      console.log("ok! you're in...")
    } else {
      console.log('sorry, users only.')
    }
    // return response.blob();
  })
  .then(data => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

async function action() {
  let data = {
    one: 1,
    two: 2,
  };

  fetch(directory + 'protected/action', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    mode: 'cors',
    body: JSON.stringify(data),
  })
  .then(response => {
    // response.json();
    console.log(response)
    if (response.ok) {
      // updateMessage(name +' updated!');
      response.json().then(json => {token = json.token; console.log(token)});
      console.log('ok!')
    } else {
      // responseBox.innerHTML = response.statusText;
    }
    // return response.blob();
  })
  .then(data => {
    // console.log('Success:', name, ' updated.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

let token = undefined;

async function signup(email,password) {
  let data = {
    email: email,
    password: password,
  };

  fetch(directory + 'protected/signup', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  })
  .then(response => {
    // response.json();
    console.log(response)
    if (response.ok) {
      // document.querySelector('[name=name]').value += ' added!';
      // updateMessage(name +' added!');
      response.json()
      // .then(json => {token = json.token; console.log(token)});
    } else {
      // responseBox.innerHTML = response.statusText;
    }
    // return response.blob();
  })
  .then(data => {
    // console.log('Success:', name, ' updated.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

async function login(email,password) {
  let data = {
    email: email,
    password: password,
  };

  fetch(directory + 'protected/login', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  })
  .then(response => {
    // response.json();
    console.log(response)
    if (response.ok) {
      // document.querySelector('[name=name]').value += ' added!';
      // updateMessage(name +' added!');
      response.json().then(json => {token = json.token; console.log(token)});
    } else {
      // responseBox.innerHTML = response.statusText;
    }
    // return response.blob();
  })
  .then(data => {
    // console.log('Success:', name, ' updated.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
