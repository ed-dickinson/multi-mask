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
let tool_size = 1;
let currentColourNo = 0;

const colours0 = ['black','saddlebrown','chocolate','sandybrown','wheat','white', 'dodgerblue', 'aqua','aquamarine','lightgreen','mediumseagreen', 'limegreen', 'gold','orange','orangered','crimson','palevioletred','mediumpurple',];//darkorchid?
//peru   // chocolate','sandybrown' or 'sienna','tan'

const colours = ['black','saddlebrown','chocolate','sandybrown','wheat','white', 'dodgerblue', 'aqua','aquamarine','lightgreen','mediumseagreen', 'limegreen', 'gold','orange','orangered','crimson','palevioletred','mediumpurple','lightgrey','dimgrey'];
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


mask_drawer.style.width = x * cell_size + 'em';
mask_drawer.style.height = y * cell_size + 'em';


function hold() {
  if (event.buttons == 1) {
    let cellDom = event.srcElement.parentNode;
    if (tool == 'erase') {
      let drawArray = expandCell(cellDom);
      eraseCells(drawArray);
    } else if (tool == 'swap'){
      return;
    } else {
      let drawArray = expandCell(cellDom);
      drawCells(drawArray);

    }
  }
}


function expandCell(cellDom) {
  let cellX = cellDom.object.x;
  let cellY = cellDom.object.y;
  let drawArray = [cellDom];
  let extra_cells = [];

  switch(tool_size) {
    case 1: extra_cells = []; break;
    case 2: extra_cells = [[-1,0],[0,1],[1,0],[0,-1]]; break;
    case 3: extra_cells = [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]]; break;
    case 4: extra_cells = [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1], [-2,0],[0,2],[2,0],[0,-2]]; break;
    case 5: extra_cells = [[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1], [-2,0],[0,2],[2,0],[0,-2], [-2,1],[1,2],[2,1],[1,-2],[-2,-1],[-1,2],[2,-1],[-1,-2],];
  }

  extra_cells.forEach(coord => {
    let newX = cellX+coord[0]; let newY = cellY+coord[1];
    if (newX < 21 && newX >= 0 && newY < 28 && newY >= 0) {
      drawArray.push(cellArray[newY][newX]);
    }
  })

  return drawArray;
}

function drawCells(draw_array) {
  draw_array.forEach(cellDom => {
    if (!cellDom.classList.contains('drawn')) {
      cellDom.classList.add('drawn');
    }
    cellDom.object.changeColour(currentColourNo);
    cellDom.object.c = currentColourNo;
    cellDom.object.colour();
  })
}

function eraseCells(draw_array) {
  draw_array.forEach(cellDom => {
    if (cellDom.classList.contains('drawn')) {
      cellDom.classList.remove('drawn');
    }
    cellDom.style.backgroundColor = '';
    cellDom.object.changeColour(undefined);
    cellDom.object.c = undefined;
    cellDom.object.colour();
  })
}

// function swapRelease() {
//   console.log(event.target)
//   let cellDom = (event.srcElement.classList.contains('cell')) ? event.srcElement : event.srcElement.parentNode;
//   return cellDom.object.c;
// }

function swapCells(cellDom) {
  let old_colour = cellDom.object.c;
  // console.log(cellDom.parentNode)
  // cellDom.parentNode.addEventListener('mouseup', swapRelease);
  let new_colour = currentColourNo;
  document.querySelectorAll('.drawn').forEach(cell => {
    if (cell.object.c==old_colour) {
      cell.object.changeColour(new_colour);
      cell.object.c = new_colour;
      cell.object.colour();
    }
  })

}

