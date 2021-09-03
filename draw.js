const mask_drawer = document.querySelector('.mask-drawer');
let width = 60; // 15
let height = 80; // 20
let cell_size = 3;
let x = 21;
let y = 28;
let erasing = false;
let cellArray = [];
let currentFeature = undefined;
let lastTemplate = undefined;
let tool = 'draw';
let currentColourNo = 0;

const colours = ['black','saddlebrown','sienna','peru','wheat','white', 'dodgerblue', 'aqua','aquamarine','lightgreen','mediumseagreen', 'limegreen', 'gold','orange','orangered','crimson','palevioletred','mediumpurple',];//darkorchid?

const Cell = (dom, x, y, c) => {//c is colour, d is last drawn colour, t is last templated colour
  const func = () => result;
  let d = undefined;
  let t = undefined;
  let array = [];
  const changeColour = (colourNo) => {
    c = colourNo;
  }
  const lastDrawnColour = (colourNo) => {
    d = colourNo;
  }
  const colour = (current) => {
    if (current) {dom.style.backgroundColor = colours[current];} else {
    dom.style.backgroundColor = colours[c];}
  }
  return {dom, x, y, c, d, colour, changeColour, lastDrawnColour};
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
    let lastTemplateArray = document.querySelectorAll('.' + name + '-template');
    document.querySelectorAll('.' + name + '-template').forEach(cell => {
      // console.log(document.querySelector('[class$="-template"]'))
      cell.classList.remove(name+'-template');
      // console.log(cell.querySelector('[class$="-template"]'));
      // cell.classList.forEach(cl => {console.log(cl)});
      let hasOtherTemplate = undefined;
      Array.from(cell.classList).forEach(cl => {
        if(cl.toString().includes('-template')) {
          hasOtherTemplate = true;
        }
      });

      if (hasOtherTemplate) {
        cell.style.backgroundColor = cell.object.t[0];
      } else {
        cell.classList.remove('template');
      }
      if ((!cell.classList.contains('drawn')) && !hasOtherTemplate) {
        cell.style.backgroundColor = '';
      }

    })
    restoreColour(lastTemplateArray);//theres one in set as well?

  }
  const set = (array) => {
    clear();
    array.forEach(cell => {
      let cc = cellArray[cell[1]][cell[0]];
      let holdingColour = currentColourNo;
      cc.classList.add(name+'-template');
      cc.classList.add('template');
      if (typeof cell[2]!='undefined') {
        holdingColour = cell[2];
      //   cc.object.changeColour(cell[2]);
      //   cc.object.c=cell[2];
      //   cc.object.colour();
      //
      //   cc.object.t=[cell[2], name];
      // } else {
      //   cc.object.changeColour(currentColourNo);
      //   cc.object.c=currentColourNo;
      //   cc.object.colour();
      //
      //   cc.object.t=[currentColourNo, name];
      };
      cc.object.changeColour(holdingColour);
      cc.object.c=holdingColour;
      cc.object.colour();

      if (typeof cc.object.t!='undefined') {
        if (cc.object.t[1]!=name) {

        }
      } else {
        cc.object.t=[currentColour, name];
      }
    })
    // restoreColour(name);// theres one in clear as well?
    lastTemplate = name; //must be after restore and clear
    currentFeature = name;
  }
  const restoreColour = (lastTemplateArray) => {
    // console.log(name);
    // let tempArray = undefined;
    // if (typeof lastTemplate == undefined) {tempArray =  document.querySelectorAll('.drawn, .fill')} else {tempArray = lastTemplate};
    if(lastTemplate== name) {
    // query selector all might work better, because last template only grabs the most recent one, which breaks when you cycle through a few templates then switch feature
    document.querySelectorAll('.drawn, .fill').forEach(cell => {
    // lastTemplateArray.forEach(cell => {
        if (!cell.classList.contains(name+'-template')) {
          console.log(cell.object.c, cell.object.d)
          cell.object.changeColour(cell.object.d);
          cell.object.c = cell.object.d;
          cell.object.colour();


        }
      })
    }
    // if (lastTemplate != undefined) {
    //   // console.log(lastTemplate)
    //   lastTemplate.forEach(cc => {
    //   // tempArray.forEach(cell => {
    //     let cell = cellArray[cc[1]][cc[0]];
    //     // console.log(cell.classList);
    //     if (!cell.classList.contains(name+'-template')) {
    //       cell.object.changeColour(cell.object.d);
    //       cell.object.c = cell.object.d;
    //       cell.object.colour();
    //     }
    //   })
    // }
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
      } else if (cellDom.classList.contains('template')) {
        cellDom.classList.remove('template');
        cellDom.style.backgroundColor = '';
      }
    } else {
      cellDom.classList.add('drawn');
      cellDom.object.changeColour(currentColourNo);
      cellDom.object.c = currentColourNo;
      cellDom.object.colour();

      cellDom.object.lastDrawnColour(currentColourNo);
      cellDom.object.d = currentColourNo;
    }
  }
}

