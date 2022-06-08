let capture;
let img;
let c;
let rouge;
let vert;
let bleu;

let dCalc;
let dMax;
let img_new;



function preload(){
   img = loadImage('assets/time.jpg');

}

function setup(){
pixelDensity(1);
createCanvas(640,785);
capture = createCapture(VIDEO);
capture.hide();

}

function draw(){ 
    img.loadPixels();
    capture.loadPixels();

    capture.updatePixels(); 
    img.updatePixels();
    
    // image(img,0,0,width, width * capture.height / capture.width);
    image(capture, 0, 0,width, width * capture.height / capture.width);
    textBox();
    rond();
}


function rond(){
        let c = get(mouseX, mouseY);
        ellipseMode(CORNER);
        fill(c);
        stroke(0);
        ellipse(mouseX, mouseY, 70);

}

function textBox(){
    fill(rouge, vert, bleu);
    rect(0,480,640,300);

    textSize(50);
    fill(255);
    text('Red  ' + rouge, 0, 530);
    fill(200);
    text('Green  ' + vert,  0, 580);
    fill(150);
    text('Blue  ' + bleu, 0, 630);
}

function mouseClicked(){
     c = get(mouseX, mouseY);
     rouge = red(c);
     vert = green(c);
     bleu = blue(c);


    print(rouge, vert, bleu);
    
}

function distance(){
    c = get(mouseX, mouseY);
    rouge = red(c);
    vert = green(c);
    bleu = blue(c);

    dCalc = dist(mouseX, mouseY, c, red, green, blue);
    dMax = 20;

    var indexPixels = width * j + i;
    var r = capture.pixels[indexPixels];
    var v = capture.pixels[indexPixels+1];
    var b = capture.pixels[indexPixels+2];
    var a = capture.pixels[indexPixels+3];

    var indexArrayR = indexPixels*4;
    var indexArrayG = indexPixels*4 + 1;
    var indexArrayB = indexPixels*4 + 2;
    
    if(dCalc < dMax){
        img_new.pixels[indexArrayR] = img.pixels[indexArrayR];
        img_new.pixels[indexArrayG] = img.pixels[indexArrayG];
        img_new.pixels[indexArrayB] = img.pixels[indexArrayB];
    }else{
      
        img_new.pixels[indexArrayR] = r;
        img_new.pixels[indexArrayR] = g;
        img_new.pixels[indexArrayR] = b;
    }
}
