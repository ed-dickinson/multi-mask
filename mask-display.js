// let randMasks = [];
// for (let i = 0; i < 12; i++) {
//   let mask = {user: 'test-user',
//               features : []}
//   document.querySelectorAll('.maker input').forEach(slider => {
//     mask.features.push(Math.floor(Math.random()*(parseInt(slider.max)+1)));
//   });
//   randMasks.push(mask);
// }
let displayArray = [];
let maskDisplay = document.querySelector('.mask-display');
// let container_width = window.innerWidth;
let container_width = document.querySelector('body').offsetWidth;
// let container_width = maskDisplay;
console.log(container_width);

let across = (container_width - (container_width % 100)) / 100;

console.log(across);
console.log(maskDisplay);

let maskSize = [90,120];
maskSize[0] = (container_width/across)*0.9;
maskSize[1] = maskSize[0] / (3/4);
let rows = 8;

console.log(maskSize);

let title_space = (across%2==1) ? 3 : 4;
for (let i=0; i< (rows*across); i++) {
  if (i == (across-title_space)/2) {i+= title_space;}
  let mask = document.createElement('span');
  mask.classList.add('mask-in-display');
  mask.style.width = maskSize[0] + 'px';
  mask.style.left = maskSize[0]/0.9 * (i%across) + 'px';
  mask.style.height = maskSize[1] + 'px';
  mask.style.top = maskSize[1]*Math.floor(i/across)/0.93 + 'px';
  // mask.style.margin = maskSize[0]/18 + 'px';
  // mask.style.backgroundColor = 'papayawhip';
  displayArray.push(mask);
  maskDisplay.appendChild(mask);
}

// let x = 21;
// let y = 28;
let display_cell_size = maskSize[0] / x;//maskSize[1] / y

mask_store.forEach(mask_in_store => {
  let i = mask_store.indexOf(mask_in_store);
  mask_in_store.map.forEach(item => {
    let div = document.createElement('div');
    div.classList.add('display-cell');
    div.style.width = display_cell_size + 'px';
    div.style.height = display_cell_size + 'px';

    div.style.left = display_cell_size * item[0] + 'px';
    div.style.bottom = display_cell_size * item[1] + 'px';
    div.style.backgroundColor = colours[item[2]];
    div.setAttribute('value',item);
    // console.log(item)
    displayArray[i].appendChild(div);
  })
  displayArray[i].style.backgroundColor = 'white';
})


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
