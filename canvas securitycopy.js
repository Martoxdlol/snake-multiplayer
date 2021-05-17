

function resizer(){
  var canvas = document.getElementById('game')
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
}

function virtualcanvas(canvas) {
  this.background = "#FFFFFF";
  this.virtualwidth = 1000;
  this.virtualheight = (this.virtualwidth/canvas.width)*canvas.height;
  this.objetos = [];
  this.rectangle = function rectangle(a, b, c, d, color, ax = "left", ay = "up"){
    this.objetos[this.objetos.length] = {
      type: "rect",
      x1: a,
      y1: b,
      x2: c,
      y2: d,
      alignx: ax,
      aligny: ay,
      color: color
    }
  }
    this.multiplicador_x = canvas.width/this.virtualwidth;
  this.render = function(){
    this.virtualheight = (this.virtualwidth/canvas.width)*canvas.height;
    var multiplicador_x = canvas.width/this.virtualwidth;
    var multiplicador_y = canvas.width/this.virtualwidth;
    var c = canvas;
    var ctx=c.getContext("2d");

    if (this.background != "none") {
      ctx.fillStyle = this.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }


    this.objetos
    for (var i = 0; i < this.objetos.length; i++) {
      if (this.objetos[i].type == "rect") {
        ctx.fillStyle = this.objetos[i].color;
        var aa;
        var bb;
        var cc;
        var dd;
        if (this.objetos[i].alignx == "center") {
          aa = this.objetos[i].x1*multiplicador_x + this.virtualwidth*multiplicador_x/2;
          cc = this.objetos[i].x2*multiplicador_x;
        }
        if (this.objetos[i].alignx == "left") {
          aa = this.objetos[i].x1*multiplicador_x;
          cc = this.objetos[i].x2*multiplicador_x;
        }
        if (this.objetos[i].alignx == "right") {
          aa = -this.objetos[i].x1*multiplicador_x + this.virtualwidth*multiplicador_x;
          cc = -this.objetos[i].x2*multiplicador_x
        }

        if (this.objetos[i].aligny == "center") {
          bb = this.objetos[i].y1*multiplicador_x + this.virtualheight*multiplicador_x/2;
          dd = this.objetos[i].y2*multiplicador_x;
        }
        if (this.objetos[i].aligny == "up") {
          bb = this.objetos[i].y1*multiplicador_x;
          dd = this.objetos[i].y2*multiplicador_x;
        }
        if (this.objetos[i].aligny == "down") {
          bb = -this.objetos[i].y1*multiplicador_x + canvas.height;
          dd = -this.objetos[i].y2*multiplicador_x
        }
        //console.log(aa,bb,cc,dd);
        ctx.fillRect(parseInt(aa),parseInt(bb),parseInt(cc),parseInt(dd));
      }
    }
  }
}



var pep = new virtualcanvas(canvas);
var c400 = pep.virtualheight-200;
var separator = c400/30;


//window.addEventListener("resize", function(e){pep.render()});
function gridCoord(i,i2){
  var pep = new virtualcanvas(canvas)
  if (canvas.height < canvas.width) {
    var borde = 3;
    var c400 = pep.virtualheight-200;
    var separator = c400/30;
    var rex = 100+i*separator;
    var rey = 100+i2*separator;
    var re = {
      x: rex,
      y: rey,
      size: separator+2
    }
    return re;

  }else {
    var borde = 3;
    var rex = 36+i*32;
    var rey = 100+i2*32;
    var re = {
      x: rex,
      y: rey,
      size: 34
    }
    return re;
  }
}
var speed = 0.3;
var asd;
var snakes_inicial = [[{x:0,y:10,pos:2,muerto:false},{x:0,y:11,color:"#FFFa10"},{x:0,y:12,color:"#FFFa10"},{x:0,y:13,color:"#FFFa10"},{x:1,y:13,color:"#FFFa10"},{x:2,y:13,color:"#FFFa10"},{x:3,y:13,color:"#FFFa10"},{x:4,y:13,color:"#FFFa10"},{x:5,y:13,color:"#FFFa10"},{x:6,y:13,color:"#FFFa10"},{x:7,y:13,color:"#FFFa10"},{x:8,y:13,color:"#FFFa10"},{x:9,y:13,color:"#FFFa10"},{x:10,y:13,color:"#FFFa10"}],[{x:5,y:0,pos:2,muerto:false},{x:5,y:1,color:"#242d3a"},{x:5,y:2,color:"#242d3a"},{x:5,y:3,color:"#242d3a"},{x:6,y:3,color:"#242d3a"},{x:7,y:3,color:"#242d3a"},{x:8,y:3,color:"#242d3a"},{x:9,y:3,color:"#242d3a"},{x:10,y:3,color:"#242d3a"},{x:11,y:3,color:"#242d3a"},{x:12,y:3,color:"#242d3a"},{x:13,y:3,color:"#242d3a"},{x:14,y:3,color:"#242d3a"},{x:15,y:3,color:"#242d3a"}]]
console.log(snakes);
var snakes = snakes_inicial;
//---0
//1--+--2
//---3
function drawSnake(newsnake,id){
  snakes[id] = newsnake;
};


