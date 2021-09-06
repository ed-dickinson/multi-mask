// let randMasks = [];
// for (let i = 0; i < 12; i++) {
//   let mask = {user: 'test-user',
//               features : []}
//   document.querySelectorAll('.maker input').forEach(slider => {
//     mask.features.push(Math.floor(Math.random()*(parseInt(slider.max)+1)));
//   });
//   randMasks.push(mask);
// }
let mask_count = 0;
let displayArray = [];
let maskDisplay = document.querySelector('.mask-display');
// let container_width = window.innerWidth;
let container_width = document.querySelector('body').offsetWidth;
let window_width = window.innerWidth;
// let container_width = maskDisplay;
// console.log(container_width);

let max_mask_size = 95;

let across = (container_width - (container_width % max_mask_size)) / max_mask_size;

// console.log(across);
// console.log(maskDisplay);

let maskSize = [90,120];
maskSize[0] = (container_width/across)*0.9;
maskSize[1] = maskSize[0] / (3/4);
let rows = Math.floor(window.innerHeight / maskSize[1]);



// console.log(maskSize);



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

// function resizeRows() {
//   console.log('...resizing')
//   across = (container_width - (container_width % max_mask_size)) / max_mask_size;
//   maskSize = [90,120];
//   maskSize[0] = (container_width/across)*0.9;
//   maskSize[1] = maskSize[0] / (3/4);
//   rows = Math.floor(window.innerHeight / maskSize[1]);
//   title_space = (across%2==1) ? 5 : 6;
//   for (let i=0; i< (rows*across); i++) {
//     if (i == (across-title_space)/2) {i+= title_space;}
//     let mask = maskDisplay.children[i];
//     if (mask==undefined) {mask = document.createElement('span');}
//     // mask.classList.add('mask-in-display');
//     mask.style.width = maskSize[0] + 'px';
//     mask.style.left = maskSize[0]/0.9 * (i%across) + 'px';
//     mask.style.height = maskSize[1] + 'px';
//     mask.style.top = maskSize[1]*Math.floor(i/across)/0.93 + 'px';
//   }
// }

// window.addEventListener("resize", () => {
//   let new_window_width = window.innerWidth;
//
//   // if (window_width != new_window_width) {
//   //   window_width = new_window_width;
//   //   resizeRows();
//   // }
//
//
// });

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
    // for (let i = 0; i < mask_store.length; i++){
    //   let random = Math.floor(Math.random()*mask_store.length);
    //   let removed = mask_store.shift(); //method 1
    //   mask_store.splice(random,0,removed);
    //   // let removed = mask_store.slice(random,1); //method 2
    //   // mask_store.unshift(removed);
    // }
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
    // mask_in_store.map.forEach(item => {
    //
    //   let div = document.createElement('div');
    //   div.classList.add('display-cell');
    //   div.style.width = display_cell_size + 'px';
    //   div.style.height = display_cell_size + 'px';
    //
    //   div.style.left = display_cell_size * item[0] + 'px';
    //   div.style.bottom = display_cell_size * item[1] + 'px';
    //   div.style.backgroundColor = colours[item[2]];
    //   div.setAttribute('value',item);
    //
    //   displayArray[i].appendChild(div);
    // })

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

// const Mask = () => {
//   let dom = undefined;
//   const init = domCont => {
//     let mould = document.querySelector('.mask-mould');
//     let clone = mould.children[0].cloneNode(true);
//     domCont.appendChild(clone);
//     dom = clone; //mask
//   }
//   const sculpt = features => {
//     sculptFeatures(dom, features);
//
//   }
//   return {init, sculpt}
// }
//
// randMasks.forEach(mask => {
//   let maskCont = document.createElement('div');
//   maskCont.classList.add('mask-cont');
//   maskCont.style.height = maskSize[1] + 'px';
//   maskCont.style.width = maskSize[0] + 'px';
//   maskCont.style.fontSize = maskSize[1] / 80 + 'px';
//   maskDisplay.appendChild(maskCont);
//   // randMaskObjs.push(Mask());
//   let newMask = Mask();
//   newMask.init(maskCont);
//   newMask.sculpt(mask.features);
// });
