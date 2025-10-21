//variabili globali
let xMax = 400;
let yMax = 600;

let xRocket = xMax/2;
let yRocket = yMax*0.6;

let table;
let star_img;
let stars_valid = [];

function isStarSizeValid(value){
  //se il dato ingresso è corretto o meno
  //restituire un booleano
  return value > 0;
}

// documentazione
function meanOfAnArray(arrayInput){
  let mediaArray = 0;
  for(let i=0; i < arrayInput.length; i++){
    mediaArray += arrayInput[i];
    // mediaArray = media Array + arrayInput[i];
  }

  return mediaArray/arrayInput.length;
}

function drawStarSizePlot(arrayDiStelle){
  // asse x e asse y
  // assegnare le etichette
  // dobbiamo disegnare qualcosa
  push();
  // asse x
  // width
  // height
  let xMin = 30;
  let yMaxChart = height/2;
  let xMaxChart = width - 20; 
  let yMin = 40;
  line(xMin, yMaxChart, xMaxChart, yMaxChart);
  // asse y
  line(xMin, yMaxChart, xMin, yMin);
    push();
    translate(xMin, yMin);
    rotate(-90);
    text("Size", -xMin, 0);
    pop();
  // rappresentare le dimensioni delle stelle
  for(let i=0; i < arrayDiStelle.length; i++){
    // definire le coordinate x e y delle stelle
    // map --> valore lo rimappiano in un intervallo
    let x = map(i, 0, arrayDiStelle.length, xMin+5, xMaxChart-5);
    // rimappare la y
    let y = map(arrayDiStelle[i], min(arrayDiStelle), max(arrayDiStelle), yMaxChart+5, yMin)
    image(star_img, xMax, yMax, arrayDiStelle[i], arrayDiStelle[i]);
  }

  pop();
}

//caricare asset prima che la pagina web venga caricata
function preload() {
  table = loadTable("../assets/datasets/stars.csv", "csv", "header");
  star_img = loadImage("../assets/img/star.png");
}

function setup() {
  createCanvas(xMax, yMax);
  frameRate(30);
  angleMode(DEGREES);
  //filtrare i dati
  //tramite isStarSizeValid
  //applichiamo la funzione di filtro
  
  //scorriamo i valori con un ciclo
  //e filtriamo
  for(let i=0; i < table.getRowCount(); i++){
    let star_value = table.getNum(i,"starSize");
    if(isStarSizeValid(star_value)){
      stars_valid.push(star_value);
    }
  }
}

function drawStarsFromFile() {
  for(let k = 0; k < table.getRowCount(); k++) {
    let starX = (k*37) % width + (k%3) * 5;
    let starY = (k*73) % height + (k%7);
    let starSize = table.getNum(k, "starSize")
    image(star_img, starX, starY, starSize, starSize);
  }
}

function draw() {
  background("#C0E1FC");

  fill(0); //bianco
  textSize(20);
  text("mouseX: " + mouseX + ",\
     mouseY: " + mouseY,20,20);
  
     //disegnare la stella più piccola
     // e la stella più grossa
     //stars_valid
    //image(star_img, 50, 50, min(stars_valid), min(stars_valid));
    //image(star_img, 100, 100, max(stars_valid), max(stars_valid));

    // 1 rappresentare le statistiche 
    // 1.A quante stelle valide ci sono 
    // stars_valid.length --> quanto è lungo l'array
    text("Stelle valide " + stars_valid.length, 20, 500);
    // 1.B valor medio della dimensione delle stelle
    // sommare tutte le dimensioni e dividere per la lunghezza 
    let mediaDimensioni = 0;
    mediaDimensioni = meanOfAnArray(stars_valid);
    text ("Media delle dimensioni " + mediaDimensioni.toFixed(2), 20, 500+20)
    // 1.C la deviazione standard, quanto variano le dimensioni

    // 2 disegnare il grafico
    // disegnare gli assi 
    // assegnare le etichette agli assi
    // rappresentare i dati
    drawStarSizePlot(stars_valid);
}
