// ---------------------code for play and pause---------------
function hi() {

  var playPromise = audio.play();
 
  if (playPromise !== undefined) {
    playPromise.then(_ => {
      var analyser = context.createAnalyser();

      var canvas = document.getElementById("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var ctx = canvas.getContext("2d");
    
      src.connect(analyser);
      analyser.connect(context.destination);
    
      analyser.fftSize = 256;
    
      var bufferLength = 120;
      
      var dataArray = new Uint8Array(bufferLength);
    
      var WIDTH = canvas.width;
      var HEIGHT = canvas.height;
    
      var barWidth = (WIDTH / bufferLength) * 2.5;
      var barHeight;
      var x = 0;
    
      function renderFrame() {
        requestAnimationFrame(renderFrame);
    
        x = 0;
    
        analyser.getByteFrequencyData(dataArray);
    
        ctx.fillStyle = "white";
        ctx.fillRect(0, 5, WIDTH, HEIGHT);
    
        for (var i = 0; i < bufferLength; i++) {
          barHeight = 1.5 * dataArray[i];
    
          var r = barHeight + (25 * (i / bufferLength));
          var g = 250 * (i / bufferLength);
          var b = 50;
    
          ctx.fillStyle = "#808080";
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
    
          x += barWidth + 1.5;
        }
      }
    
      audio.play();
      renderFrame();
    })
    .catch(error => {
      audio.pause()
    });
  }
};
let play_pause = document.getElementById('play')
play_pause.addEventListener('click', function () {
  context.resume().then(audio_visual);
});
let is_play = 0
var audio = document.getElementById("audio");
let container=document.getElementById("container")
let song_name = document.getElementById("music_name")
let singer_name = document.getElementById("singer_name")
let song_pic = document.getElementById("pic_inside_music")
let next_song_btn = document.getElementById('Forward')
let prev_song_btn=document.getElementById("backward")

// ---------- data of song-------------

let song = [
  {
    name: "ADHD",
    singer: "Joyer Lucas",
    song_name: "ADHD.mp3",
    picture_name: "ADHD.JPG"
  }, {
    name: "HOLLYWOOD BLEEDING",
    singer: "Post Malone",
    song_name: "HOLLYWOOD_BLEEDING.mp3",
    picture_name: "HOLLYWOOD_BLEEDING.JPG"
  }, {
    name: "LOOK AT ME",
    singer: "XXXTentacion",
    song_name: "LOOK_AT_ME.mp3",
    picture_name: "LOOK_AT_ME.JPG"
  }, {
    name: "KILL YOURSELF III",
    singer: "$uicideboy$",
    song_name: "KILL_YOURSELF_III.mp3",
    picture_name: "KILL_YOURSELF_III.JPG"
  }, {
    name: "HOPE",
    singer: "XXXTentacion",
    song_name: "HOPE.mp3",
    picture_name: "HOPE.JPG"
  }, {
    name: "SAVE THAT SHIT",
    singer: "Lil Pip",
    song_name: "SAVE_THAT_SHIT.mp3",
    picture_name: "SAVE_THAT_SHIT.JPG"
  }, {
    name: "WITHOUT YOU",
    singer: "(Fan Made)",
    song_name: "WITHOUT_YOU.mp3",
    picture_name: "WITHOUT_YOU.JPG"
  }, {
    name: "WISHING WELL",
    singer: "Juice Wrld",
    song_name: "WISHING_WELL.mp3",
    picture_name: "WISHING_WELL.JPG"
  }, {
    name: "LUCID DREAMS",
    singer: "Juice Wrld",
    song_name: "LUCID_DREAMS.mp3",
    picture_name: "LUCID_DREAMS.JPG"
  }, {
    name: "SUCIDAL THOUGHTS",
    singer: "Josh A,iamjakehill",
    song_name: "SUCIDAL_THOUGHTS.mp3",
    picture_name: "SUCIDAL_THOUGHTS.JPG"
  }
]

let count = 0;


// ---------------code for previous song-----------------------
prev_song_btn.addEventListener('click',()=>{
  if (count <= 0) {
    count = 9;
  }
  else {
    count--;
  }
  if(is_play==0){
    play_pause.classList.replace("fa-play", "fa-pause");
    is_play = 1
  }
 
  hi();
  song_name.textContent = song[count]["name"];
  container.style.background=`url(picture/${song[count].picture_name}) no-repeat center`
  singer_name.textContent = song[count]["singer"];
  song_pic.src = `picture/${song[count]["picture_name"]}`;
  audio.src = `music/${song[count]["song_name"]}`;
  
  
})

// ---------------code for next song---------



next_song_btn.addEventListener('click', next_song)
function next_song(){
  
  if (count >=9) {
    count = 0;
  }
  else {
    count++;
  }
  if(is_play==0){
    play_pause.classList.replace("fa-play", "fa-pause");
    is_play = 1
  }
  audio.play()
  hi();
  song_name.textContent = song[count]["name"];
  container.style.background=`url(picture/${song[count].picture_name}) no-repeat center`
  singer_name.textContent = song[count]["singer"];
  song_pic.src = `picture/${song[count]["picture_name"]}`;
  audio.src = `music/${song[count]["song_name"]}`;
}

// --------code for audio visulaiser---------


var context = new AudioContext();
var src = context.createMediaElementSource(audio);



function audio_visual() {
  if (is_play == 0) {
    play_pause.classList.replace("fa-play", "fa-pause");
    // white.classList.remove("white")
    
    hi()
    is_play = 1


  }


  else {
    audio.pause();
    play_pause.classList.replace("fa-pause", "fa-play");
    is_play = 0

  }
};




