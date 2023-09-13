let videoPlayer = document.querySelector(".myplayer");
let Video = document.querySelector("video");
let Play = document.querySelector(".play");
let Rewind = document.querySelector(".rewind");
let Forward = document.querySelector(".forward");
let Controls = document.querySelector(".myplayer__controls");
let timerArea = Controls.querySelector(".timer");
let currentTime = timerArea.querySelector(".currentTime");
let videoTime = timerArea.querySelector(".videoTime");
let timerBar = Controls.querySelector(".controls__progressbar-current");
let volume = Controls.querySelector(".volume .icon");
let volumebar = Controls.querySelector(".volume .volume__progress");
let volumebarinput = volumebar.querySelector("input");
let fullscreen = Controls.querySelector(".fullscreen");

Video.addEventListener("timeupdate", function () {
  currentTime.textContent = getTime(Video.currentTime);
  let barLength = (Video.currentTime / Video.duration) * 100;
  timerBar.style = `background : linear-gradient(90deg, rgba(230,126,34,1) ${barLength}%, #e1e1e1 0%);`;
  timerBar.value = barLength;
});

Play.addEventListener("click", function () {
  videoTime.textContent = getTime(Video.duration);
  if (Video.paused) {
    Video.play();
    togglePlayicon();
  } else {
    Video.pause();
    togglePlayicon();
  }
});

Rewind.addEventListener("click", function () {
  Video.currentTime = Video.currentTime - 5;
});

Forward.addEventListener("click", function () {
  Video.currentTime = Video.currentTime + 5;
});

timerBar.addEventListener("input", function () {
  Video.currentTime = (this.value / 100) * Video.duration;
});

volume.addEventListener("click", function () {
  volumebar.classList.toggle("active");
});

volumebarinput.addEventListener("input", function () {
  volumebar.classList.toggle("active");
  Video.volume = this.value / 100;
  this.style = `
  background: linear-gradient(90deg, rgba(230, 126, 34, 1) ${this.value}%, #e1e1e1 0%);`;
});

fullscreen.addEventListener("click" , function () {
  if (!document.fullscreenElement) {
    if (videoPlayer.requestFullscreen) {
      videoPlayer.requestFullscreen();
    } else if (videoPlayer.mozFullScreenElement) {
      videoPlayer.mozFullScreenElement();
    } else if (videoPlayer.msFullscreenElement) {
      videoPlayer.msFullscreenElement();
    } else if (videoPlayer.webkitFullscreenElement) {
      videoPlayer.webkitFullscreenElement();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullscreen) {
      document.mozCancelFullscreen();
    } else if (document.msCancelFullscreen) {
      document.msCancelFullscreen();
    } else if (document.webkitCancelFullscreen) {
      document.webkitCancelFullscreen();
    }
  }
});

function togglePlayicon() {
  let icon = Play.querySelector("i");
  icon.classList.toggle("ion-md-pause");
  icon.classList.toggle("ion-md-play");
}

function getTime(time) {
  let min = Math.floor(time / 60);
  let seconds = Math.floor(time - min * 60);
  let minValue;
  let secondsValue;

  if (min < 10) {
    minValue = "0" + min;
  } else {
    minValue = min;
  }

  if (seconds < 10) {
    secondsValue = "0" + seconds;
  } else {
    secondsValue = seconds;
  }

  return minValue + ":" + secondsValue;
}
