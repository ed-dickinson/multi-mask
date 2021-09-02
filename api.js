const directory = 'http://localhost:3000/';

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
  // console.log(result);
  // return result;
  fillMasks(result);

}

fetchMasks();

// let fetched_mask_count = countMasks();

async function saveToDb(map, name) {
  let data = {
    map: map,
    name: name,
    // no: 2
    // joined: new Date()
  };

  fetch(directory + 'add', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  })
  .then(response => {
    // response.json();

    if (response.ok) {
      document.querySelector('[name=name]').value += ' added!';
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

  // loaded_mask.dom.innerHTML = '';
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
  input.value = '';
  // document.querySelectorAll(".drawn, [class$='-template']").forEach(cell => {
  document.querySelectorAll(".drawn, .template").forEach(cell => {

    if (typeof cell.object.c == 'undefined') {
      cell.object.c = 0;
    }
    console.log(cell.object)
    // console.log(cell.object.c);
    // array.push({x:cell.object.x, y:cell.object.y, c:cell.object.c});
    array.push([cell.object.x, cell.object.y, cell.object.c]);
    input.value+= '[' + cell.object.x + ',' + cell.object.y + ',' + cell.object.c + '],';//arr
  })

  saveToDb(array, name.value);
  addToDom(array);
  toggleControls('off');

}

document.querySelector('[name=mongo-save]').addEventListener('click', sendToMongo);
