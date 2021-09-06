
let mask_count = 0;
let displayArray = [];
let maskDisplay = document.querySelector('.mask-display');

let container_width = document.querySelector('body').offsetWidth;
let window_width = window.innerWidth;


let max_mask_size = 95;

let across = (container_width - (container_width % max_mask_size)) / max_mask_size;


let maskSize = [90,120];
maskSize[0] = (container_width/across)*0.9;
maskSize[1] = maskSize[0] / (3/4);
let rows = Math.floor(window.innerHeight / maskSize[1]);




let title_space = (across%2==1) ? 5 : 6;
for (let i=0; i< (rows*across); i++) {
  if (i == (across-title_space)/2) {i+= title_space;}
  let mask = document.createElement('span');
  mask.classList.add('mask-in-display');
  mask.style.width = maskSize[0] + 'px';
  mask.style.left = maskSize[0]/0.9 * (i%across) + 'px';
  mask.style.height = maskSize[1] + 'px';
  mask.style.top = maskSize[1]*Math.floor(i/across)/0.93 + 'px';



  displayArray.push(mask);
  maskDisplay.appendChild(mask);
}
// maskDisplay.style.width = (maskSize[0] * across) + 'px';
maskDisplay.style.width = container_width - 15 + 'px'; // don't know why this is 15! -opera


function mapToCells(map, display) {
  map.forEach(item => {

    let div = document.createElement('div');
    div.classList.add('display-cell');
    div.style.width = display_cell_size + 'px';
    div.style.height = display_cell_size + 'px';

    div.style.left = display_cell_size * item[0] + 'px';
    div.style.bottom = display_cell_size * item[1] + 'px';
    div.style.backgroundColor = colours[item[2]];
    div.setAttribute('value',item);

    display.appendChild(div);
  })
  display.map = map; // to fix reload update issue?
}

// let x = 21;
// let y = 28;
let display_cell_size = maskSize[0] / x;//maskSize[1] / y

function fillMasks(mask_store, random) {
  if (random) {

    for (let i = mask_store.length -1; i > 0; i--) {//fisher yates shuffle
      let j = Math.floor(Math.random() * i)
      let k = mask_store[i]
      mask_store[i] = mask_store[j]
      mask_store[j] = k
    }
  }
  mask_store.forEach(mask_in_store => {
    let i = mask_store.indexOf(mask_in_store);
    let display = displayArray[i];
    mapToCells(mask_in_store.map, displayArray[i]);


    displayArray[i].style.backgroundColor = 'white';

    mask_count = i + 1;

    if (mask_in_store.user) {
      displayArray[i].setAttribute('data-user', mask_in_store.user);
    }

    displayArray[i].setAttribute('value', mask_in_store._id);

    if (admin) {

      // displayArray[i].addEventListener('click', () => {loadMask(mask_in_store,displayArray[i])});//admin
      displayArray[i].addEventListener('click', ()=> {loadMask(mask_in_store,displayArray[i])});//admin
      displayArray[i].style.cursor = 'pointer';
    }
  })
}
