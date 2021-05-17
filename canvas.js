var botones = new virtualcanvas(canvas);
botones.background = "none";
var interface_height = 0;
var grid_data = gridCoord(0, 0);
var cols = grid_data.cols;
var rows = grid_data.rows;

var jugando = true;
var stopgame = false;

function resizer(){
  var canvas = document.getElementById('game')
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  voidUpdate()
  document.getElementById("barradepausa").style.marginTop = -canvas.height/2+"px";
}


function pausa_text(t, show = true){
  document.getElementById('pausatext').innerHTML = t;
  if (show) {
    document.getElementById('barradepausa').style.display = "";
  }else {
    document.getElementById('barradepausa').style.display = "none";
  }
}


function virtualcanvas(canvas) {
  this.background = "#382E2A";
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
      color: color,
    }
  }
  this.text = function rectangle(text, a, b, style, color, ax = "left", ay = "up"){
    this.objetos[this.objetos.length] = {
      type: "text",
      texto: text,
      x1: a,
      y1: b,
      color: color,
      alignx: ax,
      aligny: ay,
      style: style,
    }
  }





    this.multiplicador_x = canvas.width/this.virtualwidth;
  this.render = function(real_size = false){
    this.virtualheight = (this.virtualwidth/canvas.width)*canvas.height;
    var multiplicador_x = canvas.width/this.virtualwidth;
    var multiplicador_y = canvas.width/this.virtualwidth;
    if (real_size) {
      multiplicador_x = 1;
      multiplicador_y = 1;
    }
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
      if (this.objetos[i].type == "text") {
        ctx.fillStyle = this.objetos[i].color;
        var aa;
        var bb;
        if (this.objetos[i].alignx == "center") {
          aa = this.objetos[i].x1*multiplicador_x + this.virtualwidth*multiplicador_x/2;

        }
        if (this.objetos[i].alignx == "left") {
          aa = this.objetos[i].x1*multiplicador_x;

        }
        if (this.objetos[i].alignx == "right") {
          aa = -this.objetos[i].x1*multiplicador_x + this.virtualwidth*multiplicador_x;

        }

        if (this.objetos[i].aligny == "center") {
          bb = this.objetos[i].y1*multiplicador_x + this.virtualheight*multiplicador_x/2;

        }
        if (this.objetos[i].aligny == "up") {
          bb = this.objetos[i].y1*multiplicador_x;

        }
        if (this.objetos[i].aligny == "down") {
          bb = -this.objetos[i].y1*multiplicador_x + canvas.height;

        }
        ctx.font = this.objetos[i].style;
        ctx.fillText(this.objetos[i].texto,aa,bb);

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
  // if (canvas.height < canvas.width) {

  var separator_aprox = 29;
  var cols = Math.floor((canvas.width-6)/separator_aprox)
  var rows = Math.floor((canvas.height-6)/separator_aprox)-5
  var separator = (canvas.width-6)/cols
  var borde = 3;
  var extra = canvas.height % separator
  interface_height = (5*separator)+extra-3;
  document.getElementById("interface").style.overflow = "hidden"
  document.getElementById("interface").style.height = interface_height+"px"
  var rex = 0+i*separator+3;
  var rey = 0+i2*separator+interface_height;
  var re = {
    x: rex,
    y: rey,
    size: separator,
    cols: cols,
    rows: rows,
    extra: extra
  }
    return re;

  // }else {
/*
    var borde = 3;
    var rex = 36+i*32;
    var rey = 100+i2*32;
    var re = {
      x: rex,
      y: rey,
      size: 34
    }
    return re;
    */
  // }
}
var speed = 0.3;
//var asd;






var snakes_inicial1p = [[{x:0,y:10,pos:2,muerto:false,color:"#772326",border_inmunity:false},{x:0,y:11,color:"#A62428"}]]
var snakes_inicial1p_json = JSON.stringify(snakes_inicial1p);









var snakes_inicial2p = [[{x:0,y:10,pos:2,muerto:false,color:"#772326",border_inmunity:true},{x:0,y:11,color:"#A62428"},{x:0,y:12,color:"#A62428"},{x:0,y:13,color:"#A62428"},{x:1,y:13,color:"#A62428"},{x:2,y:13,color:"#A62428"},{x:3,y:13,color:"#A62428"},{x:4,y:13,color:"#A62428"},{x:5,y:13,color:"#A62428"},{x:6,y:13,color:"#A62428"},{x:7,y:13,color:"#A62428"},{x:8,y:13,color:"#A62428"},{x:9,y:13,color:"#A62428"},{x:10,y:13,color:"#A62428"}],[{x:5,y:0,pos:2,muerto:false,color:"#0c0e11",border_inmunity:true},{x:5,y:1,color:"#242d3a"},{x:5,y:2,color:"#242d3a"},{x:5,y:3,color:"#242d3a"},{x:6,y:3,color:"#242d3a"},{x:7,y:3,color:"#242d3a"},{x:8,y:3,color:"#242d3a"},{x:9,y:3,color:"#242d3a"},{x:10,y:3,color:"#242d3a"},{x:11,y:3,color:"#242d3a"},{x:12,y:3,color:"#242d3a"},{x:13,y:3,color:"#242d3a"},{x:14,y:3,color:"#242d3a"},{x:15,y:3,color:"#242d3a"}]]

//BORRAR ESTO


var snakes_inicial2p_json = JSON.stringify(snakes_inicial2p);









var snakes = []

var manzanas = [,,,,[,,,,,,,,,,,,,{m_color:"red",s_color:"red",addcount:10},,,,,,{m_color:"red",s_color:"red",addcount:1}],,,,,,,,,,,,,,,,,,,,,,,,,,,[{m_color:"red",s_color:"red",addcount:1},,,,,,,,,,,,,,,,,,,,,,,,{m_color:"red",s_color:"red",addcount:1}]]
manzanas = [];
console.log(manzanas);

console.log(snakes);
//snakes = []
//---0
//1--+--2
//---3
function drawSnake(newsnake,id){
  snakes[id] = newsnake;
};


function voidUpdate(){
  var manzanas_canvas = new virtualcanvas(canvas);
  manzanas_canvas.background = "none";
  var grid_data = gridCoord(0, 0);
  cols = grid_data.cols;
  rows = grid_data.rows;
  function realsize(a){
    return (a/pep.multiplicador_x)
  }
  var pep = new virtualcanvas(canvas);

  //pep.rectangle(-15,0,30,300,"#cc33cc", "c  enter", "down")
  //pep.rectangle(0,0,100,pep.virtualheight,"#FF0000")
  pep.background = "#382E2A"

  //console.log(pep.virtualheight);

  var grid = new virtualcanvas(canvas);
  grid.background = "none";



  // if (canvas.height < canvas.width) {

if (jugando) {
  var grid_data = gridCoord(0,0);
  for (var i = 0; i < grid_data.cols; i++) {
    for (var i2 = 0; i2 < grid_data.rows; i2++) {
      var coordenadas = gridCoord(i,i2);
      coordenadas.x = realsize(coordenadas.x)
      coordenadas.y = realsize(coordenadas.y)
      coordenadas.size = realsize(coordenadas.size)
      var borde = coordenadas.size/10;
      pep.rectangle(coordenadas.x+borde+borde,coordenadas.y+borde+borde,coordenadas.size-borde-borde/2,coordenadas.size-borde-borde/2, "#2A2720")
      pep.rectangle(coordenadas.x+borde,coordenadas.y+borde,coordenadas.size-borde-borde,coordenadas.size-borde-borde, "#4C453F")
      //console.log(coordenadas.x);
    }
  }




  //GRAFICAR MANZANAS
  for (var ixx = 0; ixx < manzanas.length; ixx++) {
    if (manzanas[ixx]) {
      for (var iyy = 0; iyy < manzanas[ixx].length; iyy++) {
        //
        if (manzanas[ixx] && manzanas[ixx][iyy]) {
          var coordenadas_manzana = gridCoord(ixx,iyy);
          coordenadas_manzana.x = realsize(coordenadas_manzana.x)
          coordenadas_manzana.y = realsize(coordenadas_manzana.y)
          coordenadas_manzana.size = realsize(coordenadas_manzana.size)
          var borde = coordenadas_manzana.size/10;

          manzanas_canvas.rectangle(coordenadas_manzana.x+borde,coordenadas_manzana.y+borde,coordenadas_manzana.size-borde-borde,coordenadas_manzana.size-borde-borde, manzanas[ixx][iyy].m_color)
        }
      }
    }
  }
  //console.log(manzanas);





  if (stopgame != true) {
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
        coordenadas.x = realsize(coordenadas.x)
        coordenadas.y = realsize(coordenadas.y)
        coordenadas.size = realsize(coordenadas.size)
        var borde = coordenadas.size/10;
        pep.rectangle(coordenadas.x+borde,coordenadas.y+borde,coordenadas.size-borde-borde,coordenadas.size-borde-borde, color)

        //pep.rectangle(coordenadas.x,coordenadas.y,coordenadas.size-1,coordenadas.size-1, color)
      }
    });
  }

}
//pep.text("HOLA",300,100,"100px arial","red")
pep.render()
grid.render()
manzanas_canvas.render()
botones.render(true)

}

setInterval(function(){ voidUpdate() }, 33);

function rectangle(a, b, c, d, color){
  ctx.fillStyle = color;
  ctx.fillRect(a,b,c,d);
}
