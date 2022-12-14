var woord = document.getElementById("woord");
var horizontaal_onderaan = document.getElementById("horizontaal_onderaan");
var horizontaal_bovenaan = document.getElementById("horizontaal_bovenaan");
var verticaal = document.getElementById("verticaal");
var touw = document.getElementById("touw");
var hoofd = document.getElementById("hoofd");
var torso = document.getElementById("torso");
var armL = document.getElementById("armL");
var armR = document.getElementById("armR");
var beenL = document.getElementById("beenL");
var beenR = document.getElementById("beenR");
var veranderingen = [horizontaal_onderaan, verticaal, horizontaal_bovenaan, touw, hoofd, torso, armL, armR, beenL, beenR];
var button = document.getElementById("button2");
var gebruikte_letters = document.getElementById("gebruikte_letters");
var al_geweest = document.getElementById("al_geweest");
var tekst = document.getElementById("tekst");
var highscore_aan = false;
maakHighscore();

function maakHighscore() {
   var namen = ["Wouter", "Semmi", "Gorik", "Frankie", "Derk"]
   var highscore = ["<span>Formule score:</span><span>#juist*5 - #fout*3</span>", `<p>score \t tijd \t\t naam</p>`];
   for (let i = 0; i < 6; i++) {
      highscore.push(`<p>${9 + i < 10 ? `0${9 + i}` : 9 + i}\t\t ${2 + i}:00 \t ${namen[Math.floor(Math.random() * namen.length)]}</p>`)
   }
   highscore = highscore.splice(0, 7)
   // console.log(highscore_arr);
   localStorage.setItem("highscore_arr", JSON.stringify(highscore))
}

class Galgje {
   randomWoord() {
      var woorden = ["cabinet", "singer", "virus", "week", "insurance", "magazine", "county", "industry", "contribution", "throat", "republic", "funeral", "assignment", "idea", "cousin", "employment", "year", "safety", "education", "concept", "database", "people", "camera", "professor", "discussion", "disk", "queen", "promotion", "breath", "leader", "platform", "housing", "month", "tale", "mall", "shopping", "development", "phone", "importance", "salad", "love", "definition", "trainer", "problem", "revenue", "measurement", "story", "session", "youth", "significance", "engine", "garbage", "energy", "guest", "priority", "apple", "hall", "inflation", "enthusiasm", "basket", "candidate", "client", "mood", "winner", "editor", "airport", "country", "difficulty", "person", "effort", "employee", "basis", "protection", "management", "delivery", "phone", "safety", "recommendation", "restaurant", "college", "king", "member", "movie", "reflection", "replacement", "transportation", "version", "personality", "initiative", "love", "manager", "poet", "sympathy", "agency", "pizza", "thanks", "wedding", "worker", "tradition", "republic"];
      return woorden[Math.floor(Math.random() * woorden.length)].toLowerCase().split("");
      // return "je ma en pa".split("");
      // woordAanpassen();
      // console.log(oplossing, te_raden);
   }

   omzettenWoord() {
      var arr = [];
      for (var i = 0; i < this.oplossing.length; i++) {
         if (this.oplossing[i] === " ") {
            arr.push(`<span class="spatie"></span>`);
         }
         else {
            arr.push("_");
         }
      }
      return arr
   }

   constructor() {
      this.oplossing = this.randomWoord();
      this.te_raden = this.omzettenWoord();
      this.woordAanpassen(this.te_raden);
      this.gebruikt = [];
      this.opbouw_galgje = 0;
      this.al_gebruikt = "";
      this.vorige_ronde = 0;
   }

   woordAanpassen(arr) {
      woord.innerHTML = `<p>${arr.join(" ")}</p>`;
   }

   verhoog(getal, bool) {
      if (bool === true) {
         return getal
      }
      if (bool === false) {
         this.opbouwGalgje(getal++);
         return getal
      }
   }