function click() {
  let cellDom = (event.srcElement.classList.contains('cell')) ? event.srcElement : event.srcElement.parentNode;
  if (tool == 'erase') {
    let drawArray = expandCell(cellDom);
    eraseCells(drawArray);
  } else if (tool == 'swap') {
    swapCells(cellDom);
  } else {
    let drawArray = expandCell(cellDom);
    drawCells(drawArray);
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
  // features_array.forEach(feature => {
  //   feature.clear();
  // })
}


// function toolSizeDisplayUpdate(){document.querySelector('[name=tool-size-display').value=tool_size;}
// document.querySelector('[name=tool-size-up]').addEventListener('click', ()=>{
//   if (tool_size < 5) {tool_size++; toolSizeDisplayUpdate();}
// });
// document.querySelector('[name=tool-size-down]').addEventListener('click', ()=>{
//   if (tool_size > 1) {tool_size--; toolSizeDisplayUpdate();}
// });

function toolSizeUpdate(){

  tool_buttons.forEach(button => {
    button.classList.remove('selected');
  })
  // event.target.classList.add('selected');
  tool_buttons[tool_size-1].classList.add('selected');
}
let tool_buttons = document.querySelectorAll('[name=tool-size]');
tool_buttons.forEach(button => {
  button.addEventListener('click', ()=>{
    tool_size=parseInt(event.target.value);
    toolSizeUpdate();
  })
});
tool_buttons[tool_size-1].classList.add('selected');

const draw_button = document.querySelector('[name=draw-tool]');
const erase_button = document.querySelector('[name=erase-tool]');
const swap_button = document.querySelector('[name=swap-tool]');

function eraseTool() {
  tool = 'erase';
  draw_button.classList.remove('selected');
  swap_button.classList.remove('selected');
  erase_button.classList.add('selected');
}

function drawTool() {
  tool = 'draw';
  erase_button.classList.remove('selected');
  swap_button.classList.remove('selected');
  draw_button.classList.add('selected');
}
function swapTool() {
  tool = 'swap';
  erase_button.classList.remove('selected');
  draw_button.classList.remove('selected');
  swap_button.classList.add('selected');
}

document.querySelector('[name=clear-all]').addEventListener('click', clearAll);
draw_button.addEventListener('click', () => {
  drawTool();
});
erase_button.addEventListener('click', () => {
  eraseTool();
});
swap_button.addEventListener('click', () => {
  swapTool();
});

let cellGridsOn = false;
function gridToggle() {
  let cells = document.querySelectorAll('.cell');
  if (cellGridsOn) {
    cells.forEach(cell => {
      cell.style.boxShadow = '';
    })
    cellGridsOn = false;
    event.target.classList.remove('selected');
  } else {
    cells.forEach(cell => {
      cell.style.boxShadow = '0px 0px 1px black';
    })
    cellGridsOn = true;
    event.target.classList.add('selected');
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
  // colourButtonCont.style.borderColor = currentColour;
  colour_buttons.forEach(button => {
    button.classList.remove('selected');
  })
  colour_buttons[currentColourNo].classList.add('selected');
}

const colour_buttons = [];
//
// (function () {
//   let skins = colours.slice(1,5);
//   let greys = colours.slice(18);
//   let multis = colours.slice(6,18);
//
//   colours_sorted = [colours[0]].concat(greys,colours[5],multis,skins);
// })();
// () => {
  // let colours_sorted = colours;

  // colours_new.slice()


// }

// console.log(colours_sorted);
// let colours_sorted = colours[0].concat(colours.slice(5,15),colours.slice(15),);


// colours_sorted = [colours[0],colours[18],colours]

colours.forEach(colour => {


  let sub = document.createElement('button');

  sub.style.backgroundColor = colour;
  colourButtonCont.appendChild(sub);
  sub.addEventListener('click', colourSelect);
  colour_buttons.push(sub);

  // if ((colours.indexOf(colour)+1) % 5 == 0) {
  //   // colourButtonCont.innerHTML += '<br>';
  // }
  colourButtonCont.style.width = (6 * sub.clientWidth) + (6*6) + 'px';
})

colour_buttons[currentColourNo].classList.add('selected');

function drawRestore(){
  drawTool();
  document.removeEventListener("keyup", drawRestore);
}
let holding_erase = false;
document.addEventListener("keyup", ()=>{holding_erase=false;});

document.addEventListener("keydown", event => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  // } else if (inputting_name && (event.keyCode >= 48 && event.keyCode <=90)) {
  //   name_input_inner.innerHTML += event.key;
  // } else if (inputting_name && event.key == 'Backspace') {
  //   name_input_inner.innerHTML = name_input_inner.innerHTML.substr(0,name_input_inner.innerHTML.length-1);
  // } else if (inputting_name && event.code == 'Space') {
  //   name_input_inner.innerHTML += '&nbsp';
  // } else if (inputting_name && event.key == 'Enter') {
  //   inputting_name = false;
  } else if (event.code == 'KeyE' || event.keyCode == 69) {
    eraseTool();
    holding_erase = true;
    setTimeout(function(){
      if (holding_erase == true) {
        document.addEventListener("keyup", drawRestore);
      }
     }, 300);12
  } else if (event.code == 'KeyD' || event.keyCode == 68) {
    drawTool();
  } else if (event.key > 0 && event.key <= 5) {
    drawTool();
    tool_size=parseInt(event.key);
    toolSizeUpdate();
  }

});

// const name_input = document.querySelector('[name=name-input-button]');
// const name_input_inner = document.querySelector('.name-input-inner');

// let inputting_name = undefined;

// name_input.addEventListener("click", () => {
//   name_input.classList.add('selected');
//   if (inputting_name == undefined) {name_input_inner.innerHTML = '';}

//   inputting_name = true;
// })
