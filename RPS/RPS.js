var schaar = document.getElementById("schaar");
var steen = document.getElementById("steen");
var papier = document.getElementById("papier");
var score_HTML = document.getElementById("score_HTML");
var output_text = document.getElementById("output_text");
var dezeronde = document.getElementById("dezeronde");
var winnaar = document.getElementById("winnaar");
var einde = document.getElementById("einde");
var innereinde = document.getElementsByClassName("einde")
var score_speler = 0;
var score_computer = 0;

function returnfoto(keuze) {
   switch (keuze) {
      case "schaar":
         return `<img src="./img/schaar.png" alt="schaar.png" id="schaar">`
      case "steen":
         return `<img src="./img/steen.png" alt="steen.png" id="steen">`
      case "papier":
         return `<img src="./img/papier.png" alt="papier.png" id="papier">`
   }
}

function verander(keuze_speler, keuze_computer, teken) {
   output_text.innerHTML = "<p>De speler heeft " + keuze_speler + " en de computer had " + keuze_computer + "</p>";
   dezeronde.innerHTML = `${returnfoto(keuze_speler)}<div id="teken"><p>${teken}</p></div>${returnfoto(keuze_computer)}`;
}

function score() {
   score_HTML.innerHTML = `<img src="./img/User.png" alt="">
      <div id="score"><p>${score_speler} : ${score_computer}</p></div>
      <img src="./img/computer.png" alt="">`
   if (winnaar.innerHTML === "") {
      winnaar.innerHTML = `Kies een optie`;
   }
}

function eindeRonde() {
   if (score_speler !== 3 && score_computer !== 3) {
      score();
   }
   else {
      if (score_computer > score_speler) {
         score();
         einde.innerHTML = `<div class="einde"><h3>GAME OVER - Computer wint</h3><img src=./img/you_lose.png alt=sad></img><br><button onClick=history.go(0);>opnieuw</button></div>`
         einde.style.backgroundColor = "red";
      }
      else {
         score();
         einde.innerHTML = `<div class="einde"><h3>WIN - Speler wint</h3><img src=./img/you_win.jpg alt=happy></img><br><button onClick=history.go(0);>opnieuw</button></div>`
         einde.style.backgroundColor = "green";
      }
   }
}

function vergelijk(getal_speler) {
   var keuze = ["schaar", "steen", "papier"];
   var getal_computer = Math.floor(Math.random() * keuze.length);
   var keuze_speler = keuze[getal_speler];
   var keuze_computer = keuze[getal_computer];

   if ((getal_speler + 1) % 3 === getal_computer) {
      verander(keuze_speler, keuze_computer, " < ")
      winnaar.innerHTML = "<p>Computer wint</p>";
      score_computer++;
   }
   else if ((getal_speler + 2) % 3 === getal_computer) {
      verander(keuze_speler, keuze_computer, " > ")
      winnaar.innerHTML = "<p>Speler wint</p>";
      score_speler++;
   }
   else {
      verander(keuze_speler, keuze_computer, " = ");
      winnaar.innerHTML = "<p>Speel opnieuw om de winnaar te kennen!</p>";
   }

   eindeRonde(getal_speler, getal_computer)
}

window.addEventListener("load", () => score())
schaar.addEventListener("click", () => vergelijk(0));
steen.addEventListener("click", () => vergelijk(1));
papier.addEventListener("click", () => vergelijk(2));
