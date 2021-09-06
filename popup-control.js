function toggleControls(on) {

  if (on == 'on') {
    if (!controls.contains('shown')) {  controls.add('shown');    }
  } else if (on == 'off') {
    if (controls.contains('shown')) {   controls.remove('shown'); }
  } else {
    controls.toggle('shown');
  }
  if (retreived_mask) {
    save_button.style.display = 'none';
    update_button.style.display =  'inline-block';
    delete_button.style.display =  'inline-block';
  } else {
    save_button.style.display = 'inline-block';
    update_button.style.display =  'none';
    delete_button.style.display =  'none';
  }
}

let controls = document.querySelector('.mask-drawer-controls').classList;
let info = document.querySelector('.info-drawer').classList;

function toggleInfo(on) {

  if (on == 'on') {
    if (!info.contains('shown')) {  info.add('shown');    }
  } else if (on == 'off') {
    if (info.contains('shown')) {   info.remove('shown'); }
  } else {
    info.toggle('shown');
  }


}

document.querySelector('.sub-title').addEventListener('click', () => {
  if (info.contains('shown')) {
    toggleInfo('off');
    setTimeout(function(){  toggleControls('on');}, 200);
  } else {
    toggleControls();
  }

})

document.querySelector('.close-controls').addEventListener('click', () => {
  toggleControls('off');

})

document.querySelector('.close-info').addEventListener('click', () => {
  toggleInfo('off');

})

document.querySelector('.title').addEventListener('click', () => {
  if (controls.contains('shown')) {
    toggleControls('off');
    setTimeout(function(){  toggleInfo('on');}, 200);
  } else {
    toggleInfo();
  }

})
