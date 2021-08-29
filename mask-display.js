// let randMasks = [];
// for (let i = 0; i < 12; i++) {
//   let mask = {user: 'test-user',
//               features : []}
//   document.querySelectorAll('.maker input').forEach(slider => {
//     mask.features.push(Math.floor(Math.random()*(parseInt(slider.max)+1)));
//   });
//   randMasks.push(mask);
// }

let maskDisplay = document.querySelector('.mask-display');
// let container_width = window.innerWidth;
let container_width = document.querySelector('body').offsetWidth;
// let container_width = maskDisplay;
console.log(container_width);

let across = (container_width - (container_width % 100)) / 100;

console.log(across);
console.log(maskDisplay);

let maskSize = [90,120];
maskSize[0] = (window.innerWidth/across)*0.9;
maskSize[1] = maskSize[0] / (3/4);

console.log(maskSize);



for (let i=0; i< 30; i++) {
  let mask = document.createElement('span');
  mask.classList.add('mask-in-display');
  mask.style.width = maskSize[0] + 'px';
  mask.style.left = maskSize[0]/0.9 * (i%across) + 'px';
  mask.style.height = maskSize[1] + 'px';
  mask.style.top = maskSize[1]*Math.floor(i/7)/0.93 + 'px';
  mask.style.margin = maskSize[0]/18 + 'px';
  // mask.style.backgroundColor = 'papayawhip';
  maskDisplay.appendChild(mask);
}


const Mask = () => {
  let dom = undefined;
  const init = domCont => {
    let mould = document.querySelector('.mask-mould');
    let clone = mould.children[0].cloneNode(true);
    domCont.appendChild(clone);
    dom = clone; //mask
  }
  const sculpt = features => {
    // console.log(features);
    sculptFeatures(dom, features);
    // features.forEach(feature => {
    //   let i = features.indexOf(feature);
    //   if (i==0||i==1) {
    //     let element = dom.children[0];
    //     let name = (i==0) ? 'face-shape' : 'face-size';
    //     featureSculpt(feature, element, name);
    //   } else {
    //     let element = dom.children[0].children[i-2];
    //     let name = dom.children[0].children[i-2].classList[0];
    //     featureSculpt(feature, element, name);
    //   }
    // });
  }
  return {init, sculpt}
}

randMasks.forEach(mask => {
  let maskCont = document.createElement('div');
  maskCont.classList.add('mask-cont');
  maskCont.style.height = maskSize[1] + 'px';
  maskCont.style.width = maskSize[0] + 'px';
  maskCont.style.fontSize = maskSize[1] / 80 + 'px';
  maskDisplay.appendChild(maskCont);
  // randMaskObjs.push(Mask());
  let newMask = Mask();
  newMask.init(maskCont);
  newMask.sculpt(mask.features);
});



// let testMask = Mask();
//
// testMask.init(document.querySelector('.mask-cont'));
// testMask.sculpt();

// console.log(randMaskObjs[1]);
