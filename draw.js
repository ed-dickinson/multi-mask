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
  const getColour = () => {
    return c;
  }
  const colour = (current) => {
    if (current) {dom.style.backgroundColor = colours[current];} else {
    dom.style.backgroundColor = colours[c];}
  }
  return {dom, x, y, c, d, colour, changeColour, lastDrawnColour, getColour};
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


function swapCells(cellDom) {
  let old_colour = cellDom.object.c;

  let new_colour = currentColourNo;
  document.querySelectorAll('.drawn').forEach(cell => {
    if (cell.object.c==old_colour) {
      cell.object.changeColour(new_colour);
      cell.object.c = new_colour;
      cell.object.colour();
    }
  })

}



function fillCells(cellDom) {
  let old_colour = cellDom.object.c;

  let new_colour = currentColourNo;

  let filledArray = [cellDom];

  let directions = [0,1,2,3];

  function cellDirection(cellDom, dir) {
    switch(dir) {
      case 0:
      x = cellDom.object.x;
      y = cellDom.object.y + 1;
      break;
      case 1:
      x = cellDom.object.x + 1;
      y = cellDom.object.y;
      break;
      case 2:
      x = cellDom.object.x;
      y = cellDom.object.y - 1;
      break;
      case 3:
      x = cellDom.object.x - 1;
      y = cellDom.object.y;

    }
    if (x >= 0 && x < 21 && y >= 0 && y < 28) {
      return cellArray[y][x];
    } else {
      return undefined;
    }

  }

  function moveToCell(cellDom, dir) {
    filledArray.push(cellDom);
    switch(dir) {
      case 0:
      x = cellDom.object.x;
      y = cellDom.object.y + 1;
      break;
    }
    let new_directions = [];
    switch(dir) {
      case 0: new_directions = [1,0,3]; break;
      case 1: new_directions = [0,2,1]; break;
      case 2: new_directions = [2,1,3]; break;
      case 3: new_directions = [0,3,2];
    }


    checkDirections(cellDom, new_directions);

  }

  function checkDirections(cellDom, directions) {
    directions.forEach(direction => {

      let new_cellDom = cellDirection(cellDom, direction);
      if (new_cellDom != undefined) {
      let new_cell_colour = new_cellDom.object.c;
      if (

          new_cell_colour == old_colour
          && new_cell_colour != new_colour
          && filledArray.indexOf(new_cellDom)==-1) {
        moveToCell(new_cellDom, direction);
      }
    }
    })
  }

  checkDirections(cellDom, directions);



  filledArray.forEach(cell => {

    cell.object.changeColour(new_colour);
    cell.object.c = new_colour;
    cell.object.colour();
    cell.classList.add('drawn');

  })

}

function click() {
  let cellDom = (event.srcElement.classList.contains('cell')) ? event.srcElement : event.srcElement.parentNode;
  if (tool == 'erase') {
    let drawArray = expandCell(cellDom);
    eraseCells(drawArray);
  } else if (tool == 'swap') {
    fillCells(cellDom);
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

    mask_drawer.appendChild(cell);
    let cellObject = Cell(cell, i, j);
    let drawReceiver = document.createElement('div');
    drawReceiver.classList.add('cell-draw-receiver');
    cell.appendChild(drawReceiver);

    arrayRow[i] = cell;
    cell.object = cellObject;

    cell.children[0].addEventListener('mouseover', hold);

    cell.addEventListener('mousedown', click);
    drawReceiver.ondragstart = () => {return false}; //WOO REMOVES DRAG!


  }
  cellArray[j] = arrayRow;
}


function clearDrawn() {
  document.querySelectorAll('.drawn').forEach(cell => {
    cell.classList.remove('drawn');
    cell.style.backgroundColor = '';
  });
}

function clearAll() {
  clearDrawn();
}


function toolSizeUpdate(){

  tool_buttons.forEach(button => {
    button.classList.remove('selected');
  })
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

  currentColourNo = Array.from(colourButtonCont.children).indexOf(event.target);
  currentColour = colours[currentColourNo];

  colour_buttons.forEach(button => {
    button.classList.remove('selected');
  })
  colour_buttons[currentColourNo].classList.add('selected');
}

const colour_buttons = [];


colours.forEach(colour => {
  let i = colours.indexOf(colour);

  let sub = document.createElement('button');

  sub.style.backgroundColor = colour;
  colourButtonCont.appendChild(sub);
  sub.addEventListener('click', colourSelect);
  colour_buttons.push(sub);

  colourButtonCont.style.width = (5 * sub.clientWidth) + (6*5) + 3 + 'px';
  colourButtonCont.style.height = (4 * sub.clientWidth) + (5*5) + 'px';

  let box_size = 34;
  let xy = [];
  switch(i) {//greys
    case 0: xy = [0,3]; break;
    case 18: xy = [0,1]; break;
    case 19: xy = [0,2]; break;
    case 5: xy = [0,0]; break;
    default:
  }

  if (i > 0 && i <= 4) { //skins
    xy = [i,3];
  } else if (i >= 14 && i <= 17) {// purp - red
    xy = [i-13,0]
  } else if (i >= 10 && i <= 13) {// oranfe - green
    xy = [i-9,2]
  } else if (i >= 6 && i <= 9) { //blue - green
    xy = [10-i,1]
  }

  sub.style.left = 3 + xy[0] * box_size + 'px'; sub.style.top = 3 + xy[1] * box_size + 'px';

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
