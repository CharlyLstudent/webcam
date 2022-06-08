let capture;
let img;

function preload(){
    img = loadImage("assets/time.jpg");
}

function setup(){
    createCanvas(640,480);
    pixelDensity(1);
    capture = createCapture(VIDEO);
    capture.hide();
}

    function draw(){ 
        img.loadPixels();
        capture.loadPixels();

        for ( var i=0; i < width; i++){
            for (var j=0; j< height; j++){
    
                var indexPixels = (width * j + i)*4;
                var r = capture.pixels[indexPixels];
                var v = capture.pixels[indexPixels+1];
                var b = capture.pixels[indexPixels+2];
                var a = capture.pixels[indexPixels+3];
                var moyenne = (r+v+b)/3;

                let d = dist(i, j, mouseX, mouseY);
    
    
                capture.pixels[indexPixels] = r;
                capture.pixels[indexPixels+1] = v;
                capture.pixels[indexPixels+2] = b; 
                capture.pixels[indexPixels+3] = a;

                if(d < 40){
                    capture.pixels[indexPixels] = img.pixels[indexPixels];
                    capture.pixels[indexPixels+1] = img.pixels[indexPixels+1];
                    capture.pixels[indexPixels+2] = img.pixels[indexPixels+2]; 
                    capture.pixels[indexPixels+3] = 255; 
                }


            }
        }
        capture.updatePixels();
        img.updatePixels();
        image(img,0,0,width, width * capture.height / capture.width);
        image(capture, 0, 0,width, width * capture.height / capture.width);
    }
    