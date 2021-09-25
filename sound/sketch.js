let song, analyzer;
let r, g, b;
let mic, fft;
let x = 0;
let imgs = [];


function preload() {
  song = loadSound('faic.mp3');
  for (var i = 16 - 1; i >= 0; i--) {
    let img = loadImage("./water/frame"+(i+1)+".jpg")
    imgs.push(img)
  }

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

    let txt = map(spectrum[i],0,255,0,15);

    txt = floor(txt);
    let r = windowWidth/45;
    image(imgs[txt],r * i,windowHeight/2,)
    image(imgs[txt], windowWidth - r * i,windowHeight/2 - 175,)
    image(imgs[txt],r * i,windowHeight/2 - 175 - 175,)
    image(imgs[txt], windowWidth - r * i,windowHeight/2 + 175,)
    image(imgs[txt],r * i,windowHeight/2 + 175 + 175,)

  }
  let s = map(floor(rms * 10000), 0, 900, 0, 10);
  console.log(floor(s))
  if(s > 0){
    for (var i = s - 1; i >= 0; i--) {
      image(imgs[floor(random(0,15))],floor(random(98,windowWidth - 98)),random([windowHeight/2 + 175 + 175, windowHeight/2 + 175, windowHeight/2 - 175 - 175, windowHeight/2 - 175, windowHeight/2]))
    }
  }
  // blendMode(HARD_LIGHT);
  background(17,21,28,(rms * 1000))
  

  
  noFill()
  // push()
  // translate(width/2, height/2);
  // scale((rms*100))
  // rotate(x)
  // push()

  
  // for (i = 0; i < spectrum.length; i++) {
  //   rotate(i/2)
  //   rect(0,0,1,spectrum[i])

  // }
  // pop()
  // pop()


  // if(x >= 360){
  //   x = 0
  // }else{
  //   x = x + 0.001;
  // }
  // beginShape();
  // for (i = 0; i < spectrum.length; i++) {
  //   curveVertex(i*20, map(spectrum[i], 0, 255, height, 0));
  // }
  // endShape();
}
document.addEventListener("click", function(){
  getAudioContext().resume();
})