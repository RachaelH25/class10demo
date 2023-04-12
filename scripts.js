const audioname = document.getElementById("audioname");
const randomizer = document.getElementById("randomizer");

// audioname is leaves on Chris' demo but I have no audio file to link/refer to so these instances are replaced with 'audioname'.
randomizer.addEventListener("click", function () {
    audioname.volume = Math.random();
    console.log(audioname.volume);
});
