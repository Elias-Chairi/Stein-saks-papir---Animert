
let overskrift = document.getElementsByClassName('flex')[0];
let stein_saks_papir = document.getElementsByTagName("img");

for (i = 0; i < 3; i++){
  stein_saks_papir[i].addEventListener("mouseenter", liten_stor01);
  stein_saks_papir[i].addEventListener("mouseleave", stor_liten01);
  stein_saks_papir[i].addEventListener("click", stor_liten01);
  stein_saks_papir[i].addEventListener("click", klikk);
}


// måtte lage denne for å gjøre at funksjonene ikke kjører smatidig.
// den fungerer slik at når én starter slutter den andre og omvendt.
// dette er bare en liste da, koden er i begge funksjonene.
// jeg tildeler hver av bildene en true/false verdi for å stoppe den
// forige oppgaven.

let avPå = {
  0 : false,
  1 : false,
  2 : false
};

let spiller_poeng = 0;
let pc_poeng = 0;

let klikka = false;



function liten_stor01 (e) { liten_stor(e, 25, 30) }
function stor_liten01 (e) { stor_liten(e, 25, 30) }
function liten_stor02 (e) { liten_stor(e, 20, 25) }
function stor_liten02 (e) { stor_liten(e, 20, 25) }



// funksjon for å gjør den større når du har musa over
function liten_stor (e, min, max){
  //dette er for identifisere hvilken du tar musa over
  let denne;
  for (i = 0; i < stein_saks_papir.length; i++){
    if (e.target == stein_saks_papir[i]){
      avPå[i] = false;
      denne = i;
    }
  }
  // endrer størrelsen
  let størrelse = parseFloat(e.target.style.width);
  if (isNaN(størrelse)){
    størrelse = min;
  }
  let id = setInterval(frame, 5);
  function frame() {
    if (størrelse < max && avPå[denne] == false) {
      størrelse = størrelse + 0.3;
      e.target.style.width = størrelse + '%';
    } else {
      clearInterval(id);
    }
  }
}



// funksjon for å gjør den mindre når du tar musa vekk
function stor_liten (e, min, max){
  //dette er for identifisere hvilken du tar musa vekk fra
  let denne;
  for (i = 0; i < stein_saks_papir.length; i++){
    if (e.target == stein_saks_papir[i]){
      avPå[i] = true;
      denne = i;
    }
  }
  // endrer størrelsen
  let størrelse = parseFloat(e.target.style.width);
  let id = setInterval(frame, 5);
  function frame() {
    if (størrelse > min && avPå[denne] == true) {
      størrelse = størrelse - 0.3;
      e.target.style.width = størrelse + '%';
    } else {
      clearInterval(id);
    }
  }
}



function klikk (e){
  klikka = true;
  stein_saks_papir[0].src = "bilder/Venstre/stein.png";
  stein_saks_papir[1].style.visibility = "hidden";
  stein_saks_papir[2].src = "bilder/Høyre/stein.png";

  overskrift.innerHTML = "<h1>Du har: " + spiller_poeng + " poeng</h1>"
  + "<h1>Bob har: " + pc_poeng + " poeng</h1>";

  // fjerner trykke eventene jeg ikke har bruk for lenger
  for (i = 0; i < 3; i++){
    stein_saks_papir[i].removeEventListener("mouseenter", liten_stor01);
    stein_saks_papir[i].removeEventListener("mouseleave", stor_liten01);
    stein_saks_papir[i].removeEventListener("click", stor_liten01);
    stein_saks_papir[i].removeEventListener("click", klikk);
  }
  for (i = 3; i < 6; i++){
    stein_saks_papir[i].removeEventListener("mouseenter", liten_stor02);
    stein_saks_papir[i].removeEventListener("mouseleave", stor_liten02);
    stein_saks_papir[i].removeEventListener("click", stor_liten02);
    stein_saks_papir[i].removeEventListener("click", klikk);
  }

    //dette er for identifisere hvilken du klikker på
    let valget;
    for (i = 0; i < stein_saks_papir.length; i++){
      if (e.target == stein_saks_papir[i]){
        valget = i;
      }
    }
    if (valget == 3) { valget = 0 }
    if (valget == 4) { valget = 1 }
    if (valget == 5) { valget = 2 }

    // valg_av_stein,saks,papir = stein/saks/papir
      // 0 = stein
      // 0 = saks
      // 0 = papir

    // gir ett tilfeldig heltall mellom 0 og 3
    let pc_valg = Math.floor(Math.random() * 3);

    //if (valget == pc_valg) {}
    if (valget == 0 && pc_valg == 2 || valget == 1 && pc_valg == 0 ||
        valget == 2 && pc_valg == 1){
          pc_poeng++;
        }
    if (pc_valg == 0 && valget == 2 || pc_valg == 1 && valget == 0 ||
        pc_valg == 2 && valget == 1){
          spiller_poeng++;
        }


    // bytt_bilde funksjon kjører i opp_og_ned funksjonen
    // derfor sender jeg hvilken du valgte inn i den funksjonen.
    opp_og_ned(valget, pc_valg);
  }



// animasjonen
function opp_og_ned (e, e2){
  let y = 0;
  let yFart = -1.5;
  let rundeTeller = 0;
  let tid = 0;
  let id = setInterval(frame, 5);
  function frame() {
    if (rundeTeller == 5) {
      bytt_bilde(e, e2);
      clearInterval(id);
    } else {
      tid++;
      // pause før animasjonen starter
      if (tid > 100){
        stein_saks_papir[0].style.top = y + "px";
        stein_saks_papir[2].style.top = y + "px";
        y = y + yFart;

        if (y > 10) {
          yFart = yFart * -1;
        }
        else if (y < -70){
          yFart = yFart * -1;
        }
        if (y == 0){
          rundeTeller += 1;
        }
      }
    }
  }
}


// finner bruker det du valgte til å bytte bilde
function bytt_bilde (valget, pc_valg){
  if (valget == 0){
    stein_saks_papir[0].src = "bilder/Venstre/stein.png";
  } else if (valget == 1){
    stein_saks_papir[0].src = "bilder/Venstre/saks.png";
  } else {
    stein_saks_papir[0].src = "bilder/Venstre/papir.png";
  }


  if (pc_valg == 0){
    stein_saks_papir[2].src = "bilder/Høyre/stein.png";
  } else if (pc_valg == 1){
    stein_saks_papir[2].src = "bilder/Høyre/saks.png";
  } else {
    stein_saks_papir[2].src = "bilder/Høyre/papir.png";
  }


  klikka = false;
  let tid = 0;
  let id = setInterval(frame, 5);
  function frame() {
    if (klikka == true) {
      clearInterval(id);
    } else {
      tid++;
      // pause før animasjonen starter
      if (tid > 100){
      overskrift.innerHTML = "<h1>Du har: " + spiller_poeng + " poeng</h1>"
      + "<h1>Bob har: " + pc_poeng + " poeng</h1>";


      for (i = 3; i < 6; i++){
        stein_saks_papir[i].style.visibility = "visible";
      }

      for (i = 3; i < 6; i++){
        stein_saks_papir[i].addEventListener("mouseenter", liten_stor02);
        stein_saks_papir[i].addEventListener("mouseleave", stor_liten02);
        stein_saks_papir[i].addEventListener("click", stor_liten02);
        stein_saks_papir[i].addEventListener("click", klikk);
      }
    }
  }
}
}
