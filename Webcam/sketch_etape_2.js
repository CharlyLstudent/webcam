var capture;


function preload(){

}

function setup(){
pixelDensity(1);
createCanvas(640,480);
capture = createCapture(VIDEO);
capture.hide();

}

function draw(){ 

    capture.loadPixels();

    for ( var i=0; i < w*h*4; i=i+4){

            var indexPixels = i/4
            var r = capture.pixels[i]
            capture.pixels[i] = 255;

            var v = capture.pixels[i+1]
            capture.pixels[i+1] = 255;

            var b = capture.pixels[i+2]
            capture.pixels[i+2] = 255;

            var a = capture.pixels[i+3]
            capture.pixels[i+3] = 255;
        
    }
    capture.updatePixels();

    image(capture, 0, 0,width, width * capture.height / capture.width);
}
