var nowselected = -1;

function drawlist(){
  for (var i = 0; i < loaded_blueprits.length; i++) {
    var template = document.getElementById('card_base').innerHTML;
    var newHTML = template;
    var newHTML = newHTML.replace("_NAME_", i);
    var newHTML = newHTML.replace("_NAME_", i);
    var newHTML = newHTML.replace("_NAME_", i);
    var newHTML = newHTML.replace("_ACTIONRENDER_", "document.getElementById('"+i+"RENDER1').style.display = 'none'; document.getElementById('"+i+"RENDER2').style.display = ''; loaded_blueprits["+i+"].render();");
    var newHTML = newHTML.replace("_ACTIONREMOVE_", "document.getElementById('"+i+"RENDER2').style.display = 'none'; document.getElementById('"+i+"RENDER1').style.display = ''; loaded_blueprits["+i+"].remove();");


    var newHTML = newHTML.replace("_CARDSELECTOR_", "nowselected = "+i+"; render_propieties("+i+");" );

    //loaded_blueprits[i]
    document.getElementById('lista').innerHTML = newHTML;
  }
}
//
function render_propieties(id){
  if (id >= 0 && loaded_blueprits[id]) {
    document.getElementById('propieties').innerHTML = ""+id;
  }else{
    document.getElementById('propieties').innerHTML = "<p>Seleccione algo</p>";
  }
}
