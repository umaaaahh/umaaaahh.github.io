const myVideo = document.querySelector("#my-video");
console.log(myVideo);

// --------------------------------------------------------------
// My logic for playing sound
// first I need to fetch the right button for play


const playButton = document.querySelector("#play-button");
console.log(playButton);

// then I eill listen to the click events on that button
playButton.addEventListener("click", playVideo);

// whenever click happen, i will play the audio
function playVideo (){
    myVideo.play();
}

// --------------------------------------------------------------
// My logic for pausing sound
// first I need to fetch the right button for pause


const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

// then I will listen to the click events on that button
pauseButton.addEventListener("click", pauseVideo);

// whenever click happen, i will pause the audio
function pauseVideo (){
    myVideo.pause();
}
// --------------------------------------------------------------
// My logic for play/pausing button
// first I need to fetch the right button for pause


const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg)

// then I will listen to the click events on that button
playPauseButton.addEventListener("click", toggleVideo);

// whenever click happen, i will pause the audio
function toggleVideo (){
   if (myVideo.paused || myVideo.ended) {
    myVideo.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
   } else {
    myVideo.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
   }
    
}

