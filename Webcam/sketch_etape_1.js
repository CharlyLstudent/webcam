var capture;


function setup(){
pixelDensity(1);
createCanvas(640,480);
capture = createCapture(VIDEO);
capture.hide();

}

function draw(){
    image(capture, 0, 0, width, width * capture.height / capture.width);
   
}