   gebruikteLetters(gok, bool) {
      console.log(bool);
      if (bool === false) {
         this.gebruikt.push(`<span class="fout">${gok}</span>`);
      } else {
         this.gebruikt.push(`${gok}`);
      }
      this.al_gebruikt += ` ${gok} `
      gebruikte_letters.innerHTML = `<p>${this.gebruikt.sort().join(", ")}</p>`
      this.opbouw_galgje = this.verhoog(this.opbouw_galgje, bool);
   }

   opbouwGalgje(getal) {
      if (getal == 1) {
         veranderingen[getal].style.display = "flex";
      }
      if (getal == 6) {
         veranderingen[getal].style.display = "block";
         veranderingen[7].style.display = "block";
         veranderingen[7].style.visibility = "hidden";
      }
      if (getal == 7) {
         veranderingen[7].style.visibility = "visible";
      }
      else {
         veranderingen[getal].style.display = "block";
      }
   }

   win() {
      input.innerHTML = `<div class="einde"><img src="./img/you_win.jpg" alt="win"><br><button onClick=history.go(0);>opnieuw</button></div>`
   }

   lose() {
      this.voegScoreToe(`${10}\t\t ${2}:30 \t Test\n`)
      input.innerHTML = `<div class="einde"><h3>GAME OVER - Computer wint</h3><p>Het juiste woord was ${this.oplossing.join("")}</p><img src="./img/you_lose.png" alt=""><br><button onClick=history.go(0);>opnieuw</button></div>`
   }

   ronde(gok) {
      al_geweest.innerHTML = "";
      // var gok = document.getElementById("letter").value;
      var al_aangepast = false;
      this.vorige_ronde = this.gebruikt.length;
      for (var i = 0; i < this.oplossing.length; i++) {
         if (this.oplossing[i] === gok) {
            if (this.al_gebruikt.includes(gok)) {
               // alert("Deze letter heb je al geraden");
               al_geweest.innerHTML = `<p>Je hebt deze letter al geraden</p>`
            }
            else {
               this.te_raden[i] = gok;
               al_aangepast = true;
               this.woordAanpassen(this.te_raden);
            }
         }
      }
      if (this.te_raden.includes("_")) {
         if (al_aangepast == false) {
            if (this.al_gebruikt.includes(gok)) {
               // alert("Deze letter heb je al geraden");
               al_geweest.innerHTML = `<p>Je hebt deze letter al geraden</p>`
            }
            else {
               this.gebruikteLetters(gok, al_aangepast);
            }
         } else {
            this.gebruikteLetters(gok, al_aangepast);
         }
      }
      else {
         this.win();
      }
   }

   voegScoreToe(string) {
      var highscore = JSON.parse(localStorage.getItem("highscore_arr"));
      highscore.push(string);
      var highscore_tekst = highscore.splice(0, 2);
      highscore = highscore.sort();
      highscore = highscore_tekst.concat(highscore).splice(0, 7);
      console.log(highscore.join(""));
      highscore_weergave.innerHTML = highscore.join("");
      localStorage.setItem("highscore_arr", JSON.stringify(highscore))
      toonHighscore();
   }
}

function toonHighscore() {
   var highscore = JSON.parse(localStorage.getItem("highscore_arr"));
   var highscore_weergave = document.getElementById("highscore_weergave");
   if (highscore_aan === false) {
      highscore_aan = true;
      highscore_weergave.style.display = "block"
   } else {
      highscore_aan = false;
      highscore_weergave.style.display = "none"
   }
   console.log(highscore.join(""));
   highscore_weergave.innerHTML = highscore.join("");
   localStorage.setItem("highscore_arr", JSON.stringify(highscore))
}

var test = new Galgje();
function game(e) {
   var gok = String.fromCharCode(e.keyCode + 32);
   if (64 < e.keyCode || e.keyCode > 91) {
      var limiet = 9;
      if (test.opbouw_galgje <= limiet) {
         test.ronde(gok, limiet);
         if (test.opbouw_galgje > limiet) {
            test.lose();
         }
      }
   }
   else {
      alert("Deze letter ken ik niet");
   }
}

document.addEventListener("keydown", game, false);