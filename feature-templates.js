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