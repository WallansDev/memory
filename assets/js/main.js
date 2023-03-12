function start() {
  globalThis.counterIdAnim = 0;
  globalThis.clientYsave;
  globalThis.clientXsave;
  globalThis.saveCoForDoubleClick = [];
  globalThis.saveCardsFind = [];
  globalThis.verifArrayCard = [];

  if (screen.width >= 1600) {
    globalThis.sizeCard = 150;
    globalThis.gapCard = 20;
  } else if (screen.width >= 1024 && screen.width <= 1600) {
    globalThis.sizeCard = screen.width / 13;
    globalThis.gapCard = 15;
  } else if (screen.width <= 768) {
    globalThis.sizeCard = screen.width / 5;
    globalThis.gapCard = 15;
  }

  globalThis.finalRandomArray = [];
  randomArray = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]);

  var count = 0;
  for (i = 0; i < 4; i++) {
    var arrayT = [];
    for (l = 0 + count; l < 4 + count; l++) {
      arrayT.push(randomArray[l]);
    }
    count += 4;
    finalRandomArray.push(arrayT);
  }
  generatorCanvas(globalThis.sizeCard);
}

function shuffleArray(inputArray) {
  return inputArray.sort(() => Math.random() - 0.5);
}

function generatorCanvas(size) {
  var ctx = document.getElementById("cards").getContext("2d");
  var img = new Image();
  img.onload = function () {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        ctx.drawImage(
          img,
          j * (size + globalThis.gapCard),
          i * (size + globalThis.gapCard),
          size,
          size
        );
      }
    }
  };

  img.src = "./assets/img/unknown.png";
  document
    .getElementById("cards")
    .setAttribute(
      "height",
      (size + globalThis.gapCard) * 4 - globalThis.gapCard
    );
  document
    .getElementById("cards")
    .setAttribute(
      "width",
      (size + globalThis.gapCard) * 4 - globalThis.gapCard
    );
}

function replaceCard(coX, coY, linkImg) {
  var ctx = document.getElementById("cards").getContext("2d");
  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, coX, coY, globalThis.sizeCard, globalThis.sizeCard);
  };
  img.src = linkImg;
}
document.getElementById("cards").onclick = function (e) {
  returnCard(e.offsetX, e.offsetY);
};
function returnCard(x, y) {
  if (globalThis.verifArrayCard.length < 6) {
    var countX = 0;
    var countY = 0;
    for (var l = 0; l < 4; l++) {
      if (y >= countY && y <= countY + globalThis.sizeCard) {
        for (var c = 0; c < 4; c++) {
          if (x >= countX && x <= countX + globalThis.sizeCard) {
            var resultC = c;
          }
          countX = countX + (globalThis.sizeCard + globalThis.gapCard);
        }
        var resultL = l;
      }
      countY = countY + (globalThis.sizeCard + globalThis.gapCard);
    }

    if (globalThis.finalRandomArray[resultL][resultC] != undefined) {
      if (
        globalThis.saveCoForDoubleClick[0] != resultL ||
        globalThis.saveCoForDoubleClick[1] != resultC
      ) {
        var positionArray = globalThis.finalRandomArray[resultL][resultC];
        nextVerif = true;
        if (globalThis.saveCardsFind.length > 0) {
          for (i = 0; i < globalThis.saveCardsFind.length; i++) {
            if (globalThis.saveCardsFind[i] == positionArray) {
              nextVerif = false;
              break;
            }
          }
        }

        if (nextVerif) {
          finalResultC = resultC * (globalThis.sizeCard + globalThis.gapCard);
          finalResultR = resultL * (globalThis.sizeCard + globalThis.gapCard);
          linkImg = "./assets/img/" + positionArray + ".png";
          replaceCard(finalResultC, finalResultR, linkImg);

          globalThis.verifArrayCard.push(positionArray);

          globalThis.verifArrayCard.push(finalResultC);
          globalThis.verifArrayCard.push(finalResultR);
          if (globalThis.verifArrayCard.length >= 6) {
            setTimeout("temporaryBackupFlipCard()", 250);
          }
        }
      }
    }
    globalThis.saveCoForDoubleClick = [resultL, resultC];
  }
}

function temporaryBackupFlipCard() {
  if (globalThis.verifArrayCard[0] == globalThis.verifArrayCard[3]) {
    linkImg = "./assets/img/vide.png";
    replaceCard(
      globalThis.verifArrayCard[1],
      globalThis.verifArrayCard[2],
      linkImg
    );
    replaceCard(
      globalThis.verifArrayCard[4],
      globalThis.verifArrayCard[5],
      linkImg
    );

    globalThis.saveCardsFind.push(globalThis.verifArrayCard[0]);

    let date = new Date(Date.now() + 86400000 * 365);
    date = date.toUTCString();
    point = 100;
    if (!document.cookie.indexOf("pointMemo")) {
      point += parseInt(getValueCookie("pointMemo"));
    }
    document.cookie = "pointMemo=" + point + "; expires=" + date;

    if (globalThis.saveCardsFind.length >= 8) {
      replay();
    }
  } else {
    linkImg = "./assets/img/unknown.png";
    replaceCard(
      globalThis.verifArrayCard[1],
      globalThis.verifArrayCard[2],
      linkImg
    );
    replaceCard(
      globalThis.verifArrayCard[4],
      globalThis.verifArrayCard[5],
      linkImg
    );
  }
  globalThis.verifArrayCard = [];

  globalThis.saveCoForDoubleClick = [];
}

function getValueCookie(nameCookie) {
  let tablecookie = document.cookie.split(";");
  let nomcookie = nameCookie + "=";
  let valeurcookie = "";
  for (i = 0; i < tablecookie.length; i++) {
    if (tablecookie[i].indexOf(nomcookie) != -1) {
      valeurcookie = tablecookie[i].substring(
        nomcookie.length + tablecookie[i].indexOf(nomcookie),
        tablecookie[i].length
      );
    }
  }
  return valeurcookie;
}

document.onmousedown = function (e) {
  globalThis.clientYsave = e.clientY;
  globalThis.clientXsave = e.clientX;
};

//relancer le jeu
function replay() {
  location.reload();
}

window.onload = start();
