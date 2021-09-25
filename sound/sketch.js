let song, analyzer;
let r, g, b;
let mic, fft;
let x = 0;
let img;
let img2;
let img3;
let img4;

function preload() {
  song = loadSound('faic.mp3');
  img = loadImage('1.png');
  img2 = loadImage('2.png');
  img3 = loadImage('3.png');
  img4 = loadImage('4.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  song.loop();

  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);
  
  //for mic
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);


}

function draw() {
  imageMode(CENTER)
    // image(img, windowWidth/2,windowHeight/2)
    // blend(img, 0, 0, 33, 100, 67, 0, 33, 100, ADD);
  // Get the average (root mean square) amplitude
  let rms = analyzer.getLevel();
  let spectrum = fft.analyze();
  for (i = 0; i < spectrum.length; i++) {

    let txt = map(spectrum[i],0,255,1,4);
    txt = floor(txt);
    if(txt == 4){
      image(img4, i * 40,windowHeight/2,50, 80);
    } else if(txt == 3){
      image(img3,i * 40 ,windowHeight/2,50, 80);
    }else if(txt == 2){
      image(img2,i * 40 ,windowHeight/2,50, 80);
    }else if(txt==1){
      image(img, i * 40,windowHeight/2,50, 80);
    }
  }
  background( spectrum[spectrum.length - 1] * 1.1, spectrum[1],spectrum[0] * 1.1,(rms * 1000))
  


  stroke(spectrum[0] * 1.1, spectrum[1],spectrum[spectrum.length - 1] * 1.1,20)
  noFill()
  push()
  translate(width/2, height/2);
  scale((rms*100))
  rotate(x)
  push()

  
  for (i = 0; i < spectrum.length; i++) {
    rotate(i/2)
    rect(0,0,1,spectrum[i])

  }
  pop()
  pop()


  if(x >= 360){
    x = 0
  }else{
    x = x + 0.001;
  }
  // beginShape();
  // for (i = 0; i < spectrum.length; i++) {
  //   curveVertex(i*20, map(spectrum[i], 0, 255, height, 0));
  // }
  // endShape();
}
document.addEventListener("click", function(){
  getAudioContext().resume();
})