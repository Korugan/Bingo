const bombo = document.getElementsByClassName("bombo")[0];
const player = document.getElementsByClassName("player")[0];
const cpu = document.getElementsByClassName("cpu")[0];
const numeros = document.getElementsByClassName("numeros")[0];
const btn = document.getElementsByClassName("btn")[0];
const pNumber = document.getElementsByClassName("pNumber")[0];
const cNumber = document.getElementsByClassName("cNumber")[0];
const overlay = document.getElementsByClassName("overlay")[0];
const winner = document.getElementsByClassName("winner")[0];
const retry = document.getElementsByClassName("retry")[0];
/* Generando el Bombo */
let bomboArr;
let num;
const generatorBombo = () => {
  bomboArr = [];
  num = 0;
  for (let i = 1; i < 91; i++) {
    num += 1;
    bomboArr.push([num]);
  }
};
generatorBombo();
let max = bomboArr.length - 1;
/* Generando el carton del Player */
const randomNum = () => Math.floor(Math.random() * (max - 1 + 1) + 1);
let playerCard;
let playerWin;
let div;
let p;
let numPlayerCard;
let playerArr;
const generatorPlayer = () => {
  playerCard = new Set();
  playerWin = 0;
  do {
    numPlayerCard = randomNum();
    playerCard.add(numPlayerCard);
  } while (playerCard.size <= 15);

  playerArr = Array.from(playerCard);

  for (let i = 0; i <= 15; i++) {
    if (i == 0) {
      div = document.createElement("div");
      div.className = "row";
    } else if (i % 5 == 0) {
      pNumber.appendChild(div);
      div = document.createElement("div");
      div.className = "row";
    }

    p = document.createElement("p");
    p.innerText = playerArr[i];
    p.className = "numPlayer";
    div.appendChild(p);
  }
};

generatorPlayer();

/* Generando el carton de Cpu */
let cpuCard;
let cpuWin;
let numCpuCard;
let cpuArr;
const generatorCpu = () => {
  cpuCard = new Set();
  cpuWin = 0;
  do {
    numPlayerCard = randomNum();
    cpuCard.add(numPlayerCard);
  } while (cpuCard.size <= 15);

  cpuArr = Array.from(playerCard);

  for (let i = 0; i <= 15; i++) {
    if (i == 0) {
      div = document.createElement("div");
      div.className = "row";
    } else if (i % 5 == 0) {
      cNumber.appendChild(div);
      div = document.createElement("div");
      div.className = "row";
    }

    let numCpu = randomNum();
    cpuArr.push(numCpu);
    p = document.createElement("p");
    p.innerText = numCpu;
    p.className = "numCpu";
    div.appendChild(p);
  }
};

generatorCpu();
/* Comprobando si los numeros del Bombo estan en los cartones */

const numPlayer = document.querySelectorAll("p.numPlayer");
const numCpu = document.querySelectorAll("p.numCpu");

btn.addEventListener("click", () => {
  max = bomboArr.length - 1;
  const randomNumBombo = () => Math.floor(Math.random() * (max - 1 + 1) + 1);
  let random = randomNumBombo();
  if (random == 1) {
    random = 0;
  }
  let number = bomboArr[random];

  if (playerArr.find((e) => e == number)) {
    for (let i = 0; i < numPlayer.length; i++) {
      if (numPlayer[i].innerText == number) {
        numPlayer[i].classList.add("tachado");
        playerWin += 1;
      }
    }
  }
  if (cpuArr.find((e) => e == number)) {
    for (let i = 0; i < numCpu.length; i++) {
      if (numCpu[i].innerText == number) {
        numCpu[i].classList.add("tachado");
        cpuWin += 1;
      }
    }
  }
  p = document.createElement("p");
  p.innerText = number;
  btn.innerText = number;
  p.className = "numIdv";
  bomboArr[random] = 0;
  bomboArr.sort().shift();
  numeros.appendChild(p);
  if (playerWin == 15) {
    overlay.classList.add("active");
    winner.innerText = "¡Has ganado!";
  } else if (cpuWin == 15) {
    overlay.classList.add("active");
    winner.innerText = "Más suerte la proxima vez";
  }
});
/* Retry */

retry.addEventListener("click", () => {
  location.reload();
});