function hold() {
  holdDraw();
}

function clickDraw() {
  //CHANGE SO IT ERASES TEMPLATE ON CLICK, currently doesnt have draw so doesnt
  if (event.buttons == 1) {
    let cellDom = (event.srcElement.classList.contains('cell')) ? event.srcElement : event.srcElement.parentNode;
    if (cellDom.classList.contains('drawn') && cellDom.object.c != currentColourNo) {
      cellDom.object.changeColour(currentColourNo);
      cellDom.object.c = currentColourNo;
      cellDom.object.colour();

      cellDom.object.lastDrawnColour(currentColourNo);
      cellDom.object.d = currentColourNo;

      erasing = false;
    } else if (cellDom.classList.contains('drawn')) {
      cellDom.classList.remove('drawn');
      cellDom.style.backgroundColor = '';
      erasing = true;
    } else if (cellDom.classList.contains('template')) {
      cellDom.classList.remove('template');
      cellDom.style.backgroundColor = '';
      erasing = true;
    } else if (cellDom.classList.contains('fill')) {
      cellDom.classList.remove('fill');
      cellDom.style.backgroundColor = '';
      erasing = true;
    } else {
      cellDom.classList.add('drawn');
      cellDom.object.changeColour(currentColourNo);
      cellDom.object.c = currentColourNo;
      cellDom.object.colour();

      cellDom.object.lastDrawnColour(currentColourNo);
      cellDom.object.d = currentColourNo;

      erasing = false;
    }
  }
}

function fill() {
  let noFillSelector = '.drawn, .template';
  let cellDom = (event.srcElement.classList.contains('cell')) ? event.srcElement : event.srcElement.parentNode;
  // let old_colour = cellDom.object.c;
  let old_colour = getComputedStyle(cellDom).backgroundColor;
  let fill_colour = currentColourNo;
  let maxY = 27; let maxX = 20;
  let direction = 0; //0 up 1 right 2 down, 3 left
  let done = false;
  let colourWord = colours[currentColourNo];
  cellDom.object.changeColour(fill_colour);
  cellDom.object.colour();
  cellDom.style.backgroundColor = colourWord;
  cellDom.classList.add('fill');

  // console.log('fill', cellDom.object, fill_colour, old_colour);
  function cell(direction) {
    switch(direction) {
      case 0:
        return cellArray[cellDom.object.y+1][cellDom.object.x];
        break;
      case 1:
        return cellArray[cellDom.object.y][cellDom.object.x+1];
        break;
      case 2:
        return cellArray[cellDom.object.y-1][cellDom.object.x];
        break;
      case 3:
        return cellArray[cellDom.object.y][cellDom.object.x-1];
    }
  }
  function move() {
    // console.log(99)
    let fill_and_move = false;
    direction == 0 ? direction+=3 : direction--;
    let tries = 0;
    let loops = 0;
    while (fill_and_move == false && tries < 4 && loops < (5)) {

      let target_cell = cell(direction);
      // target_cell.
      console.log(target_cell);
      let target_bg = (target_cell == undefined) ? 'window' : getComputedStyle(target_cell).backgroundColor;
      if (target_bg == old_colour){
        // if (target_cell.object.c == old_colour){
        fill_and_move = true;
        target_cell.object.c == fill_colour;
        target_cell.classList.add('fill');
        target_cell.object.changeColour(fill_colour);
        cellDom = target_cell;
        cellDom.object.changeColour(fill_colour);
        cellDom.object.c == fill_colour;
        cellDom.object.colour(fill_colour);
        cellDom.style.backgroundColor = colourWord;
        cellDom.classList.add('fill');
        console.log(cellDom.object, target_cell.object, direction, 'fill and move');
      } else if (tries==4) {
        done = true;
        console.log('tries=4');
      } else {
        fill_and_move = false;
        direction == 3 ? direction-=3 : direction++;
        tries++;
        console.log(direction, 'try again');
      }
      loops++;


    }
    if (tries == 4) {
      done = true;
    }
  }
  loops = 0;

  // for (let i = 0; i < 4; i++) {
  //   direction = i;
    while (done == false && loops < (21*27)) {
      console.log('2nd while');
      move();
      loops++;
    }
  // }

  //directions


}

