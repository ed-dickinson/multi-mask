const directory = 'http://localhost:3000/';

const save_button = document.querySelector('[name=mongo-save]');

let created_mask = undefined;

async function countMasks() {
  let path = 'count';
  const response = await fetch(directory + path, {mode: 'cors'});
  const result = await response.json();
  console.log(result);
  return result;

}

async function fetchMasks() {
  let path = 'masks/all';
  const response = await fetch(directory + path, {mode: 'cors'});
  const result = await response.json();

  fillMasks(result, true); //true is randomise

}

fetchMasks();



async function saveToDb(map, name) {
  let data = {
    map: map,
    name: name,
    // no: 2
    // joined: new Date()
  };
  if (logged_in_user) {data.user = logged_in_user.id}

  fetch(directory + 'add', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  })
  .then(response => {

    if (response.ok) {

      updateMessage(name +' added!');
      response.json().then(json => {created_mask = json.mask;});
    } else {
      responseBox.innerHTML = response.statusText;
    }
    // return response.blob();


  })
  .then(data => {
    console.log('Success:', data, ' added.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function addToDom(array) {

  let dom =  displayArray[mask_count];
  mapToCells(array, dom);
  dom.style.backgroundColor = 'white';
  dom.addEventListener('click', () => {loadMask(created_mask,dom)});
  dom.style.cursor = 'pointer';
  mask_count++;
}

function sendToMongo() {

  let input = document.querySelector('[name=result]');
  let name = document.querySelector('[name=name]');
  let array = [];

  document.querySelectorAll(".drawn, .template, .fill").forEach(cell => {

    if (typeof cell.object.c == 'undefined') {
      cell.object.c = 0;
    }

    array.push([cell.object.x, cell.object.y, cell.object.c]);

  })

  saveToDb(array, name.value);
  addToDom(array);
  toggleControls('off');

}

save_button.addEventListener('click', sendToMongo);
