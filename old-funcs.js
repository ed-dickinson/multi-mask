// function save() {
//   let result = document.querySelector('[name=result]');
//   let array = [];
//   result.value = '';
//   document.querySelectorAll('.drawn').forEach(cell => {
//     console.log(cell.object);
//     array.push({x:cell.object.x, y:cell.object.y});
//     result.value+= '[' + cell.object.x + ',' + cell.object.y + '],';//arr
//   })
// }

// function saveColour() {
//   let result = document.querySelector('[name=result]');
//   let array = [];
//   result.value = '';
//   document.querySelectorAll('.drawn').forEach(cell => {
//
//     if (typeof cell.object.c == 'undefined') { cell.object.c = 0; }
// console.log(cell.object.c);
//     array.push({x:cell.object.x, y:cell.object.y, c:cell.object.c});
//     result.value+= '[' + cell.object.x + ',' + cell.object.y + ',' + cell.object.c + '],';//arr
//   })
//
// }

// function saveAll() {
//   let result = document.querySelector('[name=result]');
//   let array = [];
//   result.value = '';
//   // document.querySelectorAll(".drawn, [class$='-template']").forEach(cell => {
//   document.querySelectorAll(".drawn, .template, .fill").forEach(cell => {
//
//     if (typeof cell.object.c == 'undefined') {
//       cell.object.c = 0;
//     }
//     // console.log(cell.object.c);
//     array.push({x:cell.object.x, y:cell.object.y, c:cell.object.c});
//     result.value+= '[' + cell.object.x + ',' + cell.object.y + ',' + cell.object.c + '],';//arr
//   })
//
// }

// function saveAllMono() {
//   let result = document.querySelector('[name=result]');
//   let array = [];
//   result.value = '';
//   // document.querySelectorAll(".drawn, [class$='-template']").forEach(cell => {
//   document.querySelectorAll(".drawn, .template, .fill").forEach(cell => {
//     console.log(cell.object);
//     array.push({x:cell.object.x, y:cell.object.y});
//     result.value+= '[' + cell.object.x + ',' + cell.object.y + '],';//arr
//   })
//
// }

// function fillFace() {
//   cellArray.forEach(row => {
//     //row
//     let onFaceLine = false;
//     let backOnFaceLine = false;
//     let insideFace = false;
//     let faceArray = [];
//
//     let outsideFace = true;
//     row.forEach(cell => {
//       if (cell.classList.contains('face-template')) {
//         faceArray.push(cell.object.x);
//       } else if (faceArray.length == 0) {
//         outsideFace = true;
//         cell.object.fill = false;
//       }
//       if (cell.object.x >= 21  - faceArray[0]) {
//         outsideFace = true;
//         cell.object.fill = false;
//       }
//     })
//
//     row.forEach(cell => {
//       let hasOtherTemplate = undefined;
//       Array.from(cell.classList).forEach(cl => {
//         if(cl.toString().includes('face-template')){
//           hasOtherTemplate = false;
//         } else if(cl.toString().includes('-template')) {
//           hasOtherTemplate = true;
//         }
//       });
//
//       if (cell.object.fill == false || cell.classList.contains('drawn') || hasOtherTemplate || cell.classList.contains('face-template')) {} else {
//         cell.classList.add('fill');
//         cell.object.changeColour(currentColourNo);
//         cell.object.c = currentColourNo;
//         cell.object.colour();
//
//         cell.object.lastDrawnColour(currentColourNo);
//         cell.object.d = currentColourNo;
//       }
//
//
//     })
//   })
//
// }

// function importSaved() {
//   let box = parseInt(document.querySelector('[name=result]').value);
//
//   let map = mask_store[box].map;
//   console.log(map)
//   map.forEach(cell => {
//     console.log(cell)
//     console.log(cellArray[cell[1]][cell[0]])
//     let currentCell = cellArray[cell[1]][cell[0]];
//     cellArray[cell[1]][cell[0]].style.backgroundColour = colours[cell[2]];
//     currentCell.classList.add('drawn');
//     currentCell.object.changeColour(cell[2]);
//     currentCell.object.c = cell[2];
//     currentCell.object.colour();
//
//   })
// }
