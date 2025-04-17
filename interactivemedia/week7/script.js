const airportAudio = document.querySelector("#airport-audio");
console.log(airportAudio);

// --------------------------------------------------------------
// My logic for playing sound
// first I need to fetch the right button for play


const playButton = document.querySelector("#play-button");
console.log(playButton);

// then I eill listen to the click events on that button
playButton.addEventListener("click", playAudio);

// whenever click happen, i will play the audio
function playAudio (){
    airportAudio.play();
}

// --------------------------------------------------------------
// My logic for pausing sound
// first I need to fetch the right button for pause


const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

// then I will listen to the click events on that button
pauseButton.addEventListener("click", pauseAudio);

// whenever click happen, i will pause the audio
function pauseAudio (){
    airportAudio.pause();
}

// --------------------------------------------------------------
// My logic for pop sound
// first I need to fetch the right button for pop
// and the sound that i want to use on click

const popSound = document.querySelector ("#pop-sound");
console.log(popSound)


const popButton = document.querySelector("#pop-button");
console.log(popButton);

// then I will listen to the click events on that button
popButton.addEventListener("click", popAudio);

// whenever click happen, i will play the audio
function popAudio (){
    popSound.play();
    //  airportAudio();
}