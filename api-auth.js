// const directory = 'http://localhost:3000/';

const email_input = document.querySelector('input.email');
const password_input = document.querySelector('input.password');
const login_button = document.querySelector('button.log-in');
const signup_button = document.querySelector('button.sign-up');
const private = document.querySelector('button.private');

const login_message = document.querySelector('output.login-message');

function loginMessage(phrase) {
  login_message.value = phrase;
}

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

async function getEmails() {
  fetch(directory + 'users/emails', {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
  })
  .then(response => {
    // response.json();
    console.log(response)
    if (response.ok) {
      response.json().then(json => {
        let emails_obj_array = Array.from(json);
        emails = [];
        emails_obj_array.forEach(obj=> {
          emails.push(obj.email);
        })
      });
      got_emails = true;
      email_input.removeEventListener('click', getEmails);
    } else {
      console.log('hmm, no emails.')
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

// getEmails();
function checkEmail() {
  // console.log(event.target.value, emails.indexOf(event.target.value))
  let regex = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
  if (emails.includes(email_input.value)) {
    loginMessage("Email recognised! Log in.")
  } else if (regex.test(email_input.value)){
      loginMessage("Email not in use. Sign up!")
  }

}
let got_emails = false;
if (!got_emails) {
  email_input.addEventListener('click', getEmails);
}

email_input.addEventListener('input', checkEmail);

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
