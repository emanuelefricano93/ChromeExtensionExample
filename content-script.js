
chrome.storage.sync.get('lastSelectedColor', function(data) {


var div = document.createElement("div");


getSizeInPixels = function(sizeInCm) {
    return ((sizeInCm * 96 * window.devicePixelRatio) / 2.54) + 'px';
}

div.style.top = 0;
div.style.left = 0;
/* div.style.backgroundColor =  data.lastSelectedColor || "red"; */
div.style.backgroundColor =  "#000000";
div.style.opacity = "0.3";
div.style.border = "1px solid black";
div.style.borderRadius = "6px";
div.style.width =  getSizeInPixels(28.78);
div.style.height = getSizeInPixels(16.19);
div.style.display = "flex";
div.style.justifyContent = "center";
div.style.cursor = "move";

var p = document.createElement("p");
div.appendChild(p);
p.style.color = "white";
p.innerText = "13,3''";



function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

div.style.position = "absolute";
dragElement(div);
document.body.appendChild(div);

});
