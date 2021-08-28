const mask_drawer = document.querySelector('.mask-drawer');
let width = 60; // 15
let height = 80; // 20
let cell_size = 3;
let x = 21;
let y = 28;
let erasing = false;
let cellArray = [];
let currentFeature = undefined;

const colours = ['black','saddlebrown','sienna','peru','wheat','white', 'dodgerblue', 'aqua','aquamarine','lightgreen','mediumseagreen', 'limegreen', 'gold','orange','orangered','crimson','palevioletred','plum',];

const Cell = (dom, x, y, c) => {
  const func = () => result;

  const clickDraw = () => {
    console.log(dom.classList)
    // let cellDom = (event.srcElement.classList.contains('cell')) ? event.srcElement : event.srcElement.parentNode;
    if (dom.classList.contains('drawn')) {
      dom.classList.remove('drawn');
      dom.style.backgroundColor = '';
      erasing = true;

    } else {
      dom.classList.add('drawn');
      // dom.object.changeColour(currentColourNo);
      colour(currentColourNo); //was dom.object.
      erasing = false;



    }
    console.log(document.querySelectorAll('.drawn'));


  }
  const holdDraw = () => {
    if (event.buttons == 1) {
      // let cellDom = event.srcElement.parentNode;
      if (erasing) {
        if (dom.classList.contains('drawn')) {
          dom.classList.remove('drawn');
        }
      } else {
        dom.classList.add('drawn');
        colour(currentColourNo);
      }
    }
  }
  dom.addEventListener('mousedown', clickDraw);
  let drawReceiver = document.createElement('div');
  drawReceiver.classList.add('cell-draw-receiver');
  dom.appendChild(drawReceiver);
  dom.children[0].addEventListener('mousedown', holdDraw);
  let array = [];
  // const changeColour = (colourNo) => {
  //   c = colourNo;
  // }
  const colour = (colourNo) => {
    c = colourNo;
    dom.style.backgroundColor = colours[c];
  }
  return {dom, x, y, c, colour};
}

const Feature = (name, templates) => {
  let i = -1;
  const dom = document.querySelector('.' + name);
  dom.children[0].addEventListener('click',() => {
    i <= 0 ? i = templates.length-1 : i--;
    set(templates[i])
  })
  dom.children[1].addEventListener('click',() => {
    i==templates.length-1 ? i=0 : i++;
    set(templates[i])
  })
  dom.children[2].addEventListener('click',() => {
    clear();
  })
  const clear = () => {
    document.querySelectorAll('.' + name + '-template').forEach(cell => {
      // cell.classList.remove(name);
      cell.classList.remove(name+'-template');
      // console.log(cell.classList)
    })

  }
  const set = (array) => {
    clear();
    array.forEach(cell => {
      let cc = cellArray[cell[1]][cell[0]];
      cc.classList.add(name+'-template');
      // cc.changeColour(currentColourNo);
      // cc.colour();
      // cellArray[cell[1]][cell[0]].classList.add(name);
      // console.log(cell);
    })
    currentFeature = name;
  }
  return {set,dom,clear}
}

let face = Feature('face', faces);
let forehead = Feature('forehead', foreheads);
let eyebrows = Feature('eyebrows', brows);
let eyes = Feature('eyes', eyeTemps);
let nose = Feature('nose', noseTemps);
let cheeks = Feature('cheeks', cheekTemps);
let mouth = Feature('mouth', mouthTemps);
let features_array = [face, forehead, eyebrows, eyes, nose, cheeks, mouth];

mask_drawer.style.width = x * cell_size + 'em';
mask_drawer.style.height = y * cell_size + 'em';





