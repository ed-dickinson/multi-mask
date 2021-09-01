const directory = 'http://localhost:3000/';

async function saveToDb(map, name) {
  let data = {
    map: map,
    name: name
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
    response.json();
    console.log(response)
    if (response.ok) {
      responseBox.innerHTML = 'New mask added!';
    } else {
      responseBox.innerHTML = response.statusText;
    }
  })
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
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
    // console.log(cell.object.c);
    array.push({x:cell.object.x, y:cell.object.y, c:cell.object.c});
    input.value+= '[' + cell.object.x + ',' + cell.object.y + ',' + cell.object.c + '],';//arr
  })

  saveToDb(input.value, name.value);

}

document.querySelector('[name=mongo-save]').addEventListener('click', sendToMongo);
