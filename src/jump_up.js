// I'm not sure I need these here, misguided attempt to make them global?
var timer;
var progressMarker;

function drawProgressBar(timeMarked, waitTime) {
  // Handles drawing up the progress bar, which is actually more of a draining
  // countdown bar anyway
  remainingFraction = timeMarked / waitTime;
  minutesLeft = Math.floor(timeMarked / (1000.0 * 60.0));
  secondsLeft = (timeMarked / 1000.0) % 60;

  console.log(timeMarked / 1000.0);
  canvas = document.getElementById("progress_bar");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width * remainingFraction, canvas.height);
  ctx.font = "30px Arial";
  ctx.strokeText(minutesLeft.toString() + " min: " + secondsLeft.toString() + " sec", 10, 30);
}

function getUp() {
  // Triggers the alerts
  var audio = document.getElementById("jump_alert");
  audio.play();
  document.getElementById("status_banner").innerHTML = "Get up!";
  clearInterval(progressMarker);
}

function progressTicker(waitTime) {
  // Mark time to getting up
  var reportingInterval = 1000;
  var timeMarked = waitTime;

  // use internal function and variable scoping to handle updating
  // the progress bar
  function markInterval() {
    console.log(timeMarked / waitTime);
    drawProgressBar(timeMarked, waitTime);
    timeMarked -= reportingInterval;
  }
  markInterval();
  progressMarker = setInterval(markInterval, reportingInterval);
}

function countDown() {
  // Clear out any current countdown in progress
  clearInterval(progressMarker);
  clearTimeout(timer);

  // Calculate wait time, start the clock
  var minutes = parseFloat(document.getElementById("time_minutes").value);
  var seconds = parseFloat(document.getElementById("time_seconds").value);

  // Units used by JS are milliseconds
  var wait_ms = ((minutes * 60) + seconds) * 1000;
  console.log(wait_ms);
  progressTicker(wait_ms);

  timer = setTimeout(getUp, wait_ms);
  document.getElementById("go_button").innerHTML = "Restart Count";
  document.getElementById("status_banner").innerHTML = "You're fine...";
}
