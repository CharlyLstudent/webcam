let img;
let capture;
let imgNew;
let index;
let c;
let rouge;
let vert;
let bleu;
let dMax = 40;
let canvas;
let w = 640;
let h = 480;
let slider;
let button;
let diam = 50; 
let vid;

// initialisation d'une variable contenant un objet 'CCapture'
const capturer = new CCapture({
    framerate: 24,    // nombre de FPS
    format: "webm",   // format du fichier
    name: "ma_video", // nom du fichier exporté
    quality: 100,     // qualité de l'image (1 = moins bien, 100 = mieux)
    verbose: true,    // verbosité de l'export (s'affiche dans la console)
});

function preload() {
    img = loadImage("assets/time.jpg"); // chargement de notre image de fond choisi
}

function setup() {
    my_canvas = createCanvas(640, 640);
    pixelDensity(1); // Pour les écrans à hautes capacités, pour avoir un affichage correcte
    capture = createCapture(VIDEO); // création de la capture de la webCam
    capture.hide();
    frameRate(24); 
    imgNew = createImage(640, 480); // Création d'une image vide qu'on modifiera et qui affichera le contenue
    vid = createVideo(
        ['assets/numerique_situation_1.mp4'],
        vidLoad
        
      );
      vid.hide();
    slider= createSlider(0, 200, 5);
    button = createButton('Marche/Arrêt');
    button.position(150, 650);
    button.mousePressed(marcheArret);

}

function draw() {
    if (frameCount === 1) capturer.start(); 
    background(225);
    img.loadPixels(); //Chargement des pixels de notre image de fond
    capture.loadPixels(); //Chargement des pixels de la webCam
    imgNew.loadPixels(); //Chargement des pixels de notre image vide, par défaut tout les pixels sont vide (0.0.0.0)

    for (var i = 0; i < height; i++) { //Boucle for pour les lignes

        for (var j = 0; j < width; j++) { //Boucle for pour les colonnes
            index = (width * i + j) * 4;
            dMax = slider.value();
            if (c) { // condition if reusltat pour le choix de couleurs et la distance entre couleurs pour faire la modification 

                var r = capture.pixels[index];
                var v = capture.pixels[index + 1];
                var b = capture.pixels[index + 2];
                var a = capture.pixels[index + 3];
                let d = distance(r, v, b, rouge, vert, bleu);

                if (d < dMax) { // condition if resultat de notre condition "true/false", changement des pixels de notre image vide en pixels de l'image de fond
                    imgNew.pixels[index] = vid.pixels[index];
                    imgNew.pixels[index + 1] = vid.pixels[index + 1];
                    imgNew.pixels[index + 2] = vid.pixels[index + 2];
                    imgNew.pixels[index + 3] = vid.pixels[index + 3];

                } else { // resultat de notre condition "true/false", changement des pixels de notre image vide en pixels de la webCam
                    imgNew.pixels[index] = capture.pixels[index];
                    imgNew.pixels[index + 1] = capture.pixels[index + 1];
                    imgNew.pixels[index + 2] = capture.pixels[index + 2];
                    imgNew.pixels[index + 3] = capture.pixels[index + 3];

                }
            } else {
                imgNew.pixels[index] = capture.pixels[index];
                imgNew.pixels[index + 1] = capture.pixels[index + 1];
                imgNew.pixels[index + 2] = capture.pixels[index + 2];
                imgNew.pixels[index + 3] = capture.pixels[index + 3];
            }
        }
    }
    imgNew.updatePixels(); // update des pixels de notre image de base vide qui affichera maintenant notre image modifiés grâce au deux autres 
    capturer.capture(my_canvas.canvas);
        // on affiche l'image transformée sur le canevas
        let imgNew_posX = 0;
        let imgNew_posY = 0;
        image(imgNew, imgNew_posX, imgNew_posY);
    
        // affichage de la bulle servant de 'color picker'
        if (mouseIsInside(imgNew_posX, imgNew_posY, imgNew.width, imgNew.height)) { // si la souris se trouve à l'intérieur de img_new, alors...
            // utiliser la couleur sous la souris comme couleur de remplissage (fill)
            color_curr = get(mouseX, mouseY);
            fill(color_curr);
            // epaisseur et couleur du trait
            strokeWeight(3);
            stroke(invertColor(color_curr));
            // desiner une ellipse avec un diametre 'd'
            ellipse(mouseX + diam / 2, mouseY + diam / 2, diam);
        }
    
    if (frameCount === 720) {
        noLoop();
        capturer.stop();
        capturer.save();
    }
    
}

function mouseClicked() {
    c = get(mouseX, mouseY);
    rouge = red(c);
    vert = green(c);
    bleu = blue(c);
}

function distance(x1,y1,z1,x2,y2,z2){
    return sqrt(sq(x1-x2) + sq(y1-y2) + sq(z1-z2));
}

function marcheArret() {
    let stop = capturer.stop();
    let save = capturer.save();
    if(button.mousePressed){
        stop;
        save;
    }
}

function mouseIsInside(x1, y1, x2, y2) {
    return (mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2);
}

function invertColor(color) {
    return [255-color[0], 255-color[1], 255-color[2], 255];
}


// fonction permettant d'afficher les composantes RGBA de manière intelligible
function showColor(color) {
    let R = "R: " + str(color[0]) + "\n";
    let G = "G: " + str(color[1]) + "\n";
    let B = "B: " + str(color[2]) + "\n";
    let A = "A: " + str(color[3]);
    return R + G + B + A;
}

function vidLoad(){
    vid.loop();
    vid.volume(0);
}
// function rond(){
//     let c = get(mouseX, mouseY);
//     ellipseMode(CORNER);
//     fill(c);
//     stroke(0);
//     ellipse(mouseX, mouseY, 70);

// }

// function textBox(){
// fill(rouge, vert, bleu);
// rect(0,480,640,300);

// textSize(50);
// fill(255);
// text('Red  ' + rouge, 0, 530);
// fill(200);
// text('Green  ' + vert,  0, 580);
// fill(150);
// text('Blue  ' + bleu, 0, 630);
// }