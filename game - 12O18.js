function gameSync(){

}
var enter_action = function(){}

var reset = false;
var stop_paused = false;
var playing2p = false;

var PressedUp = [];
var PressedLeft = [];
var PressedDown = [];
var PressedRight = [];

function reset_system(){
  PressedUp[0] = false;
  PressedLeft[0] = false;
  PressedDown[0] = false;
  PressedRight[0] = false;

  PressedUp[1] = false;
  PressedLeft[1] = false;
  PressedDown[1] = false;
  PressedRight[1] = false;

  manzanas = []
  agregar_cuerpo = []
  ticks = 0;

}
function stopthegame(level = 0){
  //
  if (level >= 0) {
    stop_paused = true;
  }
  if (level >= 1) {
    stopgame = true;
  }
  if (level >= 2) {
    jugando = false;
  }
}

function playgame(){
  reset = false;
  jugando = true;
  stopgame = false;
  stop_paused = false;
  quitpause();
}

reset_system()

function play1p(){
  reset_system()
  snakes = JSON.parse(snakes_inicial1p_json);
  playgame()
  playing2p = false;
}
function play2p(){
  reset_system()
  snakes = JSON.parse(snakes_inicial2p_json);
  playgame()
  playing2p = true;
}

var paused = false;



// var boton = new button(10,10,200,100,"#1bad25","HOLA",function(){
//   play2p()
//
// })
//
// var boton = new button(220,10,110,100,"#1bad25","HOLA",function(){
//   play1p()
//
// })

var ticks = 0;


function autopauser(){
  if (paused) {
    quitpause()
  }else {
    pause()
  }
}
var puntaje_player1 = 0;
var puntaje_player2 = 0;

function sumar_puntaje(player, puntaje){
  if (puntaje != false) {
    if (player == "1p") {
      document.getElementById('puntajes').innerHTML = " Puntaje: "+puntaje;
    }else {
      if (player == 1) {
        puntaje_player1+=puntaje;
      }
      if (player == 0) {
        puntaje_player2+=puntaje;
      }
      document.getElementById('puntajes').innerHTML = "<p>&nbsp;JUGADOR 1: <b>"+puntaje_player1+"</b> JUGADOR 2: <b>"+puntaje_player2+"</b></p>"
    }
  }else {
    document.getElementById('puntajes').innerHTML = "";
  }
}



//w = 87
//a = 65
//s = 83
//d = 68


//up = &
//< = %
//> = '
//down = (
document.onkeydown = function(evt) {
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  var charStr = String.fromCharCode(charCode);


  if (charCode == 13) {
    enter_action();
  }

  if (!paused) {
    if (charStr == "A") {
       PressedUp[1] = false;
       PressedLeft[1] = true;
       PressedDown[1] = false;
       PressedRight[1] = false;
    }
    if (charStr == "D") {
       PressedUp[1] = false;
       PressedLeft[1] = false;
       PressedDown[1] = false;
       PressedRight[1] = true;
    }
    if (charStr == "S") {
       PressedUp[1] = false;
       PressedLeft[1] = false;
       PressedDown[1] = true;
       PressedRight[1] = false;
    }
    if (charStr == "W") {
       PressedUp[1] = true;
       PressedLeft[1] = false;
       PressedDown[1] = false;
       PressedRight[1] = false;
    }


    if (charStr == "%") {
       PressedUp[0] = false;
       PressedLeft[0] = true;
       PressedDown[0] = false;
       PressedRight[0] = false;
    }
    if (charStr == "'") {
       PressedUp[0] = false;
       PressedLeft[0] = false;
       PressedDown[0] = false;
       PressedRight[0] = true;
    }
    if (charStr == "(") {
       PressedUp[0] = false;
       PressedLeft[0] = false;
       PressedDown[0] = true;
       PressedRight[0] = false;
    }
    if (charStr == "&") {
       PressedUp[0] = true;
       PressedLeft[0] = false;
       PressedDown[0] = false;
       PressedRight[0] = false;
    }
  }
  if (charStr == "P") {
    autopauser();
  }
  if (charStr == "R") {
    localStorage.setItem('mp1', 0)
    localStorage.setItem('mp2', 0)
  }
}
function pause(){
  document.getElementById('botonpausa').innerText = 'Continuar'
  paused = true;
  pausa_text("JUEGO PAUSADO", true)
}
function quitpause(){
  document.getElementById('botonpausa').innerText = 'Pausar'
  paused = false;
  pausa_text("", false)
}