for (let j = 0; j < y; j++) {
  let arrayRow = [];
  for (let i = 0; i < x; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.bottom = j*cell_size+'em'; cell.style.left = i* cell_size+'em';
    cell.style.width = cell_size + 'em'; cell.style.height = cell_size + 'em';
    // if (Math.random()<0.25) {cell.classList.add('variation');}
    mask_drawer.appendChild(cell);
    let cellObject = Cell(cell, i, j);


    arrayRow[i] = cell;
    // cell.object = cellObject;

    // cell.children[0].addEventListener('mouseover', holdDraw);
    // cell.addEventListener('mousedown', clickDraw);
    // cell.children[0].addEventListener('mousedown', clickDraw);
    let trace = '';
    if(i < 3 || j > 24 || i > 17 || j < 3) {//j is y, i is x
      trace = 'face';
    } else if(i < 4 && j > 22 || i > 16 && j < 4 || j > 22 && i > 16 || i < 4 && j < 4) {//j is y, i is x
      trace = 'face';
    } else if(j > 20) {
      trace = 'forehead';
    } else if(j > 17) {
      trace = 'brows';
    } else if(j > 8 && i < 12 && i > 8 && j < 17) {
      trace = 'nose';
    } else if(j > 8 && i < 13 && i > 7 && j < 14) {
      trace = 'nose';
    } else if(j > 11) {
      trace = 'eyes';
    } else if(j > 2 && j < 8 && i < 15 && i > 5) {
      trace = 'mouth';
    } else if(j > 3 && j < 11 && i < 18 && i > 2) {
      trace = 'cheeks';
    }
    if(!trace==''){
    cell.classList.add('trace-' + trace);}
  }
  cellArray[j] = arrayRow;
}

function save() {
  let result = document.querySelector('[name=result]');
  let array = [];
  result.value = '';
  document.querySelectorAll('.drawn').forEach(cell => {
    console.log(cell.object);
    array.push({x:cell.object.x, y:cell.object.y});
    result.value+= '[' + cell.object.x + ',' + cell.object.y + '],';//arr
  })
}

function saveColour() {
  let result = document.querySelector('[name=result-colour]');
  let array = [];
  result.value = '';
  document.querySelectorAll('.drawn').forEach(cell => {

    if (typeof cell.object.c == 'undefined') { cell.object.c = 0; }
console.log(cell.object.c);
    array.push({x:cell.object.x, y:cell.object.y, c:cell.object.c});
    result.value+= '[' + cell.object.x + ',' + cell.object.y + ',' + cell.object.c + '],';//arr
  })

}



function clearDrawn() {
  document.querySelectorAll('.drawn').forEach(cell => {
    cell.classList.remove('drawn');
    cell.style.backgroundColor = '';
  });
}

function clearAll() {
  clearDrawn();
  // document.querySelectorAll("[class$='-template']").forEach(cell => {
  //   cell.classList.remove("[class$='-template']");
  // });
  features_array.forEach(feature => {
    feature.clear();
  })
}

document.querySelector('[name=save]').addEventListener('click', save);
document.querySelector('[name=save-colour]').addEventListener('click', saveColour);

document.querySelector('[name=clear-all]').addEventListener('click', clearAll);

document.querySelector('[name=clear-drawn]').addEventListener('click', clearDrawn);




const colourButtonCont = document.querySelector('.colour-buttons');

let currentColour = 'black';
let currentColourNo = 0;

function colourSelect() {
  // console.log(Array.from(colourButtonCont.children).indexOf(event.target))
  // event.target.classList.add('selected-colour');
  currentColourNo = Array.from(colourButtonCont.children).indexOf(event.target);
  currentColour = colours[currentColourNo];
  colourButtonCont.style.borderColor = currentColour;
  console.log(currentColour);

}

colours.forEach(colour => {
  let sub = document.createElement('button');

  sub.style.backgroundColor = colour;
  colourButtonCont.appendChild(sub);
  sub.addEventListener('click', colourSelect);
  if ((colours.indexOf(colour)+1) % 5 == 0) {
    // colourButtonCont.innerHTML += '<br>';
  }
  colourButtonCont.style.width = (6 * sub.clientWidth) + 'px';
})

console.log(document.querySelectorAll('.drawn'));
