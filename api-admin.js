// const admin = true;

const update_button =  document.querySelector('[name=update]');
const delete_button =  document.querySelector('[name=delete]');

let loaded_mask = undefined;
// let loaded_masks_dom = undefined;

function updateMessage(message) {
  document.querySelector('[name=message]').value = message;
  let message_cont = document.querySelector('.message-drawer');
  setTimeout(function(){ message_cont.classList.add('shown') }, 200);
  setTimeout(function(){ message_cont.classList.remove('shown') }, 1200);
}

// gets passed mongo object and js dom initially
function loadMask(mask, dom) {
  retreived_mask = true;
  console.log(mask.user)
  console.log(logged_in_user.id)
  if (mask.user === logged_in_user.id || logged_in_user.admin) {
  // let dom = event.srcElement.parentNode;
  // let maskID = dom.getAttribute('value');

    mask.dom = dom;

    // console.log(mask)
    // let box = parseInt(document.querySelector('[name=result]').value);
    clearAll();
    let map = mask.map;
    if(mask.dom.reloaded==true){
      console.log(true);
      map = dom.map;
    }
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
    delete_button.disabled = false;
  }
}

function gatherArray() {


  let array = [];
  // document.querySelectorAll(".drawn, [class$='-template']").forEach(cell => {
  document.querySelectorAll(".drawn, .template, .fill").forEach(cell => {

    // if (typeof cell.object.c == 'undefined') {
    //   cell.object.c = 0;
    // }

    array.push([cell.object.x, cell.object.y, cell.object.c]);

  })

  return array;
}

async function updateInDb(map, name) {
  // if (loaded_mask._id === )
  let data = {
    map: map,
    name: name,
  };

  fetch(directory + 'protected/update/' + loaded_mask._id, {
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
      updateMessage(name +' updated!');
    } else {
      updateMessage('Insufficient priviledges to update.');
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
  // displayArray.length;
  mapToCells(array, loaded_mask.dom);
  loaded_mask.dom.reloaded = true;
  // loaded_mask.dom.removeEventListener('click', fu;
  // loaded_mask;
};

function update() {
  let array = gatherArray();
  let name = document.querySelector('[name=name]').value;
  updateInDb(array, name);
  updateInDom(array);
  toggleControls('off');
};

async function deleteInDb(name) {

  fetch(directory + 'protected/delete/' + loaded_mask._id, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    mode: 'cors',
    // body: JSON.stringify(data),
  })
  .then(response => {
    console.log(response)
    if (response.ok) {
      updateMessage(name +' deleted!');
    } else {
      responseBox.innerHTML = response.statusText;
    }
    return response.blob();
  })
  .then(data => {
    console.log('Success:', data, name, ' deleted.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function deleteInDom() {
  loaded_mask.dom.innerHTML = '';
  // displayArray.length;
  // mapToCells(array, loaded_mask.dom);
};

function deleteMask(){
  let name = document.querySelector('[name=name]').value;
  deleteInDb(name);
  deleteInDom();
  mask_count--;
  toggleControls('off');
};


update_button.addEventListener('click', ()=>{update()});

delete_button.addEventListener('click', ()=>{deleteMask()});

// function addMaskLinks(){
//   mask_store.forEach(mask_in_store => {
//     // mask_in_store.dom.addEventListener('click', loadMask);
//     // mask_in_store.dom.style.cursor = 'pointer';
//     console.log(mask_in_store)
//   })
// }

// addMaskLinks();
