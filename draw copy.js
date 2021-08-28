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

  let array = [];
  const changeColour = (colourNo) => {
    c = colourNo;
  }
  const colour = () => {

    dom.style.backgroundColor = colours[c];
  }
  const drawnColour = () => {

    dom.style.backgroundColor = colours[d];
  }
  return {dom, x, y, c, colour, changeColour, drawnColour};
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
    //what was covered by the new feature overlapping another one turns black
  })
  dom.children[2].addEventListener('click',() => {
    clear();
  })
  const clear = () => {
    document.querySelectorAll('.' + name + '-template').forEach(cell => {

      cell.classList.remove(name+'-template');
      if (!cell.classList.contains('drawn')) {
        cell.style.backgroundColor = '';
      }

    })

  }
  const set = (array) => {
    clear();
    array.forEach(cell => {
      let cc = cellArray[cell[1]][cell[0]];
      cc.classList.add(name+'-template');
      if (typeof cell[2]!='undefined') {
        cc.object.changeColour(cell[2]);
        cc.object.c=cell[2];
        cc.object.colour();
      } else {
        cc.object.changeColour(currentColourNo);
        cc.object.c=currentColourNo;
        cc.object.colour();
      };

    })
    cc.object.restoreColour();
    currentFeature = name;
  }
  const restoreColour = () => {
    document.querySelectorAll('.drawn').forEach(cell => {

      // cell.style.backgroundColor = cell.object.c;
      // cell.object.changeColour(cell.object.c);
      cell.object.drawnColour();
    })
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

function holdDraw() {
  if (event.buttons == 1) {
    let cellDom = event.srcElement.parentNode;
    if (erasing) {
      if (cellDom.classList.contains('drawn')) {
        cellDom.classList.remove('drawn');
        cellDom.style.backgroundColor = '';
      }
    } else {
      cellDom.classList.add('drawn');
      cellDom.object.changeColour(currentColourNo);
      cellDom.object.c = currentColourNo;
      cellDom.object.d = currentColourNo;
      cellDom.object.colour();
    }
  }
}

function clickDraw() {

  let cellDom = (event.srcElement.classList.contains('cell')) ? event.srcElement : event.srcElement.parentNode;
  if (cellDom.classList.contains('drawn') && cellDom.object.c != currentColourNo) { // new colour overwrite instead of erase
    cellDom.object.changeColour(currentColourNo);
    cellDom.object.c = currentColourNo;
    cellDom.object.colour();

    erasing = false;
  } else if (cellDom.classList.contains('drawn')) {
    cellDom.classList.remove('drawn');
    cellDom.style.backgroundColor = '';
    erasing = true;
  } else {
    cellDom.classList.add('drawn');
    cellDom.object.changeColour(currentColourNo);
    cellDom.object.c = currentColourNo;
    cellDom.object.d = currentColourNo;
    cellDom.object.colour();

    erasing = false;
  }
}

for (let j = 0; j < y; j++) {
  let arrayRow = [];
  for (let i = 0; i < x; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.bottom = j * cell_size + 'em';
    cell.style.left = i * cell_size + 'em';
    cell.style.width = cell_size + 'em';
    cell.style.height = cell_size + 'em';
    // if (Math.random()<0.25) {cell.classList.add('variation');}
    mask_drawer.appendChild(cell);
    let cellObject = Cell(cell, i, j);
    let drawReceiver = document.createElement('div');
    drawReceiver.classList.add('cell-draw-receiver');
    cell.appendChild(drawReceiver);

    arrayRow[i] = cell;
    cell.object = cellObject;

    cell.children[0].addEventListener('mouseover', holdDraw);
    cell.addEventListener('mousedown', clickDraw);
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
    cell.classList.add('trace-' + trace);
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
  features_array.forEach(feature => {
    feature.clear();
  })
}

document.querySelector('[name=save]').addEventListener('click', save);
document.querySelector('[name=save-colour]').addEventListener('click', saveColour);
document.querySelector('[name=clear-all]').addEventListener('click', clearAll);
document.querySelector('[name=clear-drawn]').addEventListener('click', clearDrawn);

let cellGridsOn = false;
function gridToggle() {
  let cells = document.querySelectorAll('.cell');
  if (cellGridsOn) {
    cells.forEach(cell => {
      cell.style.boxShadow = '';
    })
    cellGridsOn = false;
  } else {
    cells.forEach(cell => {
      cell.style.boxShadow = '0px 0px 1px black';
    })
    cellGridsOn = true;
  }


}
document.querySelector('[name=grid]').addEventListener('click', gridToggle);




const colourButtonCont = document.querySelector('.colour-buttons');

let currentColour = 'black';
let currentColourNo = 0;

function colourSelect() {
  // console.log(Array.from(colourButtonCont.children).indexOf(event.target))
  // event.target.classList.add('selected-colour');
  currentColourNo = Array.from(colourButtonCont.children).indexOf(event.target);
  currentColour = colours[currentColourNo];
  colourButtonCont.style.borderColor = currentColour;

}

colours.forEach(colour => {
  let sub = document.createElement('button');

  sub.style.backgroundColor = colour;
  colourButtonCont.appendChild(sub);
  sub.addEventListener('click', colourSelect);
  // if ((colours.indexOf(colour)+1) % 5 == 0) {
  //   // colourButtonCont.innerHTML += '<br>';
  // }
  colourButtonCont.style.width = (6 * sub.clientWidth) + 'px';
})
