
function getXY(canvas, event){ //adjust mouse click to canvas coordinates
  const rect = canvas.getBoundingClientRect()
  const y = event.clientY - rect.top
  const x = event.clientX - rect.left
  return {x:x, y:y}
}

function button(x1,y1,x2,y2,color="red",text = "texto",action = function(){alert("Click");}){
  botones.rectangle(x1,y1,x2,y2,color)
  this.x1 = x1;
  this.x2 = x2;
  this.y1 = y1;
  this.y2 = y2;
  document.addEventListener("click",  function (e) {
  //use the shape data to determine if there is a collision
  var pos = getXY(canvas, event)
  // console.log(x1,y1,x2,y2);
  if (pos.x >= x1 && pos.x <= (x2+x1) && pos.y >= y1 && pos.y <= (y2+y1)) {
    action()
  }
}, false)
}
