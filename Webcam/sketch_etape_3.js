var capture;


function preload(){

}

function setup(){
pixelDensity(1);
createCanvas(640,480);
capture = createCapture(VIDEO);
// capture.hide();

}

function draw(){ 

    capture.loadPixels();

    for ( var i=0; i < width; i++){
        for (var j=0; j< height; j++){

            var indexPixels = (width * j + i)*4;
            var r = capture.pixels[indexPixels];
            var v = capture.pixels[indexPixels+1];
            var b = capture.pixels[indexPixels+2];
            var a = capture.pixels[indexPixels+3];
            var moyenne = (r+v+b)/3;
            var sepia = (capture.pixels[indexPixels]/6) + (capture.pixels[indexPixels+1]/6);
            
            capture.pixels[indexPixels] = moyenne + sepia;
            capture.pixels[indexPixels+1] = moyenne;
            capture.pixels[indexPixels+2] = moyenne; 
            capture.pixels[indexPixels+3] = a;    
        }
    }
    capture.updatePixels();

    image(capture, 0, 0,width, width * capture.height / capture.width);
}