function voidUpdate(){
  function realsize(a){
    return (a/pep.multiplicador_x)
  }
  var pep = new virtualcanvas(canvas);

  //pep.rectangle(-15,0,30,300,"#cc33cc", "c  enter", "down")
  //pep.rectangle(0,0,100,pep.virtualheight,"#FF0000")
  pep.background = "#abcabc"

  console.log(pep.virtualheight);

  var grid = new virtualcanvas(canvas);
  grid.background = "none";



  if (canvas.height < canvas.width) {
    var borde = 3;
    var c400 = pep.virtualheight-200;
    var separator = c400/30;
    for (var i = 0; i < 30; i++) {
      grid.rectangle(100+i*separator,100,realsize(borde),c400-separator+realsize(borde), "#FF0000")
    }
    for (var i = 0; i < 30; i++) {
      grid.rectangle(100, 100+i*separator, c400-separator+realsize(borde), realsize(borde), "#FF0000")
    }
  }else {
    var borde = 3;
    if (canvas.width < 1000) {
      borde = 2;
    }
    var c400 = pep.virtualheight-200;
    var separator = c400/30;
    for (var i = 0; i < 30; i++) {
      grid.rectangle(36+i*32,100,realsize(borde),944-16+realsize(borde), "#FF0000")
    }
    for (var i = 0; i < 30; i++) {
      grid.rectangle(36, 100+i*32, 944-16+realsize(borde), realsize(borde), "#FF0000")
    }

  }


  // if (asd < 28) {
  // asd+=speed;
  // }else{
  //   asd = 0;
  // }
  // var coordenadas = gridCoord(parseInt(asd),0);
  // //console.log(coordenadas);
  // pep.rectangle(coordenadas.x,coordenadas.y,coordenadas.size,coordenadas.size, "#ccad12")

  snakes.forEach(function(snake) {


    coord_snake = []
    coord_snake[0] = {}
    coord_snake[0] = {x:snake[0].x,y:snake[0].y}
    var originalX = snake[0].x
    var originalY = snake[0].y
    for (var i = 1; i < snake.length; i++) {

      coord_snake[i] = {}
      coord_snake[i] = {x:snake[i].x,y:snake[i].y}
      var x;
      var y;


      coord_snake[i].x = snake[i].x;
      coord_snake[i].y = snake[i].y;
    }


    gameSync()



    for (var i = 0; i < coord_snake.length; i++) {
      var color = "blue"
      if (snake[i].color) {
        color = snake[i].color;
      }
      coord_snake[i]
      var coordenadas = gridCoord(coord_snake[i].x,coord_snake[i].y)
      pep.rectangle(coordenadas.x,coordenadas.y,coordenadas.size-1,coordenadas.size-1, color)
    }
  });

pep.render()
grid.render()

}

setInterval(function(){ voidUpdate() }, 33);

function rectangle(a, b, c, d, color){
  ctx.fillStyle = color;
  ctx.fillRect(a,b,c,d);
}
