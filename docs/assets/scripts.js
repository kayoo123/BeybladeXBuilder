$(function(){
  $("#includedMenu").load("menu.html"); 
});

function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

/* Image loading */
window.onload = function() {
  const image = document.querySelector('.responsive-image');
  image.style.opacity = 1; // Change l'opacité à 1 pour faire apparaître l'image
};