function click() {
  if (tool == 'fill') {
    fill();
  } else {
    clickDraw();
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

    cell.children[0].addEventListener('mouseover', hold);
    // cell.children[0].addEventListener('mousedom', ()=>{return false;});
    cell.addEventListener('mousedown', click);
    drawReceiver.ondragstart = () => {return false}; //WOO REMOVES DRAG!
    // cell.children[0].addEventListener('mousedown', clickDraw);
    let haveTracing = false;
    // haveTracing = true;
    if (haveTracing) {
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
  let result = document.querySelector('[name=result]');
  let array = [];
  result.value = '';
  document.querySelectorAll('.drawn').forEach(cell => {

    if (typeof cell.object.c == 'undefined') { cell.object.c = 0; }
console.log(cell.object.c);
    array.push({x:cell.object.x, y:cell.object.y, c:cell.object.c});
    result.value+= '[' + cell.object.x + ',' + cell.object.y + ',' + cell.object.c + '],';//arr
  })

}

function saveAll() {
  let result = document.querySelector('[name=result]');
  let array = [];
  result.value = '';
  // document.querySelectorAll(".drawn, [class$='-template']").forEach(cell => {
  document.querySelectorAll(".drawn, .template, .fill").forEach(cell => {

    if (typeof cell.object.c == 'undefined') {
      cell.object.c = 0;
    }
    // console.log(cell.object.c);
    array.push({x:cell.object.x, y:cell.object.y, c:cell.object.c});
    result.value+= '[' + cell.object.x + ',' + cell.object.y + ',' + cell.object.c + '],';//arr
  })

}

function saveAllMono() {
  let result = document.querySelector('[name=result]');
  let array = [];
  result.value = '';
  // document.querySelectorAll(".drawn, [class$='-template']").forEach(cell => {
  document.querySelectorAll(".drawn, .template, .fill").forEach(cell => {
    console.log(cell.object);
    array.push({x:cell.object.x, y:cell.object.y});
    result.value+= '[' + cell.object.x + ',' + cell.object.y + '],';//arr
  })

}

function fillFace() {
  cellArray.forEach(row => {
    //row
    let onFaceLine = false;
    let backOnFaceLine = false;
    let insideFace = false;
    let faceArray = [];

    let outsideFace = true;
    row.forEach(cell => {
      if (cell.classList.contains('face-template')) {
        faceArray.push(cell.object.x);
      } else if (faceArray.length == 0) {
        outsideFace = true;
        cell.object.fill = false;
      }
      if (cell.object.x >= 21  - faceArray[0]) {
        outsideFace = true;
        cell.object.fill = false;
      }
    })

    row.forEach(cell => {
      let hasOtherTemplate = undefined;
      Array.from(cell.classList).forEach(cl => {
        if(cl.toString().includes('face-template')){
          hasOtherTemplate = false;
        } else if(cl.toString().includes('-template')) {
          hasOtherTemplate = true;
        }
      });

      if (cell.object.fill == false || cell.classList.contains('drawn') || hasOtherTemplate || cell.classList.contains('face-template')) {} else {
        cell.classList.add('fill');
        cell.object.changeColour(currentColourNo);
        cell.object.c = currentColourNo;
        cell.object.colour();

        cell.object.lastDrawnColour(currentColourNo);
        cell.object.d = currentColourNo;
      }


    })
  })

}

function importSaved() {
  let box = parseInt(document.querySelector('[name=result]').value);

  let map = mask_store[box].map;
  console.log(map)
  map.forEach(cell => {
    console.log(cell)
    console.log(cellArray[cell[1]][cell[0]])
    let currentCell = cellArray[cell[1]][cell[0]];
    cellArray[cell[1]][cell[0]].style.backgroundColour = colours[cell[2]];
    currentCell.classList.add('drawn');
    currentCell.object.changeColour(cell[2]);
    currentCell.object.c = cell[2];
    currentCell.object.colour();

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
document.querySelector('[name=save-all]').addEventListener('click', saveAll);
document.querySelector('[name=save-all-mono]').addEventListener('click', saveAllMono);
document.querySelector('[name=import]').addEventListener('click', importSaved);
document.querySelector('[name=fill-face]').addEventListener('click', fillFace);
document.querySelector('[name=clear-all]').addEventListener('click', clearAll);
document.querySelector('[name=clear-drawn]').addEventListener('click', clearDrawn);
document.querySelector('[name=fill-tool]').addEventListener('click', () => {tool = 'fill';});
document.querySelector('[name=draw-tool]').addEventListener('click', () => {tool = 'draw';});
document.querySelector('[name=big-tool]').addEventListener('click', () => {tool = 'big';});

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
