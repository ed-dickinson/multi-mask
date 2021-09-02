const admin = true;

const update_button =  document.querySelector('[name=update]');

let loaded_mask = undefined;
// let loaded_masks_dom = undefined;

function updateMessage(message) {
  document.querySelector('[name=message]').value = message;
}

function loadMask(mask, dom) {
  // let dom = event.srcElement.parentNode;
  // let maskID = dom.getAttribute('value');
  mask.dom = dom;
  // console.log(mask)
  // let box = parseInt(document.querySelector('[name=result]').value);
  clearAll();
  let map = mask.map;
  // console.log(map)
  map.forEach(cell => {
    // console.log(cell)
    // console.log(cellArray[cell[1]][cell[0]])
    let currentCell = cellArray[cell[1]][cell[0]];
    cellArray[cell[1]][cell[0]].style.backgroundColour = colours[cell[2]];
    currentCell.classList.add('drawn');
    currentCell.object.changeColour(cell[2]);
    currentCell.object.c = cell[2];
    currentCell.object.colour();

  })

  toggleControls('on');
  document.querySelector('[name=name]').value = mask.name;
  loaded_mask = mask;
  update_button.disabled = false;
}

function gatherArray() {


  let array = [];
  // document.querySelectorAll(".drawn, [class$='-template']").forEach(cell => {
  document.querySelectorAll(".drawn, .template").forEach(cell => {

    // if (typeof cell.object.c == 'undefined') {
    //   cell.object.c = 0;
    // }

    array.push([cell.object.x, cell.object.y, cell.object.c]);

  })

  return array;
}

async function updateInDb(map, name) {
  let data = {
    map: map,
    name: name,
  };

  fetch(directory + 'masks/update/' + loaded_mask._id, {
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
      updateMessage(name +' updated!');
    } else {
      responseBox.innerHTML = response.statusText;
    }
    return response.blob();
  })
  .then(data => {
    console.log('Success:', name, ' updated.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function updateInDom(array) {
  loaded_mask.dom.innerHTML = '';
  mapToCells(array, loaded_mask.dom);
};

function update() {
  let array = gatherArray();
  let name = document.querySelector('[name=name]').value;
  updateInDb(array, name);
  updateInDom(array);
  toggleControls('off');
};

update_button.addEventListener('click', ()=>{update()});

// function addMaskLinks(){
//   mask_store.forEach(mask_in_store => {
//     // mask_in_store.dom.addEventListener('click', loadMask);
//     // mask_in_store.dom.style.cursor = 'pointer';
//     console.log(mask_in_store)
//   })
// }

// addMaskLinks();
