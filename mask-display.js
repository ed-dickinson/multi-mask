let randMasks = [];
for (let i = 0; i < 12; i++) {
  let mask = {user: 'test-user',
              features : []}
  document.querySelectorAll('.maker input').forEach(slider => {
    mask.features.push(Math.floor(Math.random()*(parseInt(slider.max)+1)));
  });
  randMasks.push(mask);
}

// let randMaskObjs = [];



let maskDisplay = document.querySelector('.mask-display');

let maskSize = [90,120];


maskSize[0] = ((window.innerWidth-16) / 10) - 10; //16 body margin, 10 margin
maskSize[0] = Math.floor(maskSize[0]-2);
maskSize[1] = maskSize[0] / 0.75;
console.log(maskSize[0]%2);

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