function kill(id){
  //alert("la serpiente "+id+" murió.")
  console.log("Killed:",id);
  //snakes = snakes_inicial;
  //pause()
  snakes[id][0].muerto = true;
  /*
  var nombre = "";
  if (id == 0) {
    nombre = "Jugador 1"
    if (localStorage.getItem("mp1")) {
      localStorage.setItem('mp1', parseInt(localStorage.getItem("mp1"))+1)
    }else {
      localStorage.setItem('mp1', 1)
    }

  }
  if (id == 1) {
    nombre = "Jugador 2"
    if (localStorage.getItem("mp2")) {
      localStorage.setItem('mp2', parseInt(localStorage.getItem("mp2"))+1)
    }else {
      localStorage.setItem('mp2', 1)
    }
  }
  var muertes_totales1 = 0;
  var muertes_totales2 = 0;

  muertes_totales2 = localStorage.getItem("mp2")


  muertes_totales1 = localStorage.getItem("mp1")*/

  //alert("Murió "+nombre+". Muertes totales del jugador 1: "+muertes_totales1+", muertes totales del jugador 2: "+muertes_totales2+".")
  reset = true
}
var agregar_cuerpo = []
function agregar_al_cuerpo(id, color = ""){
  if (agregar_cuerpo[id] == undefined) {
    agregar_cuerpo[id] = []
  }
  agregar_cuerpo[id][agregar_cuerpo[id].length] = {color:color}
}
//console.log(snakes[0]);
function gameSlow(){
  if (!paused) {
    if (jugando && stopgame == false && stop_paused != true) {
      ticks++;
      var final_coords = [];
      var array_coordenadas = [];

      var playing_remote = false;
      for (var i = 0; i < snakes.length; i++) {
        if (snakes[i][0].remote) {
          playing_remote = true;
        }
      }

      for (var i = 0; i < snakes.length; i++) {

        if (snakes[i]) {
        ///////////////////////////////////////////////////

          /////////// Esto lo que hace es cambiar la pocision a la cual mira la cabeza de la serpiente
          if (PressedUp[i]) {
            if (snakes[i][0].pos != 3) {
              snakes[i][0].pos = 0
            }
          }
          if (PressedLeft[i]) {
            if (snakes[i][0].pos != 2) {
              snakes[i][0].pos = 1
            }
          }
          if (PressedDown[i]) {
            if (snakes[i][0].pos != 0) {
              snakes[i][0].pos = 3
            }
          }
          if (PressedRight[i]) {
            if (snakes[i][0].pos != 1) {
              snakes[i][0].pos = 2
            }
          }
          ////
          /////// Acá lo que hacemos es hacerla avanzar un bloque
          // Primero hay que tener en cuenta la velocidad independiente de cada serpiente y si es remota o no
          var die_condition = (snakes[i][0].inmune != true && playing_remote != true)
          if (!snakes[i][0].remote) {
            for (var i2 = snakes[i].length-1; i2 > 0; i2--) {
              snakes[i][i2].x = snakes[i][i2-1].x
              snakes[i][i2].y = snakes[i][i2-1].y
            }
            var last_pos_x = snakes[i][snakes[i].length-1].x
            var last_pos_y = snakes[i][snakes[i].length-1].y


            ///AGREgAR AL CUERPO, ROTO NO ANDA

            /////


            if (snakes[i][0].pos == 0) {
              snakes[i][0].y = snakes[i][0].y-1
              if (snakes[i][0].y <= -1) {
                if (die_condition && snakes[i][0].border_inmunity != true) {
                  //console.log("KILL",i);
                  kill(i)
                }else {
                  snakes[i][0].y = rows-1;
                }
              }
            }
            if (snakes[i][0].pos == 1) {
              snakes[i][0].x = snakes[i][0].x-1
              if (snakes[i][0].x <= -1) {
                if (die_condition && snakes[i][0].border_inmunity != true) {
                  //console.log("KILL",i);
                  kill(i)
                }else {
                  snakes[i][0].x = cols-1;
                }
              }
            }
            if (snakes[i][0].pos == 2) {
              snakes[i][0].x = snakes[i][0].x+1
              if (snakes[i][0].x >= cols) {
                if (die_condition && snakes[i][0].border_inmunity != true) {
                  //console.log("KILL",i);
                  kill(i)
                }else {
                  snakes[i][0].x = 0;
                }
              }
            }
            if (snakes[i][0].pos == 3) {
              snakes[i][0].y = snakes[i][0].y+1
              if (snakes[i][0].y >= rows) {
                if (die_condition && snakes[i][0].border_inmunity != true) {
                  //console.log("KILL",i);
                  kill(i)
                }else {
                  snakes[i][0].y = 0;
                }
              }
            }
          }

          //console.log(snakes[i][0].x,snakes[i][0].y);


          for (var i2 = 0; i2 < snakes[i].length; i2++) {
            final_coords[i2] = {};
            final_coords[i2].x = snakes[i][i2].x
            final_coords[i2].y = snakes[i][i2].y
            final_coords[i2].id = i;

            if (final_coords[i2].x > cols || final_coords[i2].x < 0) {
              if (die_condition) {
                //console.log("KILL",i);
                kill(i)
              }
            }
            if (final_coords[i2].y > rows || final_coords[i2].y < 0) {
              if (die_condition) {
                //console.log("KILL",i);
                kill(i)
              }
            }

            if (i2 == 0) {
              final_coords[i2].ishead = true;
            }else{
              final_coords[i2].ishead = false;
            }


            if (!array_coordenadas[final_coords[i2].x]) {
              array_coordenadas[final_coords[i2].x] = []
            }
            if (!array_coordenadas[final_coords[i2].x][final_coords[i2].y]) {
              array_coordenadas[final_coords[i2].x][final_coords[i2].y] = []
            }

            //SI HAY ALGO EN ESA COORDENADA
            if (array_coordenadas[final_coords[i2].x][final_coords[i2].y][0]) {
              //console.log(array_coordenadas[final_coords[i2].x][final_coords[i2].y][0]);
              //SI CHOCAN CABEZA CON CABEZA
              if (array_coordenadas[final_coords[i2].x][final_coords[i2].y][0].ishead == true && final_coords[i2].ishead == true || array_coordenadas[final_coords[i2].x][final_coords[i2].y][0].ishead == false && final_coords[i2].ishead == false) {
                //matar ambos
                if (die_condition) {
                  kill(i)
                }
                if (array_coordenadas[final_coords[i2].x][final_coords[i2].y][0].id != true) {
                  if (die_condition) {
                    kill(array_coordenadas[final_coords[i2].x][final_coords[i2].y][0].id)
                  }
                }

              }

              //SI CHOCA CON SI MISMO
              if (array_coordenadas[final_coords[i2].x][final_coords[i2].y][0].id == i) {
                //matar a si mismo
                if (die_condition) {

                  kill(i)
                }
              }

              //SI LA CABEZA DEL OTRO SE LA DA CONTRA SI MISMO
              if (array_coordenadas[final_coords[i2].x][final_coords[i2].y][0].id != i && array_coordenadas[final_coords[i2].x][final_coords[i2].y][0].ishead == true && final_coords[i2].ishead == false) {
                //matar al anterior
                if (array_coordenadas[final_coords[i2].x][final_coords[i2].y][0].id != true && !playing_remote) {
                  if (die_condition) {
                    kill(array_coordenadas[final_coords[i2].x][final_coords[i2].y][0].id)
                  }
                }
              }
              //SI SE LA DA CONTRA EL CUERPO DEL OTRO
              if (array_coordenadas[final_coords[i2].x][final_coords[i2].y][0].id != i && array_coordenadas[final_coords[i2].x][final_coords[i2].y][0].ishead == false && final_coords[i2].ishead == true) {
                //matar a si mismo
                if (die_condition) {
                  kill(i)
                }
              }


              //SI CHOCA CONTRA EL OTRO
            }else {
              array_coordenadas[final_coords[i2].x][final_coords[i2].y][array_coordenadas[final_coords[i2].x][final_coords[i2].y].length] = {id:i,ishead:final_coords[i2].ishead}
            }

          }


          //console.log(array_coordenadas);
        //console.log(snakes[i]);
        /////////////////////////////////////////////////

        if (agregar_cuerpo[i]) {
          if (agregar_cuerpo[i].length >= 1) {
            var indicador = snakes[i].length
            snakes[i][indicador] = []
            snakes[i][indicador].x = last_pos_x;
            snakes[i][indicador].y = last_pos_y;
            if (agregar_cuerpo[i][0].color == "") {
              snakes[i][indicador].color = snakes[i][indicador-1].color;
            }else {
              snakes[i][indicador].color = agregar_cuerpo[i][0].color;
            }


            var nuevo_agregar_cuerpo = []
            for (var ix = 1; ix < agregar_cuerpo[i].length; ix++) {
              nuevo_agregar_cuerpo[ix-1] = agregar_cuerpo[i][ix]
            }
            agregar_cuerpo[i] = nuevo_agregar_cuerpo;
            console.log(agregar_cuerpo  );
          }
        }
        //(manzanas[ixx] && manzanas[ixx][iyy])
        if (manzanas[snakes[i][0].x] && manzanas[snakes[i][0].x][snakes[i][0].y])  {
          for (var itt = 0; itt < manzanas[snakes[i][0].x][snakes[i][0].y].addcount; itt++) {
            agregar_al_cuerpo(i,manzanas[snakes[i][0].x][snakes[i][0].y].s_color)
            if (i == 1) {
              puntaje_player2++;
            }
            if (i == 0) {
              puntaje_player1++;
            }
          }
          document.getElementById('puntajes').innerHTML = "<p>&nbsp;JUGADOR 1: <b>"+puntaje_player1+"</b> JUGADOR 2: <b>"+puntaje_player2+"</b></p>"
          manzanas[snakes[i][0].x][snakes[i][0].y] = undefined
        }

        //////////////PONER MANZANAS EN EL JUEGO
        //array_coordenadas
        var manzana_cada_cuantos_ticks = 20;
        var agregar = (ticks % manzana_cada_cuantos_ticks)

        var manzanas_count = 0;
        for (var innx = 0; innx < manzanas.length; innx++) {
          if (manzanas[innx]) {
            for (var inny = 0; inny < manzanas[innx].length; inny++) {
              //manzanas[innx][inny]
              if (manzanas[innx] && manzanas[innx][inny]) {
                if (innx >= cols || inny >= rows) {
                  manzanas[innx][inny] = undefined
                }else {
                  manzanas_count++;
                }
              }
            }
          }
        }

        if (manzanas_count == 0) {
          var manzana_added = 0;
          while (manzana_added == 0) {
            var rand_x = Math.floor((Math.random() * cols) + 0);
            var rand_y = Math.floor((Math.random() * rows) + 0);
            if (array_coordenadas[rand_x] && array_coordenadas[rand_x][rand_y]) {

            }else{
              if (manzanas[rand_x] && manzanas[rand_x][rand_y]) {

              }else {

                if (manzanas[rand_x]) {

                }else {
                  manzanas[rand_x] = []
                }
                if (manzana_added == 0) {
                  manzana_added++;
                  manzanas[rand_x][rand_y] = {m_color:"red",s_color:"",addcount:1}
                }



              }
            }
          }
        }




        }
      }
        //drawSnake([{x:0,y:0,pos:2},{x:0,y:1,color:"#FFFa10"},{x:0,y:2,color:"#FFFa10"},{x:0,y:3,color:"#FFFa10"},{x:1,y:3,color:"#FFFa10"},{x:2,y:3,color:"#FFFa10"},{x:3,y:3,color:"#FFFa10"}],1)
        if (snakes.length == 1) {
          sumar_puntaje("1p", snakes[0].length)
          if (snakes[0][0].muerto == true) {
            var retry_button_string_html = "<div class='button' style='width:220px; background:#a52727; float: right; height:60px; font-size: 30px;' onclick='play1p()'>Volver a jugar<div style='font-size: 20px;'>(Enter)</div></div>"
            enter_action = function(){  play1p();  enter_action = function(){  }  }
            pausa_text("Perdiste! Tu puntaje final es de "+snakes[0].length+" puntos"+retry_button_string_html)
          }
        }
        if (reset) {
          stopthegame()
          if (snakes.length == 1) {
            snakes[0][0].muerto = false;
          }else {
            var muertes_totales = 0;
            for (var isss = 0; isss < snakes.length; isss++) {
              if (snakes[isss][0].muerto == true) {
                muertes_totales++;
              }
            }
            for (var isss = 0; isss < snakes.length; isss++) {
              var retry_button_string_html = "<div class='button' style='width:220px; background:#a52727; float: right; height:60px; font-size: 30px;' onclick='play2p()'>Seguir jugando<div style='font-size: 20px;'>(Enter)</div></div>"
              if (snakes[isss][0].muerto == true) {
                if (muertes_totales != snakes.length) {
                  if (isss == 0) {
                    sumar_puntaje(0,5)
                    pausa_text("Perdió el jugadror 1! +5 jugador 2"+retry_button_string_html)
                    enter_action = function(){  play2p();  enter_action = function(){  }  }
                  }
                  if (isss == 1) {
                    sumar_puntaje(1,5)
                    pausa_text("Perdió el jugadror 2! +5 jugador 1"+retry_button_string_html)
                    enter_action = function(){  play2p();  enter_action = function(){  }  }
                  }
                }else {
                  pausa_text("Ambos perdieron!"+retry_button_string_html)
                  enter_action = function(){  play2p();  enter_action = function(){  }  }
                }
              }


              if (snakes[isss]) {
                snakes[isss][0].muerto = false;
              }
            }
          }


        }

    }///
  }




}

var timer;


var game_speed = 18;
function gamespeed(gm = game_speed){
  var r = 0;
  if (game_speed != gm || timer == undefined) {
    if (gm == 0) {
      r = 0;
    }else {
      r = 1000/gm;
    }




    if (r == 0) {
      clearInterval(timer);
      timer = null
    }else {
      timer = setInterval(function(){ gameSlow() }, r);
    }
  }
  game_speed = gm;
  return gm;
}

gamespeed()